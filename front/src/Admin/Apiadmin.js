import { API } from "../config";

export const createCategory =(userId,token,category)=>{
    return fetch(`${API}category/create/${userId}`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(category)
    })
      .then(response=>{
          return response.json()
      })
      .catch(err=>{
          console.log(err)
      })

    
    }



    export const createProduct =(userId,token,product)=>{
        return fetch(`${API}product/create/${userId}`,{
            method:'POST',
            headers:{
                Accept:'application/json',
                 Authorization:`Bearer ${token}`
            },
            body:product
        })
          .then(response=>{
              return response.json()
          })
          .catch(err=>{
              console.log(err)
          })
    
        
        }
    
    
export const getCategories=()=>{
    return fetch(`${API}categories`,{
         method:"GET"

    })
    .then(response=>{
        return response.json();

    })
    .catch(err=> console.log(err))
}










































    
// export const isAuthenticate=()=>{
//     if(typeof window == 'undefined'){
//     return false
//     }
//     if(localStorage.getItem('signin')){
//         return JSON.parse(localStorage.getItem("signin"))
//     }else{
//         return false
//     }
// }

// export  const signinry = user  => (

//     axios.post("http://localhost:5000/signin", user)
//         .then(response => {
//             localStorage.setItem('signin', JSON.stringify(response.data));
//             alert("added")
           
//         })
//         .catch(err => {
//             console.log(err)
//             alert("error")
//         })
// )
