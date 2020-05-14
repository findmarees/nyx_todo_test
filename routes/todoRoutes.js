const CategoryModel = require('../models/Categories');
const TodoModel = require('../models/Todo');


const requireLogin = require('../middlewares/requireLogin');

const Category = CategoryModel.getCategorySchema();
const Todo = TodoModel.getTodoSchema()




module.exports = app =>{

/**
 * init todo
 */
/**
 * @route POST /api/new_todo
 * @description Create new todo
 * @access Private
 * 
 */
app.post('/api/new_cat', requireLogin ,async(req, res)=>{
    Category.findOneAndUpdate({user: req.body.user},{$set: req.body}, {new: true, useFindAndModify: false}, (err, result) => {
        if(err) res.status(400).json({ msg: err.toString() });

        if(result === null){
            let newCat = new Category(req.body);
            newCat.save();
        }
            
        return res.status(200).json({ msg: 'Added Successfully' });
    });
});

//update todo
app.post('/api/update_todo', requireLogin, async(req, res)=>{
    console.log(req.body)
    req.body.todo.status = !req.body.todo.status;
    console.log(req.body)
    try{
    const update = await Todo.findOneAndUpdate({
        "_id": req.body.id, "todos._id": req.body.todo._id
    },
    { 
        "$set": {
            "todos.$": req.body.todo
        }
    },)
    console.log(update)
    if(update)
        return res.status(200).json({ msg: 'Updated Successfully' })
    } catch(e){
        return res.status(500).json({ msg: 'Internal Server Error' });

    }

})

app.post('/api/new_todo', requireLogin ,async(req, res)=>{
    console.log(req.body);
    // {
    //     category: "shop",
    //     title: "vegetable",
    //     todos: [
    //         {
    //             item:'tomato',
    //             status: true
    //         },
    //         {
    //             item:'onion',
    //             status: false
    //         }
    //     ],
    //     created: Date.now()
    // }
    const myTodo = new Todo(req.body);
    try{
    await myTodo.save();
    return res.status(200).json({ msg: 'Added Successfully' })

} catch(e){
    return res.status(500).json({ msg: 'Internal Server Error' });
}
});


// get category
app.get('/api/get_cat/:id' ,async(req, res)=>{
    console.log(req.params.id);
    try{
        const cats = await Category.findOne({user:req.params.id});
        res.status(200).json({ msg: 'Success', resp: cats })
    } catch(e){
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
 
});

// delete todo
app.post('/api/delete_todo', requireLogin, async(req, res)=>{
    try{
    const deleteTodo = await Todo.findOneAndDelete(req.body);
  
    if(deleteTodo)
        return res.status(200).json({ msg: 'Deleted Successfully' })
    } catch(e){
        return res.status(500).json({ msg: 'Internal Server Error' });

    }

})

// get todo
app.get('/api/get_todo/:id' ,async(req, res)=>{
    console.log(req.params.id);
    try{
        const cats = await Todo.find({user:req.params.id});
        res.status(200).json({ msg: 'Success', resp: cats })
    } catch(e){
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
 
});

}

