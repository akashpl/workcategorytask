import React from "react";
import {BrowserRouter,Switch,Route} from "react-router-dom"
import Signup from "./Signup";
import Signin from "./Singin";


const Routes=()=>{
    return (
        <>
        <BrowserRouter>
            <Switch>
                <Route path='/signin' exact component={Signin}/>
                <Route path='/signup' exact component={Signup}/>
           
            </Switch>
        </BrowserRouter>
        
        
        </>
    )
}

export default Routes;