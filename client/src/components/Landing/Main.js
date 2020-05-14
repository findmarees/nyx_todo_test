import React, {useState} from 'react'
import Login from './Login';
import Signup from './Signup';
import Navigate from '../Navigation/Navigate';


function Main(){
    const [mode, setMode] = useState(true)
    
    return (
        <div><Navigate mode="home"/>
        <div class="row mt-2 p-5 justify-content-center">
            <div class="center green lighten-5 col-sm-12 col-lg-6 col-xl-4 col-md-8 mt-5 card-panel">

        {mode === true ? <Login myKey= {setMode}/> : <Signup myKey= {setMode}/>}
        </div>
        </div>
        </div>
        )
        
   
}


export default Main;
