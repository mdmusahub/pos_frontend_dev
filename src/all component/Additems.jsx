import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from './Navbar'
import { AppContext } from './Contextapi'



const Additems = () => {

  const [productdata, setproductdata] = useState([]);
  const [variantdata, setvariantdata] = useState([]);
  const [inventorydata,setInventorydata ] = useState([]);
  const [updatevariantName, setupdatevariantName] = useState("");
  const [updatevariantValue, setupdatevariantValue] = useState("");
  const [updatevariantprice, setupdatevariantprice] = useState("");
  const [updatevariantproductId, setupdatevariantproductId] = useState("");
  const [index,setindex]= useState("")


const data=useContext(AppContext) 

const [token,settoken,count,setcount,user,setuser,categorydata,setcategorydata,productName,setName,sku,setSku,categoryId,setCategoryId,description,setDescription,updateActive,setUpdateActive,variantName,setvariantName,variantValue,setvariantValue,variantprice,setvariantprice,inventoryquantity,setinventoryquantity,inventorylocation,setinventorylocation,variantsarray,setvariantsarray,productvariants,setproductvariants,productId,setproductId]=data

console.log(productvariants,'muneeb')

function getproductvariant(v){
console.log(JSON.parse(v),'muneeb ur rehman')
setupdatevariantName(JSON.parse(v).variantName)
setupdatevariantValue(JSON.parse(v).variantValue)
setupdatevariantprice(JSON.parse(v).variantprice)
setupdatevariantproductId(JSON.parse(v).variantproductId)
setindex(JSON.parse(v).index)
inventorydata.forEach(inventory => { 
 if(inventory.productVariant.productVariantId==JSON.parse(v).variantproductId){
  
   setinventorylocation(inventory.location)
   setinventoryquantity(inventory.quantity)
   productvariants[index].inventorylocation=inventorylocation
   productvariants[index].inventoryquantity=inventoryquantity
   setproductvariants([...productvariants])
}else{
  setinventorylocation("")
  setinventoryquantity("")
}
console.log(productvariants,'this is productvariants')

});

}




  const getproductData = () => {
    axios.get("https://b1c9-2405-201-3037-e814-db4-d4e9-276d-f1d4.ngrok-free.app/product/getAll",{
      headers:{'ngrok-skip-browser-warning':'true'},
    }).then((res) => {
      setproductdata(res.data)
      console.log(res.data,'productData')
    });
  };
  
  const getcategorydata = () => {
    axios.get("https://b1c9-2405-201-3037-e814-db4-d4e9-276d-f1d4.ngrok-free.app/category/getAll",{
      headers:{'ngrok-skip-browser-warning':'true'},
    }).then((res) => {
      setcategorydata(res.data)
      console.log(res.data,'categorydata')
    });
  };

  const getvariantdata = () => {
    axios.get("https://b1c9-2405-201-3037-e814-db4-d4e9-276d-f1d4.ngrok-free.app/productVariant/getAll",{
      headers:{'ngrok-skip-browser-warning':'true'}}).then((res) =>{ 
        setvariantdata(res.data)
        console.log(res.data,'variantdata')
      });
  };

    let getInventoryData = () => {
    axios.get("https://b1c9-2405-201-3037-e814-db4-d4e9-276d-f1d4.ngrok-free.app/ProductInventory/getAll",{
      headers:{'ngrok-skip-browser-warning':'true'}
}).then((res) => {
  setInventorydata(res.data);
  console.log(res.data,'InventoryData')
});
};


  useEffect(() => {
    getproductData();
    getcategorydata();
    getvariantdata();
    getInventoryData();
  }, []);




  const handleSubmit = (e) => {
    e.preventDefault();
   
  if(updateActive==false){  
    const obj = {
  productName: productName,
  sku: sku,
  categoryId: Number(categoryId),
  description: description,
  variantRequests: variantsarray.map(v => ({
      productId:1122,
      variantName: v.variantName,
      variantValue: v.variantValue,
      price: v.price,
      inventoryRequest: {
        quantity: Number(v.quantity),
        location: v.location,
        variantId:12
      }
}))
}
console.log(obj);

if(obj.variantRequests.length!==0 && productName!=="" && sku!=="" && categoryId!=="" && description!==""){

  axios.post("https://b1c9-2405-201-3037-e814-db4-d4e9-276d-f1d4.ngrok-free.app/product/create", obj).then(() => {
 
 setName("") 
 setSku("")
 setDescription("")
 setCategoryId(null)
 setvariantsarray([])
 setCategoryId("")
 setvariantName("")
 setvariantValue("")
 setvariantprice("")
 setinventoryquantity("")
 setinventorylocation("")
 
 window.alert("Product added successfully ") 
  });

}
else if(productName==""){
 setName("") 
 setSku("")
 setDescription("")
 setCategoryId(null)
 setvariantsarray([])
 setCategoryId("")
 setvariantName("")
 setvariantValue("")
 setvariantprice("")
 setinventoryquantity("")
 setinventorylocation("")

window.alert("please enter product name") 
}
else if(sku==""){
 setName("") 
 setSku("")
 setDescription("")
 setCategoryId(null)
 setvariantsarray([])
 setCategoryId("")
 setvariantName("")
 setvariantValue("")
 setvariantprice("")
 setinventoryquantity("")
 setinventorylocation("")

window.alert("please enter sku") 
}
else if(description==""){
 setName("") 
 setSku("")
 setDescription("")
 setCategoryId(null)
 setvariantsarray([])
 setCategoryId("")
 setvariantName("")
 setvariantValue("")
 setvariantprice("")
 setinventoryquantity("")
 setinventorylocation("")

window.alert("please enter description") 
}
else if(categoryId==""){
 setName("") 
 setSku("")
 setDescription("")
 setCategoryId(null)
 setvariantsarray([])
 setCategoryId("")
 setinventoryquantity("")
 setinventorylocation("")
 setvariantName("")
 setvariantValue("")
 setvariantprice("")

window.alert("please select category name") 
}
else{
 setName("") 
 setSku("")
 setDescription("")
 setCategoryId(null)
 setvariantsarray([])
 setCategoryId("")
 setvariantName("")
 setvariantValue("")
 setvariantprice("")
 setinventoryquantity("")
 setinventorylocation("")

window.alert("please enter variants") 

}
}
else if (updateActive==true){
let obj={
  productName: productName,
  sku: sku,
  description: description,
  categoryId: categoryId,
  variant:productvariants.map(v => ({
      variantId: v.variantproductId,
      variantName: v.variantName,
      variantValue: v.variantValue,
      variantPrice: Number(v.variantprice),
      quantity: Number(v.inventoryquantity),
      location: v.inventorylocation
      }
))
}
console.log(obj,'assssssssssssssssssssssssssssssss')

if(productName!=="" && sku!=="" && categoryId!=="" && description!==""){
  axios.put(`https://b1c9-2405-201-3037-e814-db4-d4e9-276d-f1d4.ngrok-free.app/product/updateAllDetails/${productId}`, obj).then(() => {

 setName("")
 setSku("")
 setDescription("")
 setCategoryId(null)
 setvariantsarray([])
 setCategoryId("")
 setproductvariants([])
 setupdatevariantName("")
 setupdatevariantValue("")
 setupdatevariantprice("")
 setinventorylocation("")
 setinventoryquantity("")
 setUpdateActive(false)
window.alert("Product updated successfully") 

  });

}
else if(productName==""){

 setName("") 
 setSku("")
 setDescription("")
 setCategoryId(null)
 setvariantsarray([])
 setCategoryId("")
 setinventoryquantity("")
 setinventorylocation("")
 setupdatevariantName("")
 setupdatevariantValue("")
 setupdatevariantprice("")

window.alert("please enter Product name") 
}
else if(sku==""){

 setName("") 
 setSku("")
 setDescription("")
 setCategoryId(null)
 setvariantsarray([])
 setCategoryId("")
 setinventoryquantity("")
 setinventorylocation("")
 setupdatevariantName("")
 setupdatevariantValue("")
 setupdatevariantprice("")

window.alert("please enter sku id") 
}
else if(description==""){

 setName("") 
 setSku("")
 setDescription("")
 setCategoryId(null)
 setvariantsarray([])
 setCategoryId("")
 setinventoryquantity("")
 setinventorylocation("")
 setupdatevariantName("")
 setupdatevariantValue("")
 setupdatevariantprice("")

window.alert("please enter description") 
}



}

}


function getinventory(e){
e.preventDefault()  
if(variantName!=="" && variantValue!=="" && variantprice!=="" && inventoryquantity!=="" && inventorylocation!==""){
let obj={
variantName:variantName,
variantValue:variantValue,
price:variantprice,
quantity:inventoryquantity,
location:inventorylocation
}
variantsarray.push(obj)
setvariantsarray([...variantsarray])
console.log(variantsarray)
}
else if(variantName==""){
window.alert("Please enter variantname")
}
else if(variantValue==""){
window.alert("Please enter variantvalue")
}
else if(variantprice==""){
window.alert("Please enter variantprice")
}
else if(inventoryquantity==""){
window.alert("Please enter quantity")
}
else if(inventorylocation==""){
window.alert("Please enter location")
}

setvariantName("")
setvariantValue("")
setvariantprice("")
setinventoryquantity("")
setinventorylocation("")

}

function updateinventory(e){
 e.preventDefault()
 if(updatevariantName!=="" && updatevariantValue!=="" && updatevariantprice!=="" && inventorylocation!=="" && inventoryquantity!==""){
 productvariants.splice(index,1,{variantName:updatevariantName,variantValue:updatevariantValue,variantprice:updatevariantprice,variantproductId:updatevariantproductId,inventorylocation:inventorylocation,inventoryquantity:inventoryquantity})   
setproductvariants([...productvariants])
setupdatevariantName("")
setupdatevariantValue("")
setupdatevariantprice("")
setinventorylocation("")
setinventoryquantity("")
}
else if(updatevariantName==""){
setupdatevariantName("")
setupdatevariantValue("")
setupdatevariantprice("")
setinventorylocation("")
setinventoryquantity("")
window.alert("please enter variant name ")
}
else if(updatevariantValue==""){
setupdatevariantName("")
setupdatevariantValue("")
setupdatevariantprice("")
setinventorylocation("")
setinventoryquantity("")
window.alert("please enter variant value ")
}
else if(updatevariantprice==""){
setupdatevariantName("")
setupdatevariantValue("")
setupdatevariantprice("")
setinventorylocation("")
setinventoryquantity("")
window.alert("please enter variant price ")
}
else if(inventorylocation==""){
setupdatevariantName("")
setupdatevariantValue("")
setupdatevariantprice("")
setinventorylocation("")
setinventoryquantity("")
window.alert("please enter inventory location ")
}
else if(inventoryquantity==""){
setupdatevariantName("")
setupdatevariantValue("")
setupdatevariantprice("")
setinventorylocation("")
setinventoryquantity("")
window.alert("please enter inventory quantity ")
}

}


  return (

    <div>

 <Navbar/>

  <div className="fixed flex justify-center items-center z-10 w-[100vw] h-[100vh]">
        <form
          className="bg-gradient-to-r from-slate-300 to-slate-300 p-4 rounded-lg w-[400px] h-[90vh] flex flex-col items-center"
        >
          <label htmlFor="productname">Enter Product name</label>
          <input id='productname' className="bg-emerald-900 py-1 px-2 w-full text-white" required type="text" placeholder="Product name" value={productName} onChange={(e) => setName(e.target.value)} />
          <label htmlFor="sku">Enter SKU</label>
          <input id='sku' className="bg-emerald-900 py-1 px-2 w-full text-white" type="text" placeholder="SKU" value={sku} onChange={(e) => setSku(e.target.value)} />
          <label htmlFor="description">Enter description</label>
          <input id='description' className="bg-emerald-900 py-1 px-2 w-full text-white" type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <label htmlFor="selectcategory">Select Category name</label>
       <select name="" value={categoryId} 
       id="selectcategory"
        className='bg-emerald-900 py-1 px-2 w-full text-white' onChange={(e)=>setCategoryId(e.target.value)}>
          <option value="">Select Category</option> 
          {categorydata.map((v)=>(
            <option key={v.categoryId} value={v.categoryId}
            className="bg-emerald-900 py-1 px-2 w-full text-white" placeholder="Category name">{v.name}</option>
          )
          )}
        </select>
        
          {updateActive==false?(
          <div
           className='flex flex-col  gap-2 w-[100%]'>
          <label htmlFor="variant" className='text-center'>Enter variant details</label>
          <input  id='variant' className="bg-emerald-900 py-1 px-2 w-full text-white" type="text" placeholder="Variant name" value={variantName} onChange={(e) => setvariantName(e.target.value)} />
          <input className="bg-emerald-900 py-1 px-2 w-full text-white" type="text" placeholder="Variant value" value={variantValue} onChange={(e) => setvariantValue(e.target.value)} />
          <input className="bg-emerald-900 py-1 px-2 w-full text-white" type="number" placeholder="variant Price" value={variantprice} onChange={(e) => setvariantprice(e.target.value)} />
          <label htmlFor="quantity" className='text-center'>Enter inventory details</label>
          <input id="quantity" className="bg-emerald-900 py-1 px-2 w-full text-white" type="number" placeholder="quantity" value={inventoryquantity} onChange={(e) => setinventoryquantity(e.target.value)} />
          <input className="bg-emerald-900 py-1 px-2 w-full text-white" type="text" placeholder="location" value={inventorylocation} onChange={(e) => setinventorylocation(e.target.value)} />
          <button  className="bg-emerald-600 py-1 px-2 w-full text-white cursor-pointer mb-4" onClick={(e)=>{getinventory(e)}}>Create Variant and inventory</button>
          </div>)
           :(
            <div className='flex flex-col  gap-2 w-[100%]'>
              <label htmlFor="variant" className='text-center'>Update variant details</label>
               <select name="" onChange={(e)=>{getproductvariant(e.target.value)}}
           id='variant'
           className="bg-emerald-900 py-1 px-2 w-full text-white"
           >
            <option value="">Select variants</option> 
          {productvariants.map((v,i)=>(
            <option key={v.variantproductId} value={JSON.stringify({variantName:v.variantName,variantValue:v.variantValue,variantprice:v.variantprice,variantproductId:v.variantproductId,index:i})}
            className="bg-emerald-900 py-1 px-2 w-full text-white" placeholder="Category name">{v.variantName}:{v.variantValue} price:{v.variantprice}</option>
          )
          )}
             </select>
          <input  id='variant' className="bg-emerald-900 py-1 px-2 w-full text-white" type="text" placeholder="Variant name" value={updatevariantName} onChange={(e) => setupdatevariantName(e.target.value)} />
          <input className="bg-emerald-900 py-1 px-2 w-full text-white" type="text" placeholder="Variant value" value={updatevariantValue} onChange={(e) => setupdatevariantValue(e.target.value)} />
          <input className="bg-emerald-900 py-1 px-2 w-full text-white" type="number" placeholder="variant Price" value={updatevariantprice} onChange={(e) => setupdatevariantprice(e.target.value)} />
          <label htmlFor="quantity" className='text-center'>Update inventory detaits</label>
          <input id="quantity" className="bg-emerald-900 py-1 px-2 w-full text-white" type="number" placeholder="quantity" value={inventoryquantity} onChange={(e) => setinventoryquantity(e.target.value)} />
          <input className="bg-emerald-900 py-1 px-2 w-full text-white" type="text" placeholder="location" value={inventorylocation} onChange={(e) => setinventorylocation(e.target.value)} />
          <button  className="bg-emerald-600 py-1 px-2 w-full text-white cursor-pointer mb-4" onClick={(e)=>{updateinventory(e)}}>Update Variant and inventory</button>
          </div>
           )}
          

          
          <button type="submit"onClick={(e)=>{handleSubmit(e)}} className="bg-yellow-600 rounded-lg px-6 text-white font-bold cursor-pointer">
            {updateActive ? "Update" : "Add product"}
          </button>

        </form>
      </div>

    </div>
  )
}

export default Additems
