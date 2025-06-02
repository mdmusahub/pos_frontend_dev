import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.jsx';
import moment from 'moment';
import Newcarousel from "./NewCarousel.jsx";

const Main = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updateID, setUpdateID] = useState(null);
  const [updateActive, setUpdateActive] = useState(false);
  const [searchvalue, setsearchvalue] = useState("");
  const [categorydata, setcategorydata] = useState([]);
  const [variantdata, setvariantdata] = useState([]);
  const [variantModalOpen, setVariantModalOpen] = useState(false);
  const [selectedProductForVariant, setSelectedProductForVariant] = useState(null);

  const getData = () => {
    axios.get("http://localhost:3000/product").then((res) => setData(res.data));
  };

  const getcategorydata = () => {
    axios.get("http://localhost:3000/Category").then((res) => setcategorydata(res.data));
  };

  const getvariantdata = () => {
    axios.get("http://localhost:3000/product_variant").then((res) => setvariantdata(res.data));
  };

  useEffect(() => {
    getData();
    getcategorydata();
    getvariantdata();
  }, []);

  const del = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios.delete(`http://localhost:3000/product/${id}`).then(() => getData());
    }
  };

  const resetForm = () => {
    setName("");
    setSku("");
    setCategoryId("");
    setPrice("");
    setDescription("");
    setUpdateID(null);
    setUpdateActive(false);
    setCreatedAt("");
  };

  const sub = (e) => {
    e.preventDefault();
    const obj = {
      name,
      sku,
      category_id,
      price,
      description,
      created_at: updateActive ? createdAt : new Date(),
      updated_at: new Date(),
    };

    if (updateActive) {
      axios.put(`http://localhost:3000/product/${updateID}`, obj).then(() => {
        getData();
        resetForm();
      });
    } else {
      axios.post("http://localhost:3000/product", obj).then(() => {
        getData();
        resetForm();
      });
    }
  };

  const edit = (v) => {
    setName(v.name);
    setSku(v.sku);
    setCategoryId(v.category_id);
    setPrice(v.price);
    setDescription(v.description);
    setUpdateID(v.id);
    setUpdateActive(true);
    setCreatedAt(v.created_at);
  };

  const openVariantModal = (product) => {
    setSelectedProductForVariant(product);
    setVariantModalOpen(true);
  };

  const array = data.map((v) => {
    let category = categorydata.find((k) => String(k.id) === String(v.category_id))

    return {
      ...v,
      category_name: category ? category.name : "Unknown",
    };
  });

  const filterdata = array.filter((product) =>
    product.name.toLowerCase().includes(searchvalue.toLowerCase())
  );

  const[cartproduct,setcardpro]=useState({})

  let add = (v)=>{
    console.log(v);
    
    axios.post(`http://localhost:3000/order_item`,v).then((res)=>{
      console.log(res.data)
      setcardpro(res.data)
    })
  }

  return (
    <>
      <Navbar searchQuery={searchvalue} setSearchQuery={setsearchvalue} />
      <Newcarousel />

      {/* Form */}
      <div className="fixed top-[10%] flex justify-center items-center z-10">
        <form
          onSubmit={sub}
          className="bg-gradient-to-r from-slate-300 to-slate-300 p-4 rounded-lg flex items-center gap-3 w-[95vw]"
        >
          <input className="bg-emerald-900 py-1 px-2 w-full text-white" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="bg-emerald-900 py-1 px-2 w-full text-white" type="text" placeholder="SKU" value={sku} onChange={(e) => setSku(e.target.value)} />
          <input className="bg-emerald-900 py-1 px-2 w-full text-white" type="number" placeholder="Category ID" value={category_id} onChange={(e) => setCategoryId(e.target.value)} />
          <input className="bg-emerald-900 py-1 px-2 w-full text-white" type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
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

      {variantModalOpen && selectedProductForVariant && (
        <div className="fixed inset-10 backdrop-blur-sm bg-white/10 z-50 flex items-center justify-center">
          <div className="bg-white w-[90vw] max-w-md p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-3">Variants for {selectedProductForVariant.name}</h2>
            <div className="max-h-48 overflow-y-auto space-y-2">
              {variantdata
                .filter(variant => String(variant.product_id) === String(selectedProductForVariant.id))
                .map((variant) => (
                  <div key={variant.id} className="bg-gray-100 p-2 rounded shadow-sm text-sm">
                    <p><strong>{variant.variant_name}</strong> <button></button> : {variant.variant_value}</p> 
                   <div className='flex justify-between'>
                    <p>Price: ₹{variant.price}</p> 
                   <button className='bg-green-700 pl-7 pr-7 py-2 text-white' onClick={()=>add(variant)} >Add</button>
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

      {/* Product Cards */}
      <div className="flex absolute top-[60%] flex-wrap gap-7 min-h-screen w-full bg-slate-200 p-4">
        {filterdata.map((v) => (
          <div key={v.id} className="w-[300px] bg-white text-black p-4 rounded-lg shadow-md font-serif relative">
            <p><strong>ID:</strong> {v.id}</p>
            <p><strong>Name:</strong> {v.name}</p>
            <p><strong>SKU:</strong> {v.sku}</p>
            <p><strong>Category:</strong> {v.category_name}</p>
            <p><strong>Price:</strong> ₹{v.price}</p>
            <p><strong>Description:</strong> {v.description}</p>
            <p><strong>Created At:</strong> {moment(v.created_at).format("MMM Do YYYY, h:mm:ss a")}</p>
            <p><strong>Updated At:</strong> {moment(v.updated_at).format("MMM Do YYYY, h:mm:ss a")}</p>

            <div className="mt-2 flex justify-center gap-3">
              <button onClick={() => edit(v)} className="bg-green-900 text-white px-4 py-1 rounded">Edit</button>
              <button onClick={() => del(v.id)} className="bg-yellow-600 text-white px-4 py-1 rounded">Delete</button>
            </div>

            <button
              type="button"
              onClick={() => openVariantModal(v)}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
            >
              Add / Show Variants
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Main;
