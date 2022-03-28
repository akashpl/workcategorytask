import React, { useState, useEffect } from "react"
import Layout from "../core/Layout"
import { isAuthenticate } from "../Auth"
import { Link, Redirect } from "react-router-dom"
import { createProduct,getCategories } from "./Apiadmin"



const Addproduct = () => {

   
    const [ values, setValues ] = useState({
        name: "",
        description: '',
        price: '',
        categories: [],
        category: "",
        shipping: "",
        quantity: "",
        photo: "",
        loading: false,
        error: "",
        createdproduct: "",
        redirectToProfile: false,
        formData: ""




    })

   
    const { user, token } = isAuthenticate();


    const { name,
        description,
        price,
        categories,
        catagory,
        shipping,
        quantity,
        loading,
        error,
        createdproduct,
        redirectToProfile,
        formData,
    } = values


 const init=()=>{
    getCategories()
    .then(data=>{
       if(data.error){
           setValues({...values,error:data.error})
       }else{
             setValues({...values, 
                categories:data,  
                formData:new FormData()})
       }
    })
 }


    useEffect(()=>{
      init()   
    },[])

const handleChange=name=>event=>{
    const value=name==='photo' ? event.target.files[0] : event.target.value
    formData.set(name,value)
    setValues({...values,[name]:value})
}



const clickSubmit=(event)=>{
  event.preventDefault()
  setValues({...values,error:"" ,loading:true})
  createProduct(user._id,token,formData)
  .then(data=>{
      if(data.error){
          setValues({...values,error:data.error})
      }else{
          setValues({...values,name:'',description:"",price:"",photo:"",quantity:'',loading:false
       , createProduct:data.name})
         console.log(data)
         alert("product added")

      }
  })

}
    const newPostform = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange("photo")} type="file"
                        name="photo" accept="image/*" />
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted">name</label>
                <input onChange={handleChange("name")} type="text" className="form-control"
                    value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <input onChange={handleChange("description")} type="textarea" className="form-control"
                    value={description} />
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input onChange={handleChange("price")} type="number" className="form-control"
                    value={price} />
            </div>
            <div className="form-group">
                <label className="text-muted">catagory</label>
                <select onChange={handleChange("category")} className="form-control"
                >
                    <option>please select</option>
                    {categories && categories.map((c,i)=>(
                        <option key={i} value={c._id}>{c.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">   Quantity</label>
                <input onChange={handleChange("quantity")} type="number" className="form-control"
                    value={quantity} />
            </div>


            <div className="form-group">
                <label className="text-muted">shipping</label>
                <select onChange={handleChange("shipping")} className="form-control" >
                    <option value="0">No</option>
                    <option value="1">yes</option>

                </select>
            </div>

            <button className="btn btn-outline-primary">create Product</button>

        </form>


    )


    return (
        <Layout title='add new product' description='mern task going know'
            className="container col-md-8 offset-md-2">


            <div className='row'>
                <div className='col-md-8 offset-md-2'>

                    {newPostform()}

                     
                </div>
            </div>

        </Layout>


    )
}

export default Addproduct;