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

return (
<AppContext.Provider value={[token,settoken,count,setcount,user,setuser]}>{props.children}</AppContext.Provider>
)    


}




export {AppProvider,AppContext}
