// Filename: ADDCART.jsx
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from './Contextapi';

const ADDCART = () => {
  const [products, setProducts] = useState([]);
  const [variants, setVariants] = useState([]);
  const [filteredVariants, setFilteredVariants] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [currentQuantity, setCurrentQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [no, setNo] = useState('');
  const [payment, setPayment] = useState('CASH');
  const [cashAmount, setCashAmount] = useState('');
  const [onlineAmount, setOnlineAmount] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [dis, setDis] = useState('');
  const [tax, setTax] = useState('19%');
  const [status, setStatus] = useState('PENDING');
  const [update, setUpdate] = useState('');
  const [inventory, setInventory] = useState([]);
  const [discountData, setDiscountData] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);

  const headers = { 'ngrok-skip-browser-warning': 'true' };

 const dataa=useContext(AppContext) 
 
 const [token,settoken,count,setcount,user,setuser,categorydata,setcategorydata,productName,setName,sku,setSku,categoryId,setCategoryId,description,setDescription,updateActive,setUpdateActive,variantName,setvariantName,variantValue,setvariantValue,variantprice,setvariantprice,inventoryquantity,setinventoryquantity,inventorylocation,setinventorylocation,variantsarray,setvariantsarray,productvariants,setproductvariants,productId,setproductId,BaseUrl]=dataa
 
  useEffect(() => {
    axios.get(`${BaseUrl}/product/getAll`, { headers }).then(r => setProducts(r.data));
    axios.get(`${BaseUrl}/productVariant/getAll`, { headers }).then(r => setVariants(r.data));
    axios.get(`${BaseUrl}/ProductInventory/getAll`, { headers }).then(r => setInventory(r.data));
    axios.get(`${BaseUrl}/discount/getAll`, { headers }).then(r => setDiscountData(r.data));
  }, []);

  useEffect(() => {
    if (selectedProduct && variants.length) {
      const filtered = variants.filter(v => v.product.productId === selectedProduct.value);
      setFilteredVariants(filtered);
    } else {
      setFilteredVariants([]);
    }
    setSelectedVariant(null);
  }, [selectedProduct, variants]);

  useEffect(() => {
    if (selectedVariant) {
      const now = new Date();

      const activeDiscount = discountData.find(d =>
        d.variant?.productVariantId === selectedVariant.value &&
        d.isActive &&
        new Date(d.startDateTime) <= now &&
        new Date(d.endDateTime) >= now
      );

      if (activeDiscount) {
        setDis(activeDiscount.waiverMode === 'PERCENT'
      
          ?` ${activeDiscount.discountValue}%`
          : `${activeDiscount.discountValue}`);
      } else {
        setDis('');
      }
    }
  }, [selectedVariant, discountData]);

  const productOptions = products.map(p => ({
    value: p.productId,
    label: p.productName,
  }));

  const variantOptions = filteredVariants.map(v => ({
    value: v.productVariantId,
    label: `${v.variantName} ${v.variantValue}`,
    variant: v,
  }));

  const handleAddToCart = () => {
    if (!selectedProduct || !selectedVariant || currentQuantity < 1) {
      toast.error('Select product, variant and quantity');
      return;
    }

    const inv = inventory.find(i => i.productVariant.productVariantId === selectedVariant.value);
    if (!inv || inv.quantity < currentQuantity) {
      toast.error('Stock not available');
      return;
    }

    setCartItems(prev => [...prev, {
      productVariantId: selectedVariant.value,
      productName: selectedProduct.label,
      variantName: selectedVariant.variant.variantName,
      variantValue: selectedVariant.variant.variantValue,
      unitPrice: selectedVariant.variant.price,
      quantity: currentQuantity,
    }]);

    setSelectedProduct(null);
    setSelectedVariant(null);
    setCurrentQuantity(1);
    toast.success('Item added');
  };

  const increase = idx => {
    setCartItems(items => {
      const arr = [...items];
      arr[idx].quantity++;
      return arr;
    });
  };

  const decrease = idx => {
    setCartItems(items => {
      const arr = [...items];
      if (arr[idx].quantity > 1) arr[idx].quantity--;
      return arr;
    });
  };

  const dlt = i => {
    setCartItems(prev => prev.filter((_, index) => index !== i));
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((sum, it) => sum + it.unitPrice * it.quantity, 0);
    const discount = dis.includes('%') ? (parseFloat(dis) / 100) * subtotal : parseFloat(dis) || 0;
    const taxVal = tax.includes('%') ? (parseFloat(tax) / 100) * (subtotal - discount) : parseFloat(tax) || 0;
    return (subtotal - discount + taxVal).toFixed(2);
  };

  useEffect(() => {
    setTotalAmount(calculateTotal());
  }, [cartItems, dis, tax]);

  const handleSubmit = e => {
    e.preventDefault();
    if (no.length < 10) return toast.error('Invalid phone number');
    if (cartItems.length === 0) return toast.error('Cart is empty');
    const paid = parseFloat(cashAmount || 0) + parseFloat(onlineAmount || 0);
    if (paid < parseFloat(totalAmount)) return toast.error('Paid amount is less than total');

    const payload = {
      userPhoneNumber: no,
      status: status.toUpperCase(),
      paymentMode: payment,
      cashAmount,
      onlineAmount,
      orderDate: orderDate || new Date().toISOString(),
      updatedAt: update || new Date().toISOString(),
      orderItemRequests: cartItems.map(it => ({
        variantId: it.productVariantId,
        quantity: it.quantity,
        unitPrice: it.unitPrice,
      })),
    };

    axios.post(`${BaseUrl}/order/create`, payload)
      .then(() => {
        toast.success('Order placed!');
        setNo('');
        setStatus('PENDING');
        setDis('');
        setTax('19%');
        setTotalAmount(0);
        setPayment('CASH');
        setCashAmount('');
        setOnlineAmount('');
        setOrderDate('');
        setUpdate('');
        setCartItems([]);
        setShowSidebar(false);
      })
      .catch(() => toast.error('Order failed!'));
  };

  return (
  
    <>
      <div className="min-h-screen bg-slate-100 p-6 pr-[420px]">
        <div className="bg-white p-4 rounded shadow mb-4">
          <Select
            options={productOptions}
            value={selectedProduct}
            onChange={setSelectedProduct}
            placeholder="Select Product"
          />
          <Select
            options={variantOptions}
            value={selectedVariant}
            onChange={option => setSelectedVariant(option)}
            placeholder="Select Variant"
            isDisabled={!selectedProduct}
          />
          <input
            type="number"
            value={currentQuantity}
            min={1}
            onChange={e => setCurrentQuantity(+e.target.value)}
            className="border p-2 rounded w-full mb-2"
            placeholder="Quantity"
          />
          <button onClick={handleAddToCart} className="bg-green-600 text-white p-2 rounded w-full">
            Add to Cart
          </button>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-bold">Cart</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Cart is empty</p>
          ) : (
            cartItems.map((item, i) => (
              <div key={i} className="bg-white p-3 rounded mb-2 shadow flex justify-between items-center">
                <div>
                  <p><strong>{item.productName}</strong> - {item.variantName} ({item.variantValue})</p>
                  <p>₹{item.unitPrice} x {item.quantity} = ₹{(item.unitPrice * item.quantity).toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => decrease(i)} className="bg-green-600 rounded px-2 py-1 text-white">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increase(i)} className="bg-green-600 rounded px-2 py-1 text-white">+</button>
                  </div>
                </div>
                <button onClick={() => dlt(i)} className="text-gray-400" title="Delete item">🗑</button>
              </div>
            ))
          )}
          <div className="flex justify-between mt-2">
            <p className="font-bold">Total: ₹{totalAmount}</p>
            <button onClick={() => setShowSidebar(true)} className="bg-purple-600 text-white p-2 rounded">
              Place to Order
            </button>
          </div>
        </div>
      </div>

      {showSidebar && (
        <div className="fixed top-0 right-0 w-96 h-screen overflow-y-auto bg-white shadow-xl border-l p-6 z-50">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input value={no} onChange={e => setNo(e.target.value)} placeholder="Phone no." className="border p-2 rounded" required />
            <select value={status} onChange={e => setStatus(e.target.value)} className="border p-2 rounded" required>
              <option value="PENDING">Pending</option>
              <option value="COMPLETED">Completed</option>
            </select>
            <input value={dis} onChange={e => setDis(e.target.value)} placeholder="Discount" className="border p-2 rounded" />
            <input value={tax} onChange={e => setTax(e.target.value)} placeholder="Tax" className="border p-2 rounded" />
            <input value={totalAmount} readOnly className="border p-2 rounded bg-gray-100" placeholder="Total Amount" />
            <select value={payment} onChange={e => setPayment(e.target.value)} className="border p-2 rounded" required>
              <option value="both">Both</option>
              <option value="online_upi">Online UPI</option>
              <option value="CASH">Cash</option>
            </select>
            {payment === 'both' && (
              <>
                <input type="number" value={cashAmount} onChange={e => setCashAmount(e.target.value)} placeholder="Cash amount" className="border p-2 rounded" required />
                <input type="number" value={onlineAmount} onChange={e => setOnlineAmount(e.target.value)} placeholder="Online amount" className="border p-2 rounded" required />
              </>
            )}
            {payment === 'CASH' && (
              <input type="number" value={cashAmount} onChange={e => setCashAmount(e.target.value)} placeholder="Cash amount" className="border p-2 rounded" required />
            )}
            {payment === 'online_upi' && (
              <input type="number" value={onlineAmount} onChange={e => setOnlineAmount(e.target.value)} placeholder="Online amount" className="border p-2 rounded" required />
            )}
            {/* <input type="date" value={orderDate} onChange={e => setOrderDate(e.target.value)} className="border p-2 rounded" required />
            <input type="date" value={update} onChange={e => setUpdate(e.target.value)} className="border p-2 rounded" /> */}
            <button type="submit" className="bg-green-600 text-white py-2 rounded">Buy</button>
          </form>
        </div>
      )}

      <ToastContainer position="top-center" autoClose={1500} />
    </>
  );
};

export default ADDCART;
