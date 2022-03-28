import React, { useState } from 'react'
import Layout from '../core/Layout'
import {Link,useHistory} from "react-router-dom"
import axios from "axios"
//import { useNavigate } from 'react-router';



const Signup = () => {
  const [values, setvalues] = useState({
    name: "",
    email: "",
    pasword: "",
    error: "",
    success: false
  })

  const history=useHistory();
    
  const { name, email, password ,error,success} = values;

  const handleChange = name => event => {

    setvalues({ ...values, error: false, [name]: event.target.value })
  }

  // const signup=(user)=>{
  //   fetch(`http://localhost:5000/signup`,{
  //     method:'POST',
  //     headers:{
  //       Accept:"application/json",
  //       "Content-Type":"application/json"
  //     },
  //     body:JSON.stringify(user)
  //   })
  //   .then(response=>{
  //     return response.json()
  //   })
  //   .catch(err=>{
  //     console.log(err)
  //   })
  // }

  const signup = (user) => (
   
    axios.post("http://localhost:5000/signup", user)
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data));
        alert("added")
        history.push('signin')
      })
      .catch(err => {
        console.log(err)
        alert("error")
      })
  )

  const clicksubmit = (event) => {
    event.preventDefault()
    signup({ name, email, password,error ,success })
      .then(data => {
        if (data.error) {
          setvalues({ ...values, error: data.error, success: false })
        } else {
          setvalues({
            ...values,
            name: "",
            email: '',
            password: '',
            error: '',
            success: true
          })
        }
      })
  }


  const signupform = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input type="text" onChange={handleChange('name')} className="form-control" value={name} />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input type="email" onChange={handleChange('email')} className="form-control" value={email} />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input type="password" onChange={handleChange('password')} className="form-control" value={password} />
      </div>

      <button className='btn btn-primary' onClick={clicksubmit}>
        submit
      </button> '   '     <Link to="/signin">signin</Link>


    </form>
  );

  const showError = () => (
    <div className='alert alert-dander' style={{ display: error ? '' : 'none' }}>
      {error}
    </div>
  )

  const showSuccess = () => (
    <div className='alert alert-info' style={{ display: success ? '' : 'none' }}>
      New account is created plase signin
    </div>
  )


  return (

    <Layout title=' signup page' description='mern task going know'
      className="container col-md-8 offset-md-2">

      {showSuccess()}
      {showError()}
      {signupform()}
    </Layout>


  )
}

export default Signup;