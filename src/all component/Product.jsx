import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.jsx';
import { Link } from 'react-router-dom';
import { AppContext } from './Contextapi'
import { useContext } from 'react'

const Main = () => {
  const [data, setData] = useState([]);
  const [productName, setName] = useState("");
  const [sku, setSku] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [updateID, setUpdateID] = useState(null);
  const [updateActive, setUpdateActive] = useState(false);
  const [searchvalue, setsearchvalue] = useState("");
  const [categorydata, setcategorydata] = useState([]);

  let data1 = useContext(AppContext)
 const [token,settoken,count,setcount,user,setuser,Base_url_]=data1

  const getData = () => {
    axios.get(`${Base_url_}/product/getAll`,{
      headers:{'ngrok-skip-browser-warning':'true'},
    }).then((res) => {
      setData(res.data)
      console.log(res.data)
      console.log(res)
    });
  };
  
  const getcategorydata = () => {
    axios.get(`${Base_url_}/category/getAll`,{
      headers:{'ngrok-skip-browser-warning':'true'},
    }).then((res) => {setcategorydata(res.data)});
  };

  useEffect(() => {
    getData();
    getcategorydata();
  }, []);

  const del = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios.delete(`${Base_url_}/product/delete/${id}`).then(() => getData());
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
    };

    if (updateActive) {
      axios.put(`${Base_url_}/product/update/${updateID}`, obj).then(() => {
        getData();
        resetForm();
      });
    } else {
      axios.post(`${Base_url_}/product/create`, obj).then(() => {
        getData();
        resetForm();
      });
    }
  };

  const edit = (v) => {
    setName(v.productName);
    setSku(v.sku);
    setCategoryId(v.category.categoryId);
    setDescription(v.description);
    setUpdateActive(true);
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



  return (
    <>
     <div className='flex justify-center items-center'>
      <Navbar searchQuery={searchvalue} setSearchQuery={setsearchvalue} />
      <div className="fixed top-[10%] flex justify-center items-center z-10">
        <form
          onSubmit={sub}
          className="bg-gradient-to-r from-slate-300 to-slate-300 p-4 rounded-lg flex items-center gap-3 w-[100vw]"
        >
          <input className="bg-emerald-900 py-1 px-2 w-full text-white" type="text" placeholder="Name" value={productName} onChange={(e) => setName(e.target.value)} />
          <input className="bg-emerald-900 py-1 px-2 w-full text-white" type="text" placeholder="SKU" value={sku} onChange={(e) => setSku(e.target.value)} />
          <input className="bg-emerald-900 py-1 px-2 w-full text-white" type="number" placeholder="Category ID" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} />
          <textarea className="bg-emerald-900 py-1 px-2 w-full text-white" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <button type="submit" className="bg-yellow-600 rounded-lg px-6 py-1 text-white font-bold">
            {updateActive ? "Update" : "Add"}
          </button>
          {updateActive && (
            <button type="button" onClick={resetForm} className="bg-red-700 hover:bg-red-800 text-white w-full py-1 rounded">
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="flex absolute top-[20%] flex-wrap gap-7 min-h-screen w-full bg-slate-200 p-4">
        {filterdata.map((v,i) => (
          <div key={v.productId} className="w-[300px] h-72 bg-white text-black p-4 rounded-lg shadow-md font-serif relative">
           <Link to = {`/pr/${v.productId}`}> <p><strong>Name:</strong> {v.productName}</p>
            <p><strong>SKU:</strong> {v.sku}</p>
            <p><strong>Category:</strong> {v.category.name}</p>
            
            <p><strong>Description:</strong> {v.description}</p>
            </Link>

            <div className="mt-2 flex justify-center gap-3">
              <button onClick={() => edit(v)} className="bg-green-900 text-white px-4 py-1 rounded">Edit</button>
              <button onClick={() => del(v.productId)} className="bg-yellow-600 text-white px-4 py-1 rounded">Delete</button>
              
            </div>
          </div>
        ))}
      </div>
       </div>
    </>
  );
};

export default Main;