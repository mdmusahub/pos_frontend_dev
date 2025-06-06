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
      <nav className="fixed top-0 z-50 h-[50px]  flex items-center bg-white justify-between px-10 w-full shadow-md">
        <div className="flex items-center gap-10">
          <Link to="/" className="font-extrabold text-2xl flex items-center gap-1">
            <span className="text-green-800">Blinkit</span>
            <span className="text-yellow-600">Clone</span>
          </Link>

          <div className="relative w-[250px]">
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
        </div>
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
        <Link to="/addcart">
          <div>
            <button className="bg-cyan-700 py-1 px-4 rounded text-white hover:bg-cyan-950">

              add items</button></div>
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
