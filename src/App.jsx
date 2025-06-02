import Product from "./all component/Product"
import Category from "./all component/Category"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Addcart from "./all component/Addcart"
import Variant from "./all component/Variant"
function App() {

  return (
    <>
           
           <BrowserRouter>
           <Routes>
            <Route  path="/" element={<Product/>}/>
            <Route  path="/category/" element={<Category/>}/>
            <Route  path="/addcart/" element={<Addcart/>}/>
            <Route  path="/variant/" element={<Variant/>}/>

            

           </Routes>
           </BrowserRouter>
    </>
  )
}

export default App


