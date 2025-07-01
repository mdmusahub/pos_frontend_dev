import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import Navbar from './Navbar.jsx';
import moment from 'moment';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from './Contextapi.jsx';



const Main = () => {
  const [data, setData] = useState([]);
  const [createdAt, setCreatedAt] = useState("");
  const [updateID, setUpdateID] = useState(null);
  const [searchvalue, setsearchvalue] = useState("");
  const [variantdata, setvariantdata] = useState([]);
  const [variantModalOpen, setVariantModalOpen] = useState(false);
  const [selectedProductForVariant, setSelectedProductForVariant] = useState(null);
  const [quantities, setQuantities] = useState({})
  const [sort,setsort]=useState("");
  const [inventorydata,setInventorydata ] = useState([]);
  const [ismenu,setismenu ] = useState(false);


 const dataa=useContext(AppContext) 
 
 const [token,settoken,count,setcount,user,setuser,categorydata,setcategorydata,productName,setName,sku,setSku,categoryId,setCategoryId,description,setDescription,updateActive,setUpdateActive,variantName,setvariantName,variantValue,setvariantValue,variantprice,setvariantprice,inventoryquantity,setinventoryquantity,inventorylocation,setinventorylocation,variantsarray,setvariantsarray,productvariants,setproductvariants,productId,setproductId]=dataa
 
const navigate=useNavigate()


  const getData = () => {
    axios.get("https://b1c9-2405-201-3037-e814-db4-d4e9-276d-f1d4.ngrok-free.app/product/getAll",{
      headers:{'ngrok-skip-browser-warning':'true'},
    }).then((res) => {
      setData(res.data)
      console.log(res.data)
    });
  };
  
  const getcategorydata = () => {
    axios.get("https://b1c9-2405-201-3037-e814-db4-d4e9-276d-f1d4.ngrok-free.app/category/getAll",{
      headers:{'ngrok-skip-browser-warning':'true'},
    }).then((res) => {setcategorydata(res.data)});
  };

  const getvariantdata = () => {
    axios.get("https://b1c9-2405-201-3037-e814-db4-d4e9-276d-f1d4.ngrok-free.app/productVariant/getAll",{
      headers:{'ngrok-skip-browser-warning':'true'}}).then((res) => setvariantdata(res.data));
  };

  const getinventorydata=()=>{
      axios.get("https://b1c9-2405-201-3037-e814-db4-d4e9-276d-f1d4.ngrok-free.app/ProductInventory/getAll",{
      headers:{'ngrok-skip-browser-warning':'true'}
}).then((res) => {
  setInventorydata(res.data);
  console.log(res.data,'InventoryData')
})
  }

  useEffect(() => {
    getData();
    getcategorydata();
    getvariantdata();
    getinventorydata();
  }, []);

  const del = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios.delete(`https://b1c9-2405-201-3037-e814-db4-d4e9-276d-f1d4.ngrok-free.app/product/delete/${id}`).then(() => getData());
    }
  };

  const resetForm = () => {
    setName("");
    setSku("");
    setCategoryId("");
    setDescription("");
    setUpdateID(null);
    setUpdateActive(false);
    setCreatedAt("");
  };



  const sub = (e) => {
    e.preventDefault();
    const obj = {
      productName,
      sku,
      categoryId,
      description,
      createdAt: updateActive ? createdAt : new Date(),
      updatedAt: new Date(),
    };

    if (updateActive) {
      axios.put(`https://b1c9-2405-201-3037-e814-db4-d4e9-276d-f1d4.ngrok-free.app/product/update/${updateID}`, obj).then(() => {
        getData();
        resetForm();
      });
    } else {
      axios.post("https://b1c9-2405-201-3037-e814-db4-d4e9-276d-f1d4.ngrok-free.app/product/create", obj).then(() => {
        getData();
        resetForm();
      });
    }
  };

  const increase = (id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: prev[id] + 1
    }))
  }

  const decrease = (id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : dlt(id)
    }))
  }

  const edit = (v) => {
productvariants.splice(0,productvariants.length)
variantdata.forEach((variant)=>{
if(variant.product.productId==v.productId){
  productvariants.push({variantName:variant.variantName,variantValue:variant.variantValue,variantprice:variant.price,variantproductId:variant.productVariantId,inventorylocation:"",inventoryquantity:""})    
  setproductvariants([...productvariants])
}  

})

setName(v.productName);
setSku(v.sku);
setCategoryId(v.category.categoryId);
setvariantprice(v.price);
setDescription(v.description);
setUpdateID(v.productId);
setUpdateActive(true);
setCreatedAt(v.createdAt);
setproductId(v.productId)

navigate('/Additems')


  };


  const array = data.map((v) => {
    let category = categorydata.find((k) => String(k.productId) === String(v.categoryId))

    return {
      ...v,
      categoryName: category ? category.categoryName : "Unknown",
    };
  });

  const filterdata = array.filter((product) =>
    product.productName.toLowerCase().includes(searchvalue.toLowerCase())
  );

  





    let sortproduct=filterdata.sort((min,max)=>{
  if(sort==="min-max"){
    console.log(min.price - max.price)
    return min.price - max.price
  }else if (sort==="max-min"){
    return max.price - min.price
  }
})





  // const[cartproduct,setcardpro]=useState({})

  let add = (v)=>{
    console.log(v);
    
    axios.post(`https://b1c9-2405-201-3037-e814-db4-d4e9-276d-f1d4.ngrok-free.app/order/create,v`).then((res)=>{
      console.log(res.data)
      setcardpro(res.data)
    })
  }

  return (
    <>
     <div className='flex justify-center items-center'>
      <Navbar searchQuery={searchvalue} setismenu={setismenu} ismenu={ismenu} setSearchQuery={setsearchvalue} sortdata={setsort} />
     
        
     



      {variantModalOpen && selectedProductForVariant && (
        <div className="fixed inset-10 backdrop-blur-sm bg-white/10 z-50 flex items-center justify-center">
          <div className="bg-white w-[90vw] max-w-md p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-3">Variants for {selectedProductForVariant.productName}</h2>
            <div className="max-h-48 overflow-y-auto space-y-2">
              {variantdata
                .filter(variant => String(variant.productId) === String(selectedProductForVariant.productvariantId))
                .map((variant) => (
                  <div key={variant.productVariantId} className="bg-gray-100 p-2 rounded shadow-sm text-sm">
                    <p><strong>{variant.variantName}</strong> <button></button> : {variant.variantValue}</p> 
                   <div className='flex justify-between'>
                    <p>Price: ₹{variant.price}</p> 
                   <button className='bg-green-700 pl-7 pr-7 py-2 text-white' onClick={()=>add(variant)}>Add

                   </button>
                    </div>
                  </div>
                ))}
            </div>
            <button onClick={() => setVariantModalOpen(false)} className="mt-4 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 text-sm">
              Close
            </button>
          </div>
        </div>
      )}

      <div onMouseEnter={()=>{setismenu(false)}} className="flex absolute top-[10%] flex-wrap gap-7 min-h-screen w-full bg-slate-200 p-4">
        {sortproduct.map((v,i) => (
          <div key={v.productId} className="w-[300px] h-72 bg-white text-black p-4 rounded-lg shadow-md font-serif relative">
            <NavLink to={`/pr/${v.productId}`}>
            <p><strong>Name:</strong> {v.productName}</p>
            <p><strong>SKU:</strong> {v.sku}</p>
            <p><strong>Category:</strong> {v.category.name}</p>
            <p><strong>Description:</strong> {v.description}</p>
          
           </NavLink>
            <div className="mt-2 flex justify-center gap-3">
              <button onClick={() => edit(v)} className="bg-green-900 text-white px-4 py-1 rounded">Edit</button>
              <button onClick={() => del(v.productId)} className="bg-yellow-600 text-white px-4 py-1 rounded">Delete</button>
            </div>
        
          </div>


        ))}
        <NavLink to={'Additems'} className='w-fit h-[40px]'>
      <button onClick={()=>{setUpdateActive(false)}} className='mt-3 bg-blue-600 text-white px-4 rounded hover:bg-blue-700 h-[100%] w-[100%] cursor-pointer'>Add all products inventory category variants</button>
        </NavLink>
      </div>
       </div>
    </>
  );
};

export default Main;
