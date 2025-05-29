// Main.jsx
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.jsx';
import moment from 'moment';
// import Carousel from "./Carousel.jsx"
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

  const getData = () => {
    axios.get("http://localhost:3000/product").then((res) => {
      setData(res.data);
    });
  };

  const getcategorydata = () => {
    axios.get("http://localhost:3000/Category").then((res) => {
      setcategorydata(res.data);
    });
  };

  useEffect(() => {
    getData();
    getcategorydata();
  }, []);

  const del = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios.delete(`http://localhost:3000/product/${id}`).then(() => {
        getData();
      });
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

  let array = data.map((v) => {
    let category = categorydata.find((k) => k.id === Number(v.category_id));
    return {
      ...v,
      category_name: category ? category.name : "Unknown",
    };
  });

  let filterdata = array.filter((product) =>
    product.name.toLowerCase().includes(searchvalue.toLowerCase())
  );

  return (
    <>
      <Navbar searchQuery={searchvalue} setSearchQuery={setsearchvalue} />

      <div className="min-h-screen w-full bg-slate-200 p-4 flex flex-wrap gap-4">
        <div className="fixed top-[10%] flex justify-center items-center">
          <form
            onSubmit={sub}
            className="bg-gradient-to-r from-slate-300 via-slate-300 to-slate-300 p-4 rounded-lg flex items-center gap-3 w-[95vw]"
          >
            <input
              className="bg-emerald-900 py-1 px-2 w-full text-white"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="bg-emerald-900 py-1 px-2 w-full text-white"
              type="text"
              placeholder="SKU"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
            />
            <input
              className="bg-emerald-900 py-1 px-2 w-full text-white"
              type="number"
              placeholder="Category ID"
              value={category_id}
              onChange={(e) => setCategoryId(e.target.value)}
            />
            <input
              className="bg-emerald-900 py-1 px-2 w-full text-white"
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <textarea
              className="bg-emerald-900 py-1 px-2 w-full text-white"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              type="submit"
              className="bg-yellow-600 rounded-lg px-6 py-1 text-white font-bold"
            >
              {updateActive ? "Update" : "Add"}
            </button>

            {updateActive && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-red-700 hover:bg-red-800 text-white w-full py-1 rounded"
              >
                Cancel
              </button>
            )}
          </form>
        </div>
        <div className="flex absolute top-[27%] flex-wrap gap-7 min-h-screen w-full bg-slate-200 p-4">
          {filterdata.map((v) => (
            <div
              key={v.id}
              className="w-[300px] h-[320px] flex flex-col font-serif bg-white text-black p-4 rounded-lg"
            >
              <p>ID: {v.id}</p>
              <p>Name: {v.name}</p>
              <p>SKU: {v.sku}</p>
              <p>Category Name: {v.category_name}</p>
              <p>Price: {v.price}</p>
              <p>Description: {v.description}</p>
              <p>
                Created At:
                <div className="flex justify-end text-black">
                  {moment(v.created_at).format("MMM Do YYYY, h:mm:ss a")}
                </div>
              </p>
              <p>
                Updated At:
                <div className="flex justify-end text-black">
                  {moment(v.updated_at).format("MMM Do YYYY, h:mm:ss a")}
                </div>
              </p>
              <div className="mt-2 flex justify-center gap-[60px]">
                <button
                  onClick={() => edit(v)}
                  className="bg-green-900 border text-white border-b-cyan-950 px-5 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => del(v.id)}
                  className="bg-yellow-600 border border-red text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Main;
