import './App.css';
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom"
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import PrivateRoute from './Auth/PrivateRoutes'
import Home from "./core/Home";
import Dashboard from './user/Userdash'
import Admindash from './user/Admindash';
import AddCategory from './Admin/AddCategory';
import Addproduct from './Admin/Addproduct'
import Shop from './core/Shop'




function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Switch>
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <Admindash path='/admin/dashboard' exact component={Admindash} />
         
        <Route path='/create/category' exact component={AddCategory} />
       
        <Route path='/create/product' exact component={Addproduct} />
        
         
         <Route path='/shop' exact component={Shop} />
        
          <Route path='/' exact component={Home} />
          <Route path='/signin' exact component={Signin} />
          <Route path='/signup' exact component={Signup} />
          </Switch>
      </BrowserRouter>



    </div>
  );
}

export default App;
