import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import { getCategories } from './apiCore'
import Card from './Card'
import {list} from './apiCore'

const Search = () => {

    const [data, setdata] = useState({
        categories: [],
        category: '',
        search: "",
        results: [],
        searched: false

    })


    const { categories, category, search, results, searched } = data



    const loadcategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setdata({ ...data, categories: data })
            }
        })
    }

    useEffect(() => {
        loadcategories()


    }, [])

    const searchedproducts=(results=[])=>{
         return(
             <div className='row'>
                 {results.map((product,i)=>{
                      <Card key={i} product={product}/>
                 })}
             </div>

         ) 
    }

    const searchdata=()=>{
        console.log(search,category)
        if(search){
            list({search:search || undefined, category:category})
            .then(response=>{
                if(response.error){
                  console.log(response.error)   
                }else{
                    setdata({...data,results:response, searched:true})
                }
            })
        }
    }
  
    const searchsubmit = (e) => {
        e.preventDefault()
        searchdata()
      //
    }

    const handlechange=name=>event=>{

         setdata({...data,[name]:event.target.value, searched:false})


    }

    const serchform = () => (
                <form onSubmit={searchsubmit}>
            <span className='input-group-text'>
               
               <div className='input-group input-group'>
                   <div className='input-groupprepend'>
                       <select name="btn mt-2"
                        onChange={handlechange("category")}>
                           
                           <option value="all">pick category</option>
                           {categories.map((c,i)=>(<option key={i} value={c._id}>
                               {c.name}
                           </option> ) )}
                           
                             </select>
                   </div>
              
               
                <input type="search" className='form-control'
                    onChange={handlechange("search")}
                     />
                 </div>
                 <div  className='btn input-group-append' style={{border:"none"}}>

                     <button className='input-group-text '>
                         search
                     </button>
                 </div>

            </span>
        </form>
    )
    return (
        <div className='row'>

            <div className='container'>
                {serchform()}


                
                
                </div>

                <div className='container-fluid mb-3'>
                  {searchedproducts(results)}
                </div>

        </div>
    )
}

export default Search;