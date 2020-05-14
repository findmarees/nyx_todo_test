import React, {useState, useEffect, useRef} from 'react'
import SideMenu from './SideMenu';
import SideMenuSmall from './SideMenuSmall';

import ToDOList from './ToDOList';
import Navigate from '../Navigation/Navigate'
import { connect } from 'react-redux';
import * as actions from '../../actions';
import M from 'materialize-css'
import { useHistory } from 'react-router-dom';


function TODOMain(props){
  let history = useHistory();

    const [mode, setMode] = useState(true)
    const titleRef = useRef();
    const itemRef = useRef();
    const mounted = useRef();

    const previosState = usePrevious(props);
    let doAddTodo = ()=>{
  if(titleRef.current.value.trim() === '' || itemRef.current.value.trim() === '')
            return M.toast({html: `Please Enter Category Name`})
        if(props.auth.isAuthenticated){
            let todo = itemRef.current.value.split('\n');
            console.log(todo)
            let toDOlist = [];
            todo.map((item)=>{
                toDOlist.push({
                    item,
                    status:'false'
                })
            })
            let newTodo = {
                category: props.list.chosen,
                title: titleRef.current.value.trim(),
                todos: toDOlist,
                user: `${props.auth.user.id || props.auth.user._id}`
            }
            console.log(newTodo)
            props.modeAction('add')
            props.addTodo(newTodo)
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
    let generateModal = ()=>{
        return(
            <div id="modal2" class="modal">
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
            if(props.error.id === 'add_todo' && props.error.msg === 'Successful' && props.list.mode === 'add'){
              M.toast({html: `Todo Added`})
              doClose()
              props.getTodo(`${props.auth.user.id || props.auth.user._id}`);
            }
            
      
      
          console.log(previosState);
          console.log(props)
        }
      });
    useEffect(() => {
        if(props.auth.user){ 
        //execute your code.
        //            
        try{
            console.log(props.auth.user.id)
            console.log(props.auth.user._id)

            props.getCat(`${props.auth.user.id || props.auth.user._id}`);
            props.getTodo(`${props.auth.user.id || props.auth.user._id}`);
            console.log(props.auth.user)
        } catch(e){
            console.log(props.auth.user)
        }
        }
         },[props.auth.user])



         let openModal = ()=>{
           itemRef.current.style.height = "44px"
          titleRef.current.value  = "";
          itemRef.current.value = "";
            const elem = document.getElementById('modal2');
            const instance = M.Modal.init(elem, {dismissible: false});
            instance.open();
        }
    return (
        <div class="col col-sm-12" >
             {generateModal()}
            <Navigate mode="dashboard"/>
            <div className="row">
              <div class="hide-on-small-only col col-md-4 col-lg-3 col-xl-2">
              <SideMenuSmall />
              </div>
              <div class="hide-on-small-only my-side-meu col col-md-4 col-lg-3 col-xl-2">
              <SideMenu />
              </div>
              <div class="col col-sm-12 col-md-8 col-lg-9 col-xl-10">
            <ToDOList />
            </div>
            
            <div onClick={()=>openModal()} class="fixed-action-btn">
                <a class="btn-floating btn-large green darken-4">
                <i class="large material-icons">add</i>
                     </a>
            </div>
            </div>
           
        </div>
        )
        
   
}


const mapStateToProps = (state) => {
    let {auth, error, list} = state;
    return{
        auth,
        error,
        list
    }
  };
  
export default connect(mapStateToProps, actions)(TODOMain);
