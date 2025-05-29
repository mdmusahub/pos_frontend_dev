import React from 'react'
import { Link } from 'react-router-dom'
import { Search } from "lucide-react";
import { ShoppingCart } from 'lucide-react';


const Navbar = () => {
  return (
    <>
      <div>
        <div className='bg-white p-5 block'><ul className='flex justify-between w-full'>
          <li className='font-extrabold text-yellow-400 text-4xl px-4'>blink<span className='font-bold text-green-600'>it</span></li>
          <li className='font-bold text-lg text-black'>Delivery in 20 minutes</li>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Search for products" className="pl-25 py-2 rounded border w-full" />
          </div>
          <Link to='/category'>
            <li className='font-sans text-xl'>Categories</li>
          </Link>

          <Link to='/log'>
            <li className='font-sans text-xl'>Login</li>
          </Link>

          
          <li>
            <button className='bg-green-600 text-white rounded-2xl px-5 py-2 flex hover:bg-green-700 items-center'>
              <ShoppingCart className="mr-2" size={20} />
              Cart
            </button>
          </li>
        </ul>
        </div>
        <div className=' rounded-3xl text-white mx-30 my-3 w-[1200px] h-[200px]  '>
          <img src='https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=2700/layout-engine/2022-05/Group-33704.jpg'></img>

      

        </div>
        <div className=' rounded-3xl text-white w-[350px] h-[270px] flex gap-5 mx-35 my-2 py-8'>
          <img src='https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-07/pharmacy-WEB.jpg'></img>
          <img src='https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-07/Pet-Care_WEB.jpg'></img>
          <img src='https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-03/babycare-WEB.jpg'></img>
        </div>
      </div>
    </>
  )
}

export default Navbar
