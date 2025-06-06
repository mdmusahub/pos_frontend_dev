import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './Navbar'

const ADDCART = () => {
  const [data, setData] = useState([])
  const [products, setProducts] = useState([])
  const [variants, setVariants] = useState([])
  const [quantities, setQuantities] = useState({})
  const [no, setNo] = useState('')
  const [status, setStatus] = useState('pending')
  const [dis, setDis] = useState('10%')
  const [tax, setTax] = useState('19%')
  const [totalAmount, setTotalAmount] = useState(0)
  const [payment, setPayment] = useState('cash_amount')
  const [cashAmount, setCashAmount] = useState('')
  const [onlineAmount, setOnlineAmount] = useState('')
  const [orderDate, setOrderDate] = useState('')
  const [update, setUpdate] = useState('')

  // Fetch order items and initialize quantities
  const get = () => {
    axios.get("http://localhost:3000/order_item").then((res) => {
      setData(res.data)

      // Initialize quantities for each item as 1 if not set
      const qty = {}
      res.data.forEach(item => {
        qty[item.id] = quantities[item.id] || 1
      })
      setQuantities(qty)
    })
  }

  useEffect(() => {
    get()
    axios.get('http://localhost:3000/product').then((res) => setProducts(res.data))
    axios.get('http://localhost:3000/product_variant').then((res) => setVariants(res.data))
  }, [])

  useEffect(() => {
    const sum = data.reduce((acc, item) => {
      const qty = quantities[item.id] || 1
      return acc + item.price * qty
    }, 0)

    let discountPercent = 0
    let taxPercent = 0

    if (dis.includes('%')) discountPercent = parseFloat(dis) / 100
    if (tax.includes('%')) taxPercent = parseFloat(tax) / 100

    let discounted = sum - sum * discountPercent
    let taxed = discounted + discounted * taxPercent

    setTotalAmount(taxed.toFixed(2))
  }, [data, quantities, dis, tax])

  const dlt = (id) => {
    axios.delete(`http://localhost:3000/order_item/${id}`).then(() => {
      get()
      setQuantities(prev => {
        const {[id]: _, ...rest} = prev
        return rest
      })
    })
  }

  const increase = (id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: (prev[id] || 1) + 1
    }))
  }

  const decrease = (id) => {
    setQuantities(prev => {
      const currentQty = prev[id] || 1
      if (currentQty > 1) {
        return { ...prev, [id]: currentQty - 1 }
      } else {
        dlt(id)
        const { [id]: _, ...rest } = prev
        return rest
      }
    })
  }

  const cartItems = data.map((item) => {
    const product = products.find(p => p.id === item.product_id)
    const variant = variants.find(v => v.variant_id === item.variant_id)
        //  console.log();
         
    return {
      id: item.id,
      name: item.name,
      product_id: product?.id || 'N/A',
      productname: product?.name || 'N/A',
      variant_id: variant?.id || 'N/A',
      variant_name: variant?.variant_name || 'N/A',
      variant_value: variant?.variant_value || 'N/A',
      price: item.price
    }
  })

  const rel = (e) => {
    e.preventDefault()
    let obj = {
      user_phone_no: no,
      status: status,
      discount: dis,
      tax: tax,
      total_amount: totalAmount,
      payment_mode: payment,
      cash_amount: cashAmount,
      online_amount: onlineAmount,
      order_date: orderDate,
      updated_at: update,
      items: cartItems.map(item => ({
        product_id: item.product_id,
        variant_id: item.variant_id,
        quantity: quantities[item.id] || 1,
        price: item.price
      }))
    }
    axios.post("http://localhost:3000/order", obj).then(() => {
      // Reset form after successful order
      setNo('')
      setStatus('pending')
      setDis('10%')
      setTax('19%')
      setTotalAmount(0)
      setPayment('cash_amount')
      setCashAmount('')
      setOnlineAmount('')
      setOrderDate('')
      setUpdate('')
      setData([])
      setQuantities({})
    })
  }

  return (
    <>
    <Navbar/>
      <div className='min-h-screen w-full bg-slate-200'>
        <div className="absolute top-16">
          {cartItems.map((item) => (
            <div key={item.id} className='flex flex-col p-4 bg-white w-[500px]  shadow-md mb-4 rounded-md'>
              <div className='flex justify-between items-center gap-2 mb-2'>
                <span className="font-semibold">CartItem: {item.id}</span>
                <button
                  onClick={() => dlt(item.id)}
                  className='bg-red-700 p-1 h-6 w-6 flex items-center justify-center text-white rounded-full hover:bg-red-800 transition'
                  aria-label="Delete"
                >
                  &times;
                </button>
              </div>

              <span><strong>Product ID:</strong> {item.product_id}</span>
              <span><strong>Product name:</strong> {item.productname}</span>
              <span><strong>Variant ID:</strong> {item.variant_id}</span>
              <span><strong>Variant name:</strong> {item.variant_name}</span>
              <span><strong>Variant value:</strong> {item.variant_value}</span>
              <div className='flex gap-2 my-3 justify-between items-center'>
                <div className='flex items-center gap-2 bg-green-600 rounded px-2 py-1 text-white select-none'>
                  <button
                    onClick={() => decrease(item.id)}
                    className='hover:bg-green-400 rounded px-2 py-1 transition'
                  >
                    -
                  </button>
                  <span className='font-semibold'>{quantities[item.id] || 1}</span>
                  <button
                    onClick={() => increase(item.id)}
                    className='hover:bg-green-400 rounded px-2 py-1 transition'
                  >
                    +
                  </button>
                </div>
                <span className="ml-auto font-semibold">
                  ₹{((item.price) * (quantities[item.id] || 1)).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className='flex justify-end '>
          <form onSubmit={rel} className='bg-white rounded-xl w-80 justify-center flex flex-col fixed top-16 gap-4 p-6 shadow-lg border border-gray-300'>
            <input
              value={no}
              onChange={(e) => setNo(e.target.value)}
              className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500'
              type="number"
              placeholder='Phone no.'
              required
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500'
              required
            >
              <option value="cancelled">Cancelled</option>
              <option value="pending">Pending</option>
              <option value="complete">Complete</option>
            </select>

            <input
              value={dis}
              onChange={(e) => setDis(e.target.value)}
              className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500'
              type="text"
              placeholder='Discount (e.g. 10%)'
            />

            <input
              value={tax}
              onChange={(e) => setTax(e.target.value)}
              className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500'
              type="text"
              placeholder='Tax (e.g. 19%)'
            />

            <input
              value={totalAmount}
              readOnly
              className='border border-gray-300 rounded-md p-2 bg-gray-100 cursor-not-allowed'
              type="text"
              placeholder='Total amount'
            />

            <select
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500'
              required
            >
              <option value="both">Both</option>
              <option value="online_upi">Online UPI</option>
              <option value="cash_amount">Cash amount</option>
            </select>

            {payment === 'both' && (
              <>
                <input
                  type="number"
                  placeholder="Cash amount"
                  value={cashAmount}
                  onChange={(e) => setCashAmount(e.target.value)}
                  className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 mt-2'
                  required
                />
                <input
                  type="number"
                  placeholder="Online amount"
                  value={onlineAmount}
                  onChange={(e) => setOnlineAmount(e.target.value)}
                  className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 mt-2'
                  required
                />
              </>
            )}

            {payment === 'cash_amount' && (
              <input
                type="number"
                placeholder="Cash amount"
                value={cashAmount}
                onChange={(e) => setCashAmount(e.target.value)}
                className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 mt-2'
                required
              />
            )}

            {payment === 'online_upi' && (
              <input
                type="number"
                placeholder="Online amount"
                value={onlineAmount}
                onChange={(e) => setOnlineAmount(e.target.value)}
                className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 mt-2'
                required
              />
            )}

            <input
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
              className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500'
              type="date"
              required
            />

            <input
              value={update}
              onChange={(e) => setUpdate(e.target.value)}
              className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-yellow-500'
              type="date"
            />

            <button
              type="submit"
              className='bg-green-600 hover:bg-green-800 text-white font-semibold py-2 rounded-md shadow-md transition duration-300'
            >
              Buy
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ADDCART
