import React,{ useState } from 'react'
import Layout from '../core/Layout'
import { isAuthenticate } from '../Auth'
import { createCategory } from './Apiadmin'
import { Link } from 'react-router-dom'
const AddCategory=()=>{
   const[name,setname]=useState('') 
   const[error,seterror]=useState('false') 
   const[success,setsuccess]=useState('false') 
   const {user,token}=isAuthenticate();


const handleChange=(e)=>{
    seterror('')
    setname(e.target.value)

}
const clicksubmit=(e)=>{
    e.preventDefault()
    seterror('')
    setsuccess(true)
    createCategory(user._id,token,{name})
    .then(data=>{
        if(data.error){
            seterror(true)
        }else{
            seterror("")
            setsuccess(true)
            console.log(data)
            alert("new Category created")
        }
    })

}

const showsuccess=()=>{
    if(success){
        return <h3 className='text-success'>{name} is created</h3>

    }
}
const showerror=()=>{
    if(error){
        return <h3 className='text-danger'> should be unique </h3>

    }
}

const goback=()=>(
    <div className='mt-5'>
        <Link to='/admin/dashboard' className='text-warning'>Back to dash board
        </Link>
    </div>
)

const newCategoryform=()=>(
    <form onSubmit={clicksubmit}>
        <div className='form-group'>
            <label className='text-muted'>Name</label>
            <input className='form-control' 
            text='text' 
            value={name}
            onChange={handleChange}
            autoFocus
            required
            />
            <button className='btn btn-outline-primary'>
                Create Category
            </button>
        </div>
    </form>
)


return (


    <Layout title='add new category' description='mern task going know'
      className="container col-md-8 offset-md-2">


         <div className='row'>
             <div className='col-md-8 offset-md-2'>
                 {newCategoryform()}
                 {/* {showsuccess()}
                 {showerror()}
                 {goback()} */}
                 
                 </div>
         </div>

      </Layout>
     

  )
}

export default AddCategory;