import React, { useEffect, useState } from "react"


const AppContext= React.createContext()



const AppProvider=(props)=>{

const [token,settoken]=useState(localStorage.getItem("token"))
const [count,setcount]=useState(0)
const [user,setuser]=useState(localStorage.getItem("user"))


useEffect(()=>{
settoken(localStorage.getItem("token"))
console.log(token,'muneeburrehman')
setuser(localStorage.getItem("user"))
},[count])

localStorage.setItem("token",JSON.stringify(""))
const Base_url_=`https://b1c9-2405-201-3037-e814-db4-d4e9-276d-f1d4.ngrok-free.app`
return (
<AppContext.Provider value={[token,settoken,count,setcount,user,setuser,Base_url_]}>{props.children}</AppContext.Provider>
)    


}




export {AppProvider,AppContext}
