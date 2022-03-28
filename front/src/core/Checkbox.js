import React,{useState,useEffect} from 'react'




const Checkbox=({categories,handleFilters})=>{

    const [checked,setchecked]=useState([]);

 const handletoggle= c =>()=>{
    const currentCategoryId=checked.indexOf(c)
    const newCheckedcategoryId=[...checked]


    if(currentCategoryId===-1){
        newCheckedcategoryId.push(c)
    }else{
        newCheckedcategoryId.splice(currentCategoryId,1)
    }
    console.log(newCheckedcategoryId)
    setchecked(newCheckedcategoryId)
    handleFilters(newCheckedcategoryId)
 }

   return categories.map((c,i)=>(
     <li key={i} className='list-unstyled'>
         <input  onChange={handletoggle(c._id)}  value={checked.indexOf(c._id===-1)} type="checkbox" className='form-check-input'/>
         <label className='form-check-lable'>{c.name}</label>
     </li>
   ) )   

   }
   

   export default  Checkbox;
