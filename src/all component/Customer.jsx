import axios from "axios";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Navbar from "./Navbar";
let Customer = () => {
  const [customerdata, setcustomer] = useState([]);
  const [phoneNumber, setphoneNumber] = useState("");
  const [customerid, setcustomerid] = useState(null);
  const [isedit, setisedit] = useState(false);

  const getcustomerdata = () => {
    axios
      .get("https://b1c9-2405-201-3037-e814-db4-d4e9-276d-f1d4.ngrok-free.app/customer/getAll", {
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
      .delete(`https://b1c9-2405-201-3037-e814-db4-d4e9-276d-f1d4.ngrok-free.app/customer/delete/${id}`)
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
      axios.put(`https://b1c9-2405-201-3037-e814-db4-d4e9-276d-f1d4.ngrok-free.app/customer/update/${customerid}`, obj)
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

      <div onClick={() => { setismenu(false) }} className="min-h-screen absolute top-20 bg-gray-100 flex  flex-wrap gap-3 p-4">
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
