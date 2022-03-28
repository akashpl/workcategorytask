import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import Card from './Card'
import { getCategories ,getFilteredProducts} from './apiCore'
import Checkbox from './Checkbox'
import { prices } from './FixedPrice'
import Radio from './Radio'
const Shop = () => {


    const[myFilters, setMyfilters]=useState({
        filters:{catrgory:[],price:[]}
    })
    const [categories, setcategories] = useState([]);
    const [error, seterror] = useState(false)
    const [limit, setlimit] = useState(6)
    const [skip, setskip] = useState(0)
    const [filterresults, setfilterresults] = useState([])
   const[size,setSize]=useState(0)
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                seterror(data.error)

            } else {
                setcategories(data)

            }
        })
    }


    const loadFilteredResults=newFilters=>{
        console.log(newFilters)
        getFilteredProducts(skip,limit,newFilters).then(data=>{
            if(data.error){
                seterror(data.error)
            }else{
                setfilterresults(data.data)
                setSize(data.size)
                setskip(0)
            }
        })
    }

    const loadmore=newFilters=>{
        let toSkip =skip +limit;

        console.log(newFilters)
        getFilteredProducts(toSkip,limit,newFilters.filters).then(data=>{
            if(data.error){
                seterror(data.error)
            }else{
                setfilterresults([...filterresults,data.data])
                setSize(data.size)
                setskip(toSkip)
            }
        })
    }

    const loadmorebutton=()=>{
        return (
            size>0 && size>=limit &&(
               <button onClick={loadmore} className='btn btn-warning mb-5'>load more</button>
            )
        )
    }



    useEffect(() => {
        init()
      //  loadFilteredResults(skip,limit ,myFilters.filters)
    }, [])

    const handleFilters = (filters, filterBy) => {
        console.log(filters, filterBy)

        const newFilters={...myFilters}
        myFilters.filters[filterBy]=filters;
       
          if(filterBy=='price'){
              let priceValues=handlePrice(filters);
              newFilters.filters[filterBy]=priceValues;

          }
          loadFilteredResults(myFilters.filter)


        setMyfilters(newFilters)
    }


    const handlePrice = value=>{
        const data=prices
        let array=[]
     
     
        for(let key in data){
            if(data[key]._id === parseInt (value)){
                array=data[key].array
            }
        
    }
    return array;

    };


   
    return (

        <Layout title=' shop page' description='mern task going know'
            className="container col-md-8 offset-md-2">


            <div className='row'>
                <div className='col-4'>
                    <h4>Filter by categories</h4>
                    <ul>
                        <Checkbox
                            categories={categories}
                            handleFilters={filters =>
                                handleFilters(filters, "category")} />

                    </ul>
                    
               
                    <h4>Filter by Price Range</h4>
                    <ul>
                        <Radio
                            prices={prices}
                            handleFilters={filters =>
                                handleFilters(filters, "price")} />

                    </ul>
                    
                </div>
               
                <div className='col-8'>
                   <h2 className='mb-4'>products</h2>
                   <div className='row'>
                        {filterresults.map((product,i)=>(
                                <Card key={i} product={product}/>
                                
                               
                        ))}
                   </div>
                   <hr/>
                   {loadmorebutton()}
                </div>



            </div>




        </Layout>


    )
}

export default Shop;