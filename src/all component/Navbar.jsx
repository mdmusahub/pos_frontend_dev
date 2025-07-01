import { Link,NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { AppContext } from "./Contextapi";

import { useContext } from "react";
import { FaRegUser } from "react-icons/fa";
let Navbar = ({ searchQuery, setSearchQuery, sortdata }) => {
  const contextdata = useContext(AppContext)

const[token,settoken,count,setcount,user,setuser]=contextdata

  function logout(){
localStorage.removeItem("token")
localStorage.setItem("user",JSON.stringify("undefined"))
setcount(count+1)
}
  return (
    <>
      <nav className="fixed top-0 z-50 h-[70px]  flex items-center bg-white justify-between px-10 w-full shadow-md">
        <div className="flex items-center gap-10">
          <Link to="/" className="font-extrabold text-2xl flex items-center m-0 ">
            <span className="text-green-800 ">Blinkit</span>
            <span className="text-yellow-600 d">Clone</span>
          </Link>

          <div className="relative w-[500px]">
            <FaSearch className="absolute top-[10px] left-2 text-gray-500" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="bg-slate-200 rounded pl-9 pr-4 py-1 w-full outline-none"
            />
          </div>
          <div className="mt-4 md:mt-0">
            <label className="text-gray-700 font-semibold mr-2">Sort:</label>
            <select
              onChange={(e) => sortdata(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">-- Select --</option>
              <option value="min-max">Price: Low to High</option>
              <option value="max-min">Price: High to Low</option>
            </select>
          </div>

          <Link to="/category" className=" text-yellow-600 text-2xl font-extrabold hover:underline">
            Categories
          </Link>
           <Link
            to='/order'
             className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold transition transform hover:scale-105"
            >order</Link>
        </div>
     
  <div className="flex justify-center items-center gap-2">
     <Link className="h-[100%]" to={'/login'}>
  <div className=' h-[100%] flex items-center text-2xl px-3'>
    {user!==`"undefined"` && user!==null ?
    <h6 className="w-[30px] h-[30px] border-2 rounded-[100%] text-center text-lg bg-yellow-400 text-white">{user[1].toUpperCase()}</h6> :
    <FaRegUser />}
  </div>
  </Link>
      <Link className="h-[]" to={'signup'}>
    <div className='bg-blue-500 py-1 text-center flex  items-center rounded text-white text-xl px-3'>
    <h3>SignUp</h3>
  </div>
     </Link>
  <div className='bg-blue-500  text-center flex py-1 rounded items-center text-white text-xl px-3'>
    <h3 onClick={()=>{logout()}}>Logout</h3>
</div>
        <Link to={"/variant"}>
        <div className='bg-blue-500  text-center flex py-1 rounded items-center text-white text-xl px-3'>
          <button>
            variant
          </button>
        </div>
        </Link>   
        <Link to="/addcart">
          <div>
            <button className="bg-white  py-1 px-4 rounded text-white hover:bg-amber-100">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="rgba(209,123,0,1)"><path d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z"></path></svg>  
             </button></div>
        </Link>
        <Link to={"/discount/"}>
        <div className='bg-blue-500  text-center flex py-1 rounded items-center text-white text-xl px-3'>
          <button>
            discount
          </button>
        </div>
        </Link> 
        </div>
      </nav>
    </>
  );
};

export default Navbar;
