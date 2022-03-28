import React from 'react'
import Layout from '../core/Layout'
import { isAuthenticate } from '../Auth'
import { Link } from "react-router-dom"


const Userdash = () => {

    const { user: { _id, email, name, role } } = isAuthenticate()


    const userLinks = () => {
        return (
            <div className='card'>
                <h4 className='card-header'>userlinks</h4>
                <ul className='list-group'>
                    <li className='list-group-item'>
                        <Link className='nav-link' to='/cart'>
                            Cart
                        </Link>
                    </li>
                    <li className='list-group-item'>
                        <Link className='nav-link' to='/profile/update'>
                            Profile
                        </Link>
                    </li>
                    <li className='list-group-item'>{role === 1 ? "Admin" : "user"}</li>

                </ul>

            </div>
        )
    }


    const userinfo = () => {
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

    const purchaseHistory = () => {
        return (
            <div className='card md-4'>

                <h3 className='card-header'>Purchase history</h3>
                <ul className='list-group'>
                    <li className='list-group-item'>history</li>
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
                     {userLinks()}
                  </div>
                  <div className='col-9'>
                      {userinfo()}
                      {purchaseHistory()}
                  </div>
             
              </div>
            </Layout>




        </div>
    )
}

export default Userdash;