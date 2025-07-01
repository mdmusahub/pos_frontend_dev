import Product from "./all component/Product"
import Category from "./all component/Category"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Addcart from "./all component/Addcart"
import Variant from "./all component/Variant"
import Signup from "./all component/Signup"
import Login from "./all component/Login"
import Protected from "./all component/Protected"
import Order from "./all component/Orders"
import Singleproduct from "./all component/Singleproduct"
import Discount from "./all component/Discount"
function App() {

  return (
    <>
           
           <BrowserRouter>
           <Routes>
            {/* <Route element={<Protected/>}> */}
            <Route  path="/" element={<Product/>}/>
            <Route  path="/category/" element={<Category/>}/>
            <Route  path="/addcart/" element={<Addcart/>}/>
            <Route  path="/variant/" element={<Variant/>}/>
            {/* </Route> */}
            <Route  path="/signup/" element={<Signup/>}/>
            <Route  path="/login/" element={<Login/>}/>
            <Route path="/order" element={<Order/>}/>
            <Route path="pr/:id" element={<Singleproduct/>}/>
            <Route path="/discount/" element={<Discount/>}/>
            

           </Routes>
           </BrowserRouter>
    </>
  )
}

export default App


