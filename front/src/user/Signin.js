import React, { useState } from 'react'
import Layout from '../core/Layout'
import { useHistory,Redirect } from "react-router-dom"
import axios from "axios"



const Signin = ({user}) => {
    const [values, setvalues] = useState({
        email: "",
        pasword: "",
        error: "",
        loading: false,
        redirectToReferrer: false
    })

    const history = useHistory();

    const { email, password, error, redirectToReferrer, loading } = values;

    const handleChange = name => event => {

        setvalues({ ...values, error: false, [name]: event.target.value })
    }


    const signin = (user) => (

        axios.post("http://localhost:5000/signin", user)
            .then(response => {
                localStorage.setItem('signin', JSON.stringify(response.data));
                alert("added")
                history.push('/')
            })
            .catch(err => {
                console.log(err)
                alert("error")
            })
    )

    const clicksubmit = (event) => {
        event.preventDefault()
        setvalues({ ...values, error: false, loading: true })
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setvalues({ ...values, error: data.error, loading: false })
                } else {
                    setvalues({
                        ...values,
                        redirectToReferrer: true

                    })
                }
            })
    }


    const signinform = () => (
        <form>
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
            </button>

        </form>
    );


    const showError = () => (
        <div className='alert alert-dander' style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )

    const showLoading = () => (
        loading && (
            <div className='alert alert-info'>
                <h2>loading... </h2>
            </div>
        )

    )

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to='/admin/dashboard' />
            } else {
                return <Redirect to='/user/dashboard' />
            }
        }
    }



    return (

        <Layout title=' signup page' description='mern task going know'
            className="container col-md-8 offset-md-2">
            {redirectUser()}
            {showLoading()}
            {showError()}
            {signinform()}
        </Layout>


    )
}

export default Signin;
//
