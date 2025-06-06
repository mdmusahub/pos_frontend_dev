import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Variant = () => {
  const [variants, setVariants] = useState([]);
  const [products, setProducts] = useState([]);
  const [variantName, setVariantName] = useState('');
  const [variantValue, setVariantValue] = useState('');
  const [price, setPrice] = useState('');
  const [productId, setProductId] = useState('');
  const [editId, setEditId] = useState(null); // For editing

  useEffect(() => {
    fetchVariants();
    fetchProducts();
  }, []);

  const fetchVariants = () => {
    axios.get('http://localhost:3000/product_variant').then((res) => {
      setVariants(res.data);
    });
  };

  const fetchProducts = () => {
    axios.get('http://localhost:3000/product').then((res) => {
      setProducts(res.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const variantData = {
      variant_name: variantName,
      variant_value: variantValue,
      price: price,
      product_id: productId,
    };

    if (editId) {
      // Update existing variant
      axios
        .put(`http://localhost:3000/product_variant/${editId}`, variantData)
        .then(() => {
          fetchVariants();
          resetForm();
        });
    } else {
      // Create new variant
      axios.post('http://localhost:3000/product_variant', variantData).then(() => {
        fetchVariants();
        resetForm();
      });
    }
  };

  const resetForm = () => {
    setVariantName('');
    setVariantValue('');
    setPrice('');
    setProductId('');
    setEditId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this variant?')) {
      axios.delete(`http://localhost:3000/product_variant/${id}`).then(() => {
        fetchVariants();
      });
    }
  };

  const handleEdit = (variant) => {
    setVariantName(variant.variant_name);
    setVariantValue(variant.variant_value);
    setPrice(variant.price);
    setProductId(variant.product_id);
    setEditId(variant.id);
  };

  return (
    <div className="p-4">
    <Navbar/>

      <h2 className="text-xl font-bold mb-4">{editId ? 'Edit Variant' : 'Add Variant'}</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded-lg flex flex-col gap-3 max-w-md">
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Variant Name (e.g. Size, Color)"
          value={variantName}
          onChange={(e) => setVariantName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Variant Value (e.g. M, Red)"
          value={variantValue}
          onChange={(e) => setVariantValue(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <div className="flex gap-2">
          <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">
            {editId ? 'Update' : 'Add'} Variant
          </button>
          {editId && (
            <button type="button" onClick={resetForm} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-bold mb-2">All Variants</h3>
        <div className="grid gap-4">
          {variants.map((v) => {
            const product = products.find((p) => String(p.id) === String(v.product_id));
            return (
              <div key={v.id} className="bg-gray-100 p-3 rounded border">
                <p><strong>Product:</strong> {product ? product.name : 'Unknown Product'}</p>
                <p><strong>{v.variant_name}:</strong> {v.variant_value}</p>
                <p><strong>Price:</strong> ₹{v.price}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(v)}
                    className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(v.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Variant;
