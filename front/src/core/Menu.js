import React, { Fragment } from 'react'
import { signout, isAuthenticate } from '../Auth'
import { Link, withRouter } from 'react-router-dom'
const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" }
    } else {
        return { color: "#ffffff" }

    }
}
const Menu = ({ history }) => {
    return (
        <div>
            <ul className='nav nav-tabs bg-primary'>
                <li className='nav-item'>
                    <Link className='nav-link' style={isActive(history, '/')} to='/'>
                        Home
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' style={isActive(history, '/shop')} to='/Shop'>
                        Shop
                    </Link>
                </li>
                {isAuthenticate() && isAuthenticate().user.role === 0 && (
                    <li className='nav-item'>
                        <Link className='nav-link' style={isActive(history, '/user/dashboard')} to='/user/dashboard'>
                            Dashboared
                        </Link>
                    </li>

                )}
                {isAuthenticate() && isAuthenticate().user.role === 1 && (
                    <li className='nav-item'>
                        <Link className='nav-link' style={isActive(history, '/admin/dashboard')} to='/admin/dashboard'>
                            Dashboared
                        </Link>
                    </li>

                )}


                {!isAuthenticate() && (
                    <Fragment>
                        <li className='nav-item'>
                            <Link className='nav-link' style={isActive(history, '/signin')} to='/signin'>
                                signin
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' style={isActive(history, '/signup')} to='/signup'>
                                signup
                            </Link>
                        </li>

                    </Fragment>

                )}
                {isAuthenticate() && (


                    <li className='nav-item'>
                        <span className='nav-link' style={{ cursor: 'pointer', color: '#ffffff' }} onClick={() => signout(() => {
                            history.push("/")
                        })}>
                            signout
                        </span>
                    </li>

                )}
            </ul>

        </div>
    )
}
export default withRouter(Menu);
