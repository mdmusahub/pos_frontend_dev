import React from 'react'
import Navbar from './Navbar'


const Login = () => {
  return (
    <>
    <Navbar/>
     <div>
     <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm p-6 rounded-2xl shadow-md border">
        {/* Logo / App Name */}
        <h1 className="text-3xl font-bold text-center text-yellow-400 mb-8">blink<span className='text-green-500'>it</span></h1>

        {/* Phone Input */}
        <label className="block mb-2 text-sm font-medium text-gray-700">Enter your phone number</label>
        <div className="flex items-center border rounded-lg overflow-hidden mb-4">
          <span className="px-3 bg-gray-100 text-gray-600">+91</span>
          <input
            type="tel"
            placeholder="Phone number"
            className="flex-1 p-3 outline-none text-sm"
          />
        </div>

        {/* Continue Button */}
        <button
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Continue
        </button>

    
      </div>
    </div>
        </div> 
    </>
  )
}

export default Login
