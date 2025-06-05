// import React from 'react';

// const CartSidebar = ({ cartItems }) => {
//   const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   return (
//     <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 overflow-y-auto z-50">
//       <h2 className="text-xl font-bold mb-4">Cart</h2>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty</p>
//       ) : (
//         <ul className="space-y-3">
//           {cartItems.map((item) => (
//             <li key={item.id} className="flex justify-between items-center border-b pb-2">
//               <div>
//                 <p className="font-semibold">{item.variant_name || item.name}</p>
//                 <p>Quantity: {item.quantity}</p>
//               </div>
//               <p>₹{item.price * item.quantity}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//       <hr className="my-4" />
//       <p className="text-lg font-bold">Total: ₹{totalPrice}</p>
//     </div>
//   );
// };

// export default CartSidebar;
