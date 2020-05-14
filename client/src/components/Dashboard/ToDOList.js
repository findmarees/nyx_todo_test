import React, {useState, useEffect, useRef} from 'react'

import TODOContent from './TODOContent';
import M from 'materialize-css'

import * as actions from '../../actions';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ToDOList(props){
  let history = useHistory();
  const mounted = useRef();
  const previosState = usePrevious(props);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if(props.error !== previosState.error)
         if(props.error.id === 'add_todo' && props.error.msg === 'Successful' && props.list.mode === 'update'){

          props.getTodo(`${props.auth.user.id || props.auth.user._id}`);
          M.toast({html: `Todo Updated`})
        } else if(props.error.id === 'DELETE_TODO' && props.error.msg === 'Successful' && props.list.mode === 'delete'){
          props.getTodo(`${props.auth.user.id || props.auth.user._id}`);
          M.toast({html: `Todo Deleted`})
        }
        
  
  
      console.log(previosState);
      console.log(props)
    }
  });
    const [todoPrev, setTodoPrev] = useState()
    const titleRef = useRef();
    const itemRef = useRef();

    let doAddTodo = ()=>{

      if(titleRef.current.value.trim() === '' || itemRef.current.value.trim() === '')
                return M.toast({html: `Please Enter Category Name`})
            if(props.auth.isAuthenticated){
                let todo = itemRef.current.value.split('\n');
                console.log(todo)
                let toDOlist = [];
                todo.map((item)=>{
                  if(item.trim() !== ''){
                    toDOlist.push({
                      item,
                      status:'false'
                  })
                  }
                    
                })
                
                let newTodo = {
                    category: props.list.chosen,
                    title: titleRef.current.value.trim(),
                    todos: toDOlist,
                    user: `${props.auth.user.id || props.auth.user._id}`
                }
                console.log(newTodo)
                props.modeAction('update')
                props.addTodo(newTodo)
                props.deleteTodo(todoPrev)
            }
            else{
              M.toast({html: `Session Timed Out Login Again`})
              props.logout();
              history.push('/');
            }
        }
        
        let doClose = ()=>{
            const elem = document.getElementById('modal1');
            const instance = M.Modal.init(elem, {dismissible: true});
            
            instance.destroy();
       
    }
    let generateTodo = (todoList, id)=>{
      console.log(todoList)

      if(todoList.length > 0){
        return todoList.map((todo)=>{
          console.log(todo)
         return <TODOContent myTodo = {todo} id={id}/>
        })
      } else{
        return <h5>Add some todo</h5>
      }
    
    }
    useEffect( () => {
      try{
        console.log(props.list)
      if(props.list.chosen === undefined)
      console.log(props.list)
      props.chosen(props.list.category.resp.category[0])
       
      } catch(e){
        console.log(e.toString())
        props.chosen('Add Some Category')
      }
  }, [props.list.category.resp])

  let generateModal = ()=>{
    return(
        <div id="modal3" class="modal">
        <div class="modal-content">
          <h4>Add Todo</h4>
          <div class="row col col-sm-12 col-md-12 col-lg-12 col-xl-12" >
    <div class="input-field col col-sm-12 col-md-12 col-lg-12 col-xl-12">
      <input ref={titleRef} id="cat" type="text" />
      <label for="cat">Todo Title</label>
    </div>
  </div>

  <div class="row col col-sm-12 col-md-12 col-lg-12 col-xl-12">
    <div class="input-field col col-sm-12 col-md-12 col-lg-12 col-xl-12">
      <textarea ref={itemRef} id="textarea1" class="materialize-textarea"></textarea>
      <label for="textarea1">What do you want to todo?</label>
    </div>
  </div>
  
  <div class="d-flex justify-content-around">
  <div class="modal-close btn bg-danger" onClick={()=>doClose()}>Cancel</div>
  <div class="modal-close btn bg-success" onClick={()=>doAddTodo()}>Add</div>
  
  </div>
           
        </div>
      </div>
    );
}
let openModal = (data)=>{
  setTodoPrev(data)
  console.log(itemRef)
  let todos = '';
  let height = 22;
  data.todos.map((todo)=>{
    if(!todo.status){
    todos += `${todo.item}\n`;
    height += 22;
  }
  })
  
  itemRef.current.style.height = `${height}px`
 titleRef.current.value  = `${data.title}`;
 itemRef.current.value = todos;
   const elem = document.getElementById('modal3');
   const instance = M.Modal.init(elem, {dismissible: false});
   instance.open();
}
    let generateLists = () => {
      
      let respArr = [];
      let todoList = [];
      let isTodo = false;
      respArr = props.list.todos.resp;
     
      let chosen = props.list.chosen;
     
      console.log(props.list)
      try{
        respArr.map((data)=>{
          if(data.category === chosen)
            isTodo = true
        })
        if(!isTodo)
          return <h5>Add some todo</h5>
     return  respArr.map((data)=>{
        console.log(data)
        if(data.category === chosen){
          todoList = data.todos;
          console.log(todoList)
          return (
            <div class="row m-2">
            <div class="col s12 m6">
              <div class="card green lighten-5">
                <div class="card-content">
                  <h4 style={{padding:0, margin:0}} class="green-text">{data.title}</h4>
                  <div class="pr-4 pl-4 mt-2">
                   
                     {generateTodo(todoList, data._id)}
                  
                    
                  
                  </div>
                </div>
                <div class="right-align">
                    <div onClick={()=>openModal(data)} class="btn m-1">Edit</div>
                    <div onClick={()=>{props.modeAction('delete');props.deleteTodo(data); }} class="btn m-1">Delete</div>
                </div>
              </div>
            </div>
          </div>
          )
    } 
    
      })
      
    } catch(e){
      return(<h5>Add some todo</h5>)
    }
        
        
    }
    console.log(props.list.chosen)
    return (
        <div style={{float:'right'}} class="card col col-md-12 col-lg-12 col-xl-12">
            {props.list.chosen !== 'Add Some Category' ? <div class="card-title">{props.list.chosen}</div> : <div class="jumbotron">
        <h1 class="display-4">Hello!</h1>
        <p class="lead">Usage:Add Category then add todo inside each category</p>
        <p>Token Expires in 30 minutes.</p>
        
        </div>
      }
           {generateLists()}
           {generateModal()}
        </div>
        )
        
   
}

const mapStateToProps = (myState)=>{
  //console.log(myState);\
  let {auth, error, list} = myState;
  return{
      auth,
      error,
      list
  }
 
}


export default connect(mapStateToProps, actions)(ToDOList);
