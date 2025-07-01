import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { AppContext } from './Contextapi'
import { useContext } from 'react'

const Singleproduct = () => {
    const[prdata,Setprdata]=useState({})
    const[indata,Setindata]=useState([])

    let singleId = useParams()
    console.log(singleId)
 let data = useContext(AppContext)
const [token,settoken,count,setcount,user,setuser,Base_url_]=data
    const getpr=()=>{
        axios.get(`${Base_url_}/product/getById/${singleId.id}`,{
      headers:{'ngrok-skip-browser-warning':'true'},
    }).then((res) => {
      Setprdata(res.data)
      console.log(res.data)
    });
    }; 
     const getIn=()=>{
        axios.get(`${Base_url_}/ProductInventory/getAll`,{
      headers:{'ngrok-skip-browser-warning':'true'}
    }).then((res)=>{
      Setindata(res.data)
      console.log(res.data)
    });
    };
    useEffect(()=>{
        getpr()
        getIn()
    },[])

    
  return (
    <>    
 <div className="flex flex-col justify-center items-center min-h-screen">
  <div className="flex flex-col bg-slate-100 items-start p-8 rounded-lg shadow-md h-[800px] w-[500px]">
    <h1 className="font-serif text-3xl font-bold mb-4 text-center w-full">{prdata.productName}</h1>

    <div className="mb-2 text-xl">
      <span className="text-gray-500 font-bold">Description: </span>
      <span className="text-black font-normal">{prdata.description}</span>
    </div>

    <div className="mb-4 text-xl">
      <span className="text-gray-500 font-bold">Category: </span>
      <span className="text-black font-normal">{prdata.category?.name}</span>
    </div>
   {
    indata.filter(v => v.product?.productId===prdata.productId).map((v)=>(
        <div key={v.inventoryId} className="mb-4 text-xl">
            <span className="text-gray-500 font-bold">Location:</span>
            <span className="text-black font-normal">{v.location}</span>
        </div>
    ))
   }
    <div className="w-72 flex gap-2 flex-row">
      {indata
        .filter(i => i.product?.productId === prdata.productId)
        .map((i) => (
          <button key={i.inventoryId} className="bg-white p-4 mb-3  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600">
            <div className="text-gray-700 font-semibold">
              {i.productVariant?.variantName}:{" "}
              <span className="text-black font-normal">{i.productVariant?.variantValue}</span>
            </div>
            <div className="text-gray-700">
              <span className="font-semibold">Price: </span>
              <span className="text-black">₹{i.productVariant?.price}</span>
            </div>
            <div className="text-gray-700">
              <span className="font-semibold">Quantity: </span>
              <span className="text-black">{i.quantity}</span>
            </div>
          </button>
      ))}
    </div>
  </div>
</div>

    
    </>



  )
}

export default Singleproduct