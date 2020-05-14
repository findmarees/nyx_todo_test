import React, {useEffect, useRef} from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions';
import M from 'materialize-css'
import { useHistory } from 'react-router-dom';

function Login(props){
  const usernameRef = useRef();
  const passwordRef = useRef();
  const mounted = useRef();
  const previosState = usePrevious(props);
  let history = useHistory();


  

  let doLogin = ()=>{
    if(!usernameRef.current.value.trim() || !passwordRef.current.value.trim())
      M.toast({html: `Please Fill All Fields`})
    else{
      let request = {
        username: `${usernameRef.current.value.trim()}`,
        password: `${passwordRef.current.value.trim()}`
      }
      console.log(request)
      props.login(request)
  }
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
      if(props.error.id === 'LOGIN_FAIL')
        M.toast({html: `${props.error.msg.msg}`})
      else if(props.error.id === 'LOGIN_SUCCESS'){
        M.toast({html: `${props.error.msg}`})
       history.push('/dashboard')
      }


    console.log(previosState);
    console.log(props)
  }
});
   return(
    <div class="row">
    <form class="col">
      <div class="row">
        <div class="input-field col col-sm-12 col-lg-12 col-xl-12 col-md-12">
          <i class="material-icons prefix">account_circle</i>
          <input ref={usernameRef} id="icon_prefix" type="text" class="validate" />
          <label for="icon_prefix">Username</label>
        </div>
        </div>
        <div class="row">

        <div class="input-field col col-sm-12 col-lg-12 col-xl-12 col-md-12">
          <i class="material-icons prefix">security</i>
          <input ref={passwordRef} id="pass" type="password" class="validate" />
          <label for="pass">Password</label>
        </div>
      </div>
      <div onClick = {()=>doLogin()} class="btn green darken-2">Login</div>
      <div onClick={()=>props.myKey(false)} className="mt-3 blue-text my-link btn-link row justify-content-center">Register?</div>
    </form>
  </div>
   )
}


const mapStateToProps = state => {
  console.log(state);
  return{
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
  }
  
}
export default connect(mapStateToProps, actions)(Login);
