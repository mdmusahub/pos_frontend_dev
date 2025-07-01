import { Link,NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { AppContext } from "./Contextapi";
import { TiShoppingCart } from "react-icons/ti";
import { TfiMenuAlt } from "react-icons/tfi";
import { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";

let Navbar = ({ searchQuery, setSearchQuery, sortdata ,setismenu, ismenu}) => {
  const contextdata = useContext(AppContext)
    
const[token,settoken,count,setcount,user,setuser]=contextdata

  function logout(){
localStorage.removeItem("token")
localStorage.setItem("user",JSON.stringify("undefined"))
setcount(count+1)
}

let menu =()=>{
  setismenu(true)
  console.log("GHji");
  
}
// setismenu(false)
  return (
    <>
      <nav className="fixed top-0 z-50 h-[60px]  flex items-center bg-white justify-between px-10 w-full shadow-md">
        <div className="flex items-center gap-10">
          <Link to="/" className="font-extrabold text-3xl flex items-center gap-1">
            <span className="text-green-800">Blinkit</span>
            <span className="text-yellow-600">Clone</span>
          </Link>

          <div className="relative ,absolute left-[100px] w-[500px]">
            <FaSearch className="absolute top-[10px] text-2xl left-2 text-gray-500" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="bg-slate-200 rounded pl-9 pr-4 py-1 w-full h-[40px] outline-none font-bold"
            />
          </div>
          <div className="mt-4 md:mt-0 absolute left-[1000px]">
            <select
              onChange={(e) => sortdata(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 font-extrabold"
            >
              <option value="" className="text-center font-extrabold">---sort by---</option>
              <option value="min-max">Price: Low to High</option>
              <option value="max-min">Price: High to Low</option>
              <option value="between 1000-10000">Price: 1000 to 10000</option>
            </select>
          </div>

        
        </div>
      <Link className="h-[100%]" to={'/login'}>
  <div className=' h-[100%] absolute left-[1250px] flex items-center text-2xl px-3'>
    {user!==`"undefined"` && user!==null ?
    <h6 className="w-[30px] h-[30px] border-2 rounded-[100%] text-center text-lg bg-yellow-400 text-white">{user[1].toUpperCase()}</h6> :
    <FaRegUser />}
  </div>
  </Link>
      {/* <Link className="h-[]" to={'signup'}>
    <div className='bg-blue-500 py-1 text-center flex  items-center rounded text-white text-xl px-3'>
    <h3>SignUp</h3>
  </div> 
     {/* </Link>
  <div className='bg-blue-500  text-center flex py-1 rounded items-center text-white text-xl px-3'>
    <h3 onClick={()=>{logout()}}>Logout</h3>
</div> */}

        <Link to="/addcart">
          <div className="absolute left-[1350px] top-1">
            <button className="bg-gray-400 px-7 py-2 rounded  text-white hover:bg-gray-600">
       <TiShoppingCart className="text-4xl  " />
        
        </button>
              </div>
        </Link>
      <div></div>
        <div className=" absolute left-[1470px] ">
          <div >
            <TfiMenuAlt className="font-bold text-2xl" onMouseEnter={()=>menu()} />
   {ismenu==true ?
   <div className="absolute top-2.5 w-34 font-bold right-1" onMouseLeave={()=>{setismenu(false)}}> 
    <Link to={"/inventory"}>
<div className="bg-neutral-600  hover:bg-red-600 border-y border-b-black text-white py-2 px-2">
  Inventory
</div>
</Link>

<Link to={'/variant'}>
<div className="bg-neutral-600 py-2 px-2 text-white  hover:bg-red-600 border-y border-b-black">
  <button>Variant</button>
</div>
</Link>

<Link to={'/customer'}>
<div className="bg-neutral-600 py-2 px-2  hover:bg-red-600 border-y border-b-black text-white">
  <button>customer</button>
</div>
</Link>

<Link to={'/discount'}>
<div className="bg-neutral-600 py-2 px-2  hover:bg-red-600 border-y border-b-black text-white">
  <button>discount</button>
</div>
</Link>

<Link to={'/category'}>
<div className="bg-neutral-600 py-2 px-2  hover:bg-red-600 border-y border-b-black text-white">
  <button>Category</button>
</div>
</Link>
<Link to={`/order/`}>
<div className="bg-neutral-600 py-2 px-2  hover:bg-red-600 border-y border-b-black text-white">
  <button>Order</button>
</div>
</Link>


</div>


            :""}        
        </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
