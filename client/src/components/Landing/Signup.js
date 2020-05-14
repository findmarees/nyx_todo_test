import React, {useEffect, useRef} from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions';
import M from 'materialize-css'
import '../../App.css'
import { useHistory } from 'react-router-dom';


function Signup(props){
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const mounted = useRef();
  const previosState = usePrevious(props);
  let history = useHistory();

  //useEffect(()=>{props.clearErrors()},[])
  let routeChange = (path)=>{
    history.push(path);
    
};
useEffect(() => {
  if (!mounted.current) {
    mounted.current = true;
  } else {
    if(props.error !== previosState.error)
      if(props.error.id === 'REGISTER_FAIL')
        M.toast({html: `${props.error.msg.msg}`})
      else{
        M.toast({html: `${props.error.msg}`})
        routeChange('/dashboard')
      }


    console.log(previosState);
    console.log(props)
  }
});

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}


  let doRegister = ()=>{
    
    if(!usernameRef.current.value.trim() || !emailRef.current.value.trim() || !passwordRef.current.value.trim())
      M.toast({html: `Please Fill All Fields`})
    else{
      let request = {
        username: `${usernameRef.current.value.trim()}`,
        mail: `${emailRef.current.value.trim()}`,
        password: `${passwordRef.current.value.trim()}`

      }
      console.log(request)
      props.register(request)
    }
  }

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
        <i class="material-icons prefix">email</i>

          <input ref={emailRef} id="email" type="email" class="validate" />
          <label for="email">Email</label>
          <span class="helper-text" data-error="wrong" data-success="right"></span>
      
      </div>
      </div>
      <div class="row">

        <div class="input-field col col-sm-12 col-lg-12 col-xl-12 col-md-12">
          <i class="material-icons prefix">security</i>
          <input ref={passwordRef} id="icon_telephone" type="password" class="validate" />
          <label for="icon_telephone">Password</label>
        </div>
        
      </div>
      <div onClick={()=>doRegister()} class="btn green darken-2">Register</div>
      <div onClick={()=>props.myKey(true)} className="mt-3 blue-text my-link row justify-content-center">Login?</div>
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
export default connect(mapStateToProps, actions)(Signup);
