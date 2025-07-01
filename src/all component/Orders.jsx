import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import DatePicker from 'react-datepicker';
import { AppContext } from './Contextapi'
import { useContext } from 'react'
import 'react-datepicker/dist/react-datepicker.css';

const Order = () => {
  const [orders, setOrder] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const change = (v, i) => {
    v.status = v.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
    orders.splice(i, 1, v);
    setOrder([...orders]);
  };
 let data1 = useContext(AppContext)
const [token,settoken,count,setcount,user,setuser,Base_url_]=data1
  const getdata = () => {
    axios.get(`${Base_url_}/order/getAll`, {
      headers: { 'ngrok-skip-browser-warning': 'true' },
    }).then((res) => setOrder(res.data));
  };

  useEffect(() => {
    getdata();
  }, []);

  const data = orders.filter((v) => {
    const matchStatus = filteredStatus ? v.status === filteredStatus : true;

    const matchDate = selectedDate
      ? new Date(v.orderDate).toDateString() === selectedDate.toDateString()
      : true;

    return matchStatus && matchDate;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Navbar />
      <Link to="/">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">🧾 Order Summary</h1>
      </Link>

      <div className="flex justify-end gap-4 mb-6">
        <select
          onChange={(e) => setFilteredStatus(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="COMPLETED">Completed</option>
        </select>

        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          placeholderText="Filter by Date"
          className="border px-4 py-2 rounded"
          dateFormat="yyyy-MM-dd"
          isClearable
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((order, i) => (
          <div
            key={order.id}
            className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition duration-300 p-6"
          >
            <h2 className="text-xl font-semibold text-indigo-700 mb-2">
              Order #{order.orderID}
            </h2>

            <div className="text-sm text-gray-700 space-y-1">
              <p><span className="font-medium">📞 User:</span>{order.userPhoneNumber || 'N/A'}</p>
              <p>
                <span className="font-medium">📦 Status:</span>{' '}
                <input
                  type="checkbox"
                  checked={order.status === 'COMPLETED'}
                  onChange={() => change(order, i)}
                  className="mx-1"
                />
                {order.status}
              </p>
              <p><span className="font-medium">💵 Total Amount:</span> ₹{order.totalAmount}</p>
              <p><span className="font-medium">💳 Payment Mode:</span> {order.paymentMode}</p>
            </div>

            <div className="mt-4 text-sm space-y-1 text-gray-600 bg-gray-100 p-3 rounded-md">
              <p><strong>Cash Paid:</strong> ₹{order.cashAmount}</p>
              <p><strong>UPI Paid:</strong> ₹{order.onlineAmount}</p>
            </div>

            <div className="mt-4 text-xs text-gray-500 border-t pt-2">
              <p><strong>📅 Ordered:</strong> {order.orderDate}</p>
              <p><strong>🕒 Updated:</strong> {order.updatedAt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
