import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Navbar from "./Navbar";
import { AppContext } from "./Contextapi";
let Customer = () => {
  const [customerdata, setcustomer] = useState([]);
  const [phoneNumber, setphoneNumber] = useState("");
  const [customerid, setcustomerid] = useState(null);
  const [isedit, setisedit] = useState(false);


 const dataa=useContext(AppContext) 
 
 const [token,settoken,count,setcount,user,setuser,categorydata,setcategorydata,productName,setName,sku,setSku,categoryId,setCategoryId,description,setDescription,updateActive,setUpdateActive,variantName,setvariantName,variantValue,setvariantValue,variantprice,setvariantprice,inventoryquantity,setinventoryquantity,inventorylocation,setinventorylocation,variantsarray,setvariantsarray,productvariants,setproductvariants,productId,setproductId,BaseUrl]=dataa
 


  const getcustomerdata = () => {
    axios
      .get(`${BaseUrl}/customer/getAll`, {
        headers: { "ngrok-skip-browser-warning": "true" },
      })
      .then((res) => {
        setcustomer(res.data);
        console.log(res.data);
      });
  };

  useEffect(() => {
    getcustomerdata();
  }, []);

  const del = (id) => {
    axios
      .delete(`${BaseUrl}/customer/delete/${id}`)
      .then(() => {
        getcustomerdata();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const resetForm = () => {
    setphoneNumber("");
    setcustomerid(null);
    setisedit(false);
  };

  const sub = (e) => {
    e.preventDefault();
    const obj = {
      customerid: customerid,
      phoneNumber: phoneNumber,
    };

    if (isedit) {
      axios.put(`${BaseUrl}/customer/update/${customerid}`, obj)
        .then(() => {
          getcustomerdata();
          resetForm();
        });

    }
  };

  const edit = (v) => {
    setphoneNumber(v.phoneNumber);
    setcustomerid(v.customerId);
    setisedit(true);
  };
  const [ismenu, setismenu] = useState(false);

  return (
    <>
      <Navbar ismenu={ismenu} setismenu={setismenu} />

      <div onClick={() => { setismenu(false) }} className="min-h-screen absolute top-20 bg-gray-100 flex  w-full flex-wrap gap-3 p-4">
        {customerdata.map((v) => (
          <div
            key={v.customerId}
            className="h-[140px] bg-white border border-gray-300 shadow-sm rounded-lg w-[250px] p-2"
          >
            <h1 className="text-lg font-semibold">User Number: {v.phoneNumber}</h1>
            <div className="gap-4 flex items-center justify-center mt-4">
              <button
                onClick={() => handleEdit(v)}
                className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
              >
                <CiEdit />
              </button>
              <button
                onClick={() => handleDelete(v.productVariantId)}
                className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
              >
                <MdDelete />

              </button>
            </div>
          </div>
        ))}

        <form onSubmit={sub} className="bg-white p-4 shadow-md rounded w-[250px] h-fit">
          <input
            type="number"
            placeholder="Phone number"
            value={phoneNumber}
            onChange={(e) => setphoneNumber(e.target.value)}
            className="border border-gray-300 p-2 w-full mb-2 rounded"
            required
          />
          <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded">
            {isedit ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Customer;
