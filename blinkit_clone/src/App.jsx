// import './App.css'
import "./index.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Productvar from './components.js/Productvar'
import Inventory from "./components.js/Inventory"
import Login from "./components.js/Login"
import Categories from './components.js/Categories' 
import Carousel from "./components.js/Carousel"



function App() {

  return (
    <>
    <div>

      {/* <Carousel/> */}
      {/* <Productvar/> */}
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inventory />} />
          <Route path="/log" element={<Login />} />
          <Route path="/category" element={<Categories />} />


        </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App
