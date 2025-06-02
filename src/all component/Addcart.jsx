import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ADDCART = () => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [orderdata, setorderdata] = useState([]);
  const [orderid, setorderid] = useState("");
  const [user_phone, setuserphone] = useState("");
  const [status, setstatus] = useState("");
  const [discount, setdiscount] = useState("");
  const [tax, settax] = useState("");
  const [total_amount, settotal_amount] = useState("");
  const [payment_mode, setpayment_mode] = useState("");
  const [online_amount, setonline_amount] = useState("");
  const [cash_amount, setcashamount] = useState("");
  const [orderdate, setorderdate] = useState("");
  const [update_at, setUpdate_at] = useState("");

  const getData = () => {
    axios.get('http://localhost:3000/order_item').then((res) => {
      setData(res.data);
      const initialQuantities = {};
      res.data.forEach((item) => {
        initialQuantities[item.id] = item.quantity || 1;
      });
      setQuantities(initialQuantities);
    });
  };

  const getProducts = () => {
    axios.get('http://localhost:3000/product').then((res) => {
      setProducts(res.data);
    });
  };

  const getVariants = () => {
    axios.get('http://localhost:3000/product_variant').then((res) => {
      setVariants(res.data);
    });
  };

  const getorderdata = () => {
    axios.get("http://localhost:3000/order").then((res) => {
      setorderdata(res.data);
    });
  };

  const inc = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const dec = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  const dlt = (id) => {
    axios.delete(`http://localhost:3000/order_item/${id}`).then(() => getData());
  };

  function sub(e) {
    e.preventDefault();
    const obj = {
      id: orderid,
      user_phone: user_phone,
      status: status,
      discount: discount,
      tax: tax,
      total_amount: total_amount,
      payment_mode: payment_mode,
      online_amount: online_amount,
      cash_amount: cash_amount,
      order_date: orderdate,
      update_at: update_at
    };

    axios.post("http://localhost:3000/order", obj).then(() => {
      // Add order_items
      data.forEach(item => {
        const quantity = quantities[item.id] || 1;
        const orderItem = {
          order_id: obj.id,
          product_id: item.product_id,
          product_variant_id: item.variant_id,
          quantity: quantity,
          unit_price: item.price,
          total_price: item.price * quantity
        };
        axios.post("http://localhost:3000/order_item", orderItem);
      });

      // Clear cart
      Promise.all(data.map(item => axios.delete(`http://localhost:3000/order_item/${item.id}`))).then(() => {
        getData();
      });
    });
  }

  useEffect(() => {
    getData();
    getProducts();
    getVariants();
    getorderdata();
  }, []);  

  return (
    <div className='p-4 min-h-screen flex flex-wrap gap-4'>
      {data.map((cartItem, i) => {
        const product = products.find((p) => p.id === cartItem.product_id);
        const variant = variants.find((v) => v.variant_id === cartItem.variant_id);
        const quantity = quantities[cartItem.id] || 1;

        return (
          <div key={i} className='border p-4 bg-white h-80 w-80 flex flex-col justify-between'>
            <div>
              <button className='w-full text-end text-red-600 text-2xl font-extrabold' onClick={() => dlt(cartItem.id)}>X</button>
              <span><strong>Order ID:</strong> {cartItem.id}</span><br />
              <span><strong>Product:</strong> {product?.name || 'N/A'}</span><br />
              <span><strong>Variant:</strong> {variant?.name || 'N/A'}</span><br />
            </div>
            <div className='flex py-2 px-2 text-[20px] font-extrabold bg-yellow-400 text-black '>
              <p>Add items:</p>
              <button onClick={() => dec(cartItem.id)} className='px-2'>-</button>
              <span>{quantity}</span>
              <button onClick={() => inc(cartItem.id)} className='px-2'>+</button>
            </div>
            <div className='mt-2'>
              <span><strong>Price per unit:</strong> ₹{cartItem.price}</span><br />
              <span><strong>Total:</strong> ₹{cartItem.price * quantity}</span>
            </div>
          </div>
        );
      })}
 
      
      <form className='bg-white p-4 border rounded-md flex flex-col gap-2 w-full max-w-md'>
        <input type="text" value={orderid} onChange={(e) => setorderid(e.target.value)} placeholder='Order ID' />
        <input type="text" value={user_phone} onChange={(e) => setuserphone(e.target.value)} placeholder='Phone No.' />
        <select value={status} onChange={(e) => setstatus(e.target.value)}>
          <option value="">Select Status</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Pending">Pending</option>
          <option value="Complete">Complete</option>
        </select>
        <input type="text" value={discount} onChange={(e) => setdiscount(e.target.value)} placeholder='Discount' />
        <input type="text" value={tax} onChange={(e) => settax(e.target.value)} placeholder='Tax' />
        <input type="text" value={total_amount} onChange={(e) => settotal_amount(e.target.value)} placeholder='Total Amount' />
        <select value={payment_mode} onChange={(e) => setpayment_mode(e.target.value)}>
          <option value="">Select Payment</option>
          <option value="both">Both</option>
          <option value="Online_UPI">Online UPI</option>
          <option value="Cash">Cash</option>
        </select>
        {payment_mode==="both" && (
          <>
          <input type="number" value={online_amount} onChange={(e) => setonline_amount(e.target.value)} placeholder='Online Amount' />
        <input type="number" value={cash_amount} onChange={(e) => setcashamount(e.target.value)} placeholder='Cash Amount' />
          </>
        )}
        {payment_mode==="Cash" && (
        <input type="number" value={cash_amount} onChange={(e) => setcashamount(e.target.value)} placeholder='Cash Amount' />

        )}
        {payment_mode ==="Online_UPI" && (
          <input type="number" value={online_amount} onChange={(e) => setonline_amount(e.target.value)} placeholder='Online Amount' />

        )}
        
        <input type="date" value={orderdate} onChange={(e) => setorderdate(e.target.value)} />
        <input type="datetime-local" value={update_at} onChange={(e) => setUpdate_at(e.target.value)} />
        <button onClick={sub} className='bg-blue-600 text-white p-2 rounded'>Submit Order</button>
      </form>

  <div className='h-[600px] flex flex-col gap-5 w-[320px]'>
      {orderdata.map((v)=>(
          <div className='h-[400px] border-2 border-black pl-3 flex flex-col w-[300px] '>
           
            <span>id:{v.id}</span>
            <span>user_phone:{v.user_phone}</span>
            <span>status:{v.status}</span>
            <span>discount:{v.discount}</span>
            <span>tax:{v.tax}</span>
            <span>total_amount:{v.total_amount}</span>
            <span>payment_mode:{v.payment_mode}</span>
            <span>online_amount:{v.online_amount}</span>
             <span>cash_amount:{v.cash_amount}</span>
            <span>order_date:{v.order_date}</span> 
            <span>update_at:{v.update_at}</span>
      
        </div>
      ))}
      </div>
    </div>
  );
};

export default ADDCART;
