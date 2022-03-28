import { API } from "../config"



export const authenticate=(data,next)=>{
    if(typeof window !=='undefined'){
        localStorage.setItem('signin',JSON.stringify(data))
        next()
    }
}

export const signout=(next)=>{
    if(typeof window !=='undefined'){
        localStorage.removeItem('signin')
        next()
        return fetch(`${API}signout`,{
            method:'GET'
        })
        .then(respons=>{
            console.log('signout',respons)
        })
        .catch(err=>{
            console.log(err)
        })
    }


}

export const isAuthenticate=()=>{
    if(typeof window == 'undefined'){
        return false
    }
    if(localStorage.getItem('signin')){
        return JSON.parse(localStorage.getItem('signin'))
    }else{

    return false;
     }

};
