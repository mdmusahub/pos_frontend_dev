import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'    
// import All from './all component/All.jsx'  
// import Text from './Text.jsx'  
import { AppProvider } from './all component/Contextapi.jsx'
// import Discount from './all component/Discount.jsx'
// import Singleproduct from './all component/Singleproduct.jsx'



createRoot(document.getElementById('root')).render(
  <AppProvider>
    <App />
    {/* <All/> */}
    {/* <Singleproduct/> */}
{/* <Text/> */}
{/* <Discount/> */}
  </AppProvider>

)
