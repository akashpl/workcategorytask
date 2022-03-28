import React from 'react'
import Layout from '../core/Layout'
import { isAuthenticate } from '../Auth'
import { Link } from "react-router-dom"


const Admindash = () => {

    const { user: { _id, email, name, role } } = isAuthenticate()


    const adminLinks = () => {
        return (
            <div className='card'>
                <h4 className='card-header'>userlinks</h4>
                <ul className='list-group'>
                    <li className='list-group-item'>
                        <Link className='nav-link' to='/create/category'>
                            catagory create
                        </Link>
                    </li>
                    <li className='list-group-item'>
                        <Link className='nav-link' to='/create/product'>
                            create product
                        </Link>
                    </li>
                    
                </ul>

            </div>
        )
    }


    const admininfo = () => {
        return (
            <div className='card mb-5'>
                <h3 className='card-header'>User Information</h3>
                <ul className='list-group'>
                    <li className='list-group-item'>{name}</li>
                    <li className='list-group-item'>{email}</li>
                    <li className='list-group-item'>{role === 1 ? "Admin" : "user"}</li>
                  
                </ul>
            </div>


        )

    }

   

    return (
        <div>
            <Layout title=' Dashbored' description={`good day ${name}`}
                className="container ">

              <div className='row'>
                  <div className='col-3'>
                     {adminLinks()}
                  </div>
                  <div className='col-9'>
                      {admininfo()}
                      </div>
             
              </div>
            </Layout>




        </div>
    )
}

export default Admindash;