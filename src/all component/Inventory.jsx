import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import Navbar from "./Navbar";

let Inventory = () => {
  let [inventory, setInventory] = useState([]);
  let [variant, setVariant] = useState([]);
  let [variantId, setVariantId] = useState("");
  let [searchQuantity, setSearchQuantity] = useState("");
  let [isEditing, setIsEditing] = useState("");

  let [form, setForm] = useState({
    inventoryId: null,
    quantity: "",
    location: "",
    lastUpdate: "",
  });


  useEffect(() => {
    getInventoryData();
    getVariantData();
  }, []);

  const getInventoryData = () => {
    axios.get("https://9341-2405-201-3037-e814-34ec-3713-6be8-8c8a.ngrok-free.app/ProductInventory/getAll", {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    }).then((res) => setInventory(res.data));
  };

  const getVariantData = () => {
    axios.get("https://9341-2405-201-3037-e814-34ec-3713-6be8-8c8a.ngrok-free.app/productVariant/getAll", {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    }).then((res) => setVariant(res.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form, variantId };

    if (isEditing) {
      axios.put(`https://9341-2405-201-3037-e814-34ec-3713-6be8-8c8a.ngrok-free.app/ProductInventory/update/${form.inventoryId}`, payload)
        .then(() => {
          getInventoryData();
          resetForm();
        });
    } else {
      axios.post("https://9341-2405-201-3037-e814-34ec-3713-6be8-8c8a.ngrok-free.app/ProductInventory/create", payload)
        .then(() => {
          getInventoryData();
          resetForm();
        });
    }
  };
  const [ismenu, setismenu] = useState(false);

  const handleEdit = (item) => {
    setForm({
      inventoryId: item.inventoryId,
      quantity: item.quantity,
      location: item.location,
      lastUpdate: item.lastUpdate
    });
    setVariantId(item.productVariant.productVariantId);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    axios.delete(`https://9341-2405-201-3037-e814-34ec-3713-6be8-8c8a.ngrok-free.app/ProductInventory/delete/${id}`)
      .then(() => getInventoryData());
  };

  const resetForm = () => {
    setForm({
      inventoryId: null,
      quantity: "",
      location: "",
      lastUpdate: "",
    });
    setVariantId("");
    setIsEditing(false);
  };

  const variantOptions = variant.map(v => ({
    value: v.productVariantId,
    label: `${v.variantName} ${v.variantValue}`
  }));

  const filteredInventory = searchQuantity
    ? inventory.filter((v) => String(v.quantity) === searchQuantity)
    : inventory;

  return (
      // <Navbar/>
      <>
              <Navbar ismenu={ismenu} setismenu={setismenu}  /> 

    <div onClick={()=>setismenu(false)}  className="min-h-screen w-full flex flex-wrap gap-6 p-6 absolute top-14  bg-gray-100">



      {/* Search input */}
      <div className="w-full flex gap-3 mb-4 items-center">
        <input
          type="number"
          placeholder="Search by Quantity"
          value={searchQuantity}
          onChange={(e) => setSearchQuantity(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={() => setSearchQuantity("")}
          className="bg-gray-500 hover:bg-gray-600 text-white rounded-lg px-4 py-2 text-sm"
        >
          Reset
        </button>
      </div>

      {/* Inventory cards */}
      {filteredInventory.map((v) => (
        <div  key={v.inventoryId}  className="bg-white h-[300px] w-64 border rounded-2xl shadow-lg p-4 flex flex-col justify-between hover:shadow-xl transition-shadow">
          <div className="space-y-1">
            {/* <h1 className="font-semibold">Product Variant ID: <span className="font-normal">{v.productVariant.productVariantId || "N/A"}</span></h1> */}
            <h1 className="font-semibold">Name: <span className="font-normal">{v.productVariant.variantName}</span></h1>
            <h1 className="font-semibold">Value: <span className="font-normal">{v.productVariant.variantValue}</span></h1>
            <h1 className="font-semibold">Quantity: <span className="font-normal">{v.quantity}</span></h1>
            <h1 className="font-semibold">Location: <span className="font-normal">{v.location}</span></h1>
            <h1 className="font-semibold">Last Update: <span className="font-normal text-sm">{v.lastUpdate}</span></h1>
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={() => handleEdit(v)} className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg p-1 text-sm">Edit</button>
            <button onClick={() => handleDelete(v.inventoryId)} className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-lg p-1 text-sm">Delete</button>
          </div>
        </div>
      ))}

      {/* Inventory form */}
      <form onSubmit={handleSubmit} className="bg-white flex flex-col gap-3 border p-4 rounded-2xl shadow-lg h-[400px] w-64 hover:shadow-xl transition-shadow">
        <h2 className="text-lg font-bold text-center">{isEditing ? "Edit Inventory" : "Add Inventory"}</h2>

        <Select
          options={variantOptions}
          value={variantOptions.find(opt => opt.value === variantId)}
          onChange={(selected) => setVariantId(selected.value)}
          placeholder="Select Variant"
          isSearchable
        />  

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
        <input
          type="text"
          name="lastUpdate"
          placeholder="Last Update"
          value={form.lastUpdate}
          onChange={(e) => setForm({ ...form, lastUpdate: e.target.value })}
          className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />

        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-2">
          {isEditing ? "Update Inventory" : "Add Inventory"}
        </button>
        {isEditing && (
          <button type="button" onClick={resetForm} className="bg-gray-400 hover:bg-gray-500 text-white rounded-lg p-2">
            Cancel Edit
          </button>
        )}
      </form>
    </div>
    </>
  );
};

export default Inventory;
