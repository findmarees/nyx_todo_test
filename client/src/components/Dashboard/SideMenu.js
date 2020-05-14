import React, {useEffect, useRef} from 'react'

import M from 'materialize-css'
import * as actions from '../../actions';
import { connect } from 'react-redux';

function SideMenu(props){
    const catRef = useRef();
    const mounted = useRef();

    const previosState = usePrevious(props);

    let doClose = ()=>{
        const elem = document.getElementById('modal1');
        const instance = M.Modal.init(elem, {dismissible: true});
        
        instance.destroy();
   
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
      if(props.error.id === 'ADD_CATEGORY' && props.error.msg === 'Successful'){
        M.toast({html: `Category Added`})
        doClose()
        props.getCat(`${props.auth.user.id || props.auth.user._id}`);
      }
      


    console.log(previosState);
    console.log(props)
  }
});
    let generateModal = ()=>{
        return(
            <div id="modal6" class="modal">
            <div class="modal-content">
              <h4>Add Category</h4>
              <div class="row">
        <div class="input-field col s12">
          <input ref={catRef} id="cat" type="text"/>
          <label for="cat" >Category Name</label>
        </div>
      </div>
      
      <div class="d-flex justify-content-around">
      <div class="modal-close btn bg-danger" onClick={()=>doClose()}>Cancel</div>
      <div class="modal-close btn bg-success" onClick={()=>doAddCat()}>Add</div>
      
      </div>
               
            </div>
          </div>
        );
    }
    let openModal = ()=>{
      catRef.current.value = ""
        const elem = document.getElementById('modal6');
        const instance = M.Modal.init(elem, {dismissible: false});
        instance.open();
    }
  let doAddCat = ()=>{
    if(catRef.current.value.trim() === '')
        return M.toast({html: `Please Enter Category Name`})
    if(props.auth.isAuthenticated)
    try{
      props.addCat({
        user: `${props.auth.user.id || props.auth.user._id}`,
        category: [
          ...props.list.category.resp.category,
          catRef.current.value.trim()
        ]
    })
    } catch(e){
      props.addCat({
        user: `${props.auth.user.id || props.auth.user._id}`,
        category: [
          catRef.current.value.trim()
        ]
    })
    }
    
    
        
    else
        return M.toast({html: `Session Token Expired Please login again`})
  }
  const generateCatLists = ()=>{
    console.log(props.list.category.resp)
    try{
    return props.list.category.resp.category.map((data)=>{
     // console.log(data)
        return(<a onClick={()=>props.chosen(data)} class="collection-item">{data}</a>)
      })
    } catch(e){
      // no cats
    }
    
  }
    

    return (
        <div class="card col col-md-12 col-lg-12 col-xl-12">
            {generateModal()}
            <div class="card-title">Categories</div>
            <div class="collection">
        <a onClick={()=>openModal()} class="collection-item"><div class="center">Add New<a class="secondary-content"><i class="material-icons">add</i></a></div></a>
        {generateCatLists()}
      </div>
            
            
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
  

export default connect(mapStateToProps, actions)(SideMenu);