import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

let Navbar = ({ searchQuery, setSearchQuery }) => {
  return (
    <>
      <nav className="fixed top-0 z-50 h-[50px] flex items-center bg-white justify-between px-10 w-full shadow-md">
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

          <Link to="/category" className=" text-yellow-600 text-2xl font-extrabold hover:underline">
            Categories
          </Link>
        </div>
        <Link to="/variant">
          <div>
            Variant
          </div>
          </Link>
        <div className="flex gap-4 items-center">
          <button className="bg-blue-400 py-1 px-4 rounded text-white hover:bg-blue-500">
            Login
          </button>
          <button className="bg-blue-400 py-1 px-4 rounded text-white hover:bg-blue-500">

            Siginup
          </button>
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
