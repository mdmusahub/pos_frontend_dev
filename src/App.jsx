import Product from "./all component/Product"
import Category from "./all component/Category"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {

  return (
    <>
           
           <BrowserRouter>
           <Routes>
            <Route  path="/" element={<Product/>}/>
            <Route  path="/category/" element={<Category/>}/>

           </Routes>
           </BrowserRouter>
    </>
  )
}

export default App


