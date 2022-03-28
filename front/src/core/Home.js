import React,{useState,useEffect} from 'react'
import Layout  from './Layout'
import { getProducts } from './apiCore'
import Card from './Card'
import Search  from './Search'




const Home=()=>{
 
 const[productsBySell,setProductsBySell]=useState([])
 
 const[productsByArrival,setProductsByArrival]=useState([])
 const[error,seterror]=useState(false)
 

const loadProductsBySell=()=>{
  getProducts('sold')
  .then(data=>{
    if(data.error){
      seterror(data.error)
    }else{
      setProductsBySell(data)

    }

  })
}


const loadProductsByArrival =()=>{
  getProducts('createdAt')
  .then(data=>{
    if(data.error){
      seterror(data.error)
    }else{
      setProductsByArrival(data)

    }

  })
}


useEffect(()=>{
  loadProductsBySell()
  loadProductsByArrival()
},[])


  return (
    <div>
        <Layout title='Home page' description='mern task going know' className="container-fluid">
           
           <h2><Search/></h2>
            <h2 className='mb-4'>Best sellers</h2>
            <div className='row'>
            {productsBySell.map((product,i)=>(<Card key={i} product={product}/>))}
       
            </div>
            <div className='row'>
            <h2 className='mb-4'>New Arrivals</h2>
            {productsByArrival.map((product,i)=>(
            <Card key={i} product={product}/>))}
            </div>
       
       
       
       
        </Layout>

    </div>
  )
}

export default Home;