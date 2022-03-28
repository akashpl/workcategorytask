import React,{useState,useEffect} from "react";
import { Fragment } from "react";


const Radio=({prices,handleFilters})=>{
  

    const[value,setvalues]=useState(0)
    const handlechange=(event)=>{
        handleFilters(event.target.value)
        setvalues(event.target.value)

    }

    return prices.map((p,i)=>(
        <div key={i} className='list-unstyled'>
            <input  onChange={handlechange} name={p} value={`${p._id}`} type="radio" className='ml-4 mr-2'/>
            <label className='form-check-lable'>{p.name}</label>
        </div>
      ) )   
   
      }
      
   

export default Radio;