import React, {useState} from 'react'
import * as actions from '../../actions';
import { connect } from 'react-redux';
import M from 'materialize-css'
import { useHistory } from 'react-router-dom';


function TODOContent(props){
    const [mode, setMode] = useState(true)
    let history = useHistory();

    let statusChanger = (todo, id)=>{
      if(props.auth.isAuthenticated){
        props.updateTodo({id, todo})
      props.getTodo(`${props.auth.user.id || props.auth.user._id}`);
      } else{
        M.toast({html: `Session Timed Out Login Again`})
        props.logout();
        history.push('/');
      }
    }
    let generateTodos = ()=>{
      console.log(props.myTodo.status);
        return(
          <p onClick={()=>statusChanger(props.myTodo, props.id)}>
            <label class="row">
              {props.myTodo.status ?   <i class="green lighten-4 small material-icons">check</i> : <i class="small material-icons">crop_din</i>}
              <span class={`ml-3 ${props.myTodo.status ? 'done-todo' : 'undone-todo'}`}>{props.myTodo.item}</span>
            </label>
          </p>          
        );
     
   
    }

    return (
      <form action="#">
      { generateTodos() }
      </form>
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



export default connect(mapStateToProps, actions)(TODOContent);