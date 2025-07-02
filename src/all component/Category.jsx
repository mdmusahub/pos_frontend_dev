import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
let Category = () => {
  let [data, setData] = useState([]);
  let [categoryId, setId] = useState("");
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [parentId, setParentId] = useState("");
  let [updateID, setUpdateID] = useState(null);
  let [updateActive, setUpdateActive] = useState(false);

  let Baseurl = "https://9341-2405-201-3037-e814-34ec-3713-6be8-8c8a.ngrok-free.app"
  let getData = () => {
    axios
      .get(
        `${Baseurl}/category/getAll`,
        {
          headers: { "ngrok-skip-browser-warning": "true" },
        }
      )
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  let del = (id) => {
    axios
      .delete(
        `${Baseurl}/category/delete/${id}`
      )
      .then(() => {
        getData();
      });
  };

  let resetForm = () => {
    setId("");
    setName("");
    setDescription("");
    setParentId("");
    setUpdateActive(false);
    setUpdateID(null);
  };

  const sub = (e) => {
    e.preventDefault();

    const obj = {
      categoryId: parseInt(categoryId),
      name,
      description,
      parentId: parentId ? parseInt(parentId) : null,
    };

    if (updateActive) {
      axios
        .put(
          `${Baseurl}/category/update/${updateID}`,
          obj
        )
        .then(() => {
          getData();
          resetForm();
        });
    } else {
      axios
        .post(
          `${Baseurl}/category/create`,
          obj
        )
        .then(() => {
          getData();
          resetForm();
        });
    }
  };

  const edt = (v) => {
    setId(v.categoryId);
    setName(v.name);
    setDescription(v.description);
    setParentId(v.parentId);
    setUpdateID(v.categoryId);
    setUpdateActive(true);
  };
   const [ismenu, setismenu] = useState(false);

  return (
    <>

     <Navbar ismenu={ismenu} setismenu={setismenu} /> 
      <div onClick={()=>{setismenu(false)}}  className="min-h-screen w-full bg-gray-100  p-4">
        <div className="flex flex-wrap absolute top-20 gap-4">
          {data.map((v) => (
            <div
              key={v.categoryId}
              className="h-[250px] w-[200px] flex flex-col justify-center gap-1 bg-white text-black shadow-lg p-4 rounded"
            >
              {/* <span>ID: {v.categoryId}</span> */}
              <span>Name: {v.name}</span>
              <span>Description: {v.description}</span>
              <span>
                Parent:{" "}
                {v.parentId 
                  ? v.parentId.name
                  : "none"}
              </span>
              <div className="mt-2 flex text-cyan-100 justify-center gap-4  ">
                <button
                  onClick={() => edt(v)}
                  className="bg-green-600 px-5 py-1 rounded"
                >
                    <CiEdit />
                </button>
                <button
                  onClick={() => del(v.categoryId)}
                  className="bg-red-700 px-3 py-1 rounded"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={sub}
          className="mt-6 fixed top-[45%] bg-gray-400 p-4 rounded w-[250px] flex flex-col gap-2 text-white"
        >
          {/* <input
            type="number"
            value={categoryId}
            onChange={(e) => setId(e.target.value)}
            placeholder="ID"
            className="bg-gray-700 py-1 px-2 w-full"
          /> */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="bg-gray-700 py-1 px-2 w-full"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="bg-gray-700 py-1 px-2 w-full"
          />

          <select
            value={parentId || ""}
            onChange={(e) => setParentId(e.target.value)}
            className=" bg-gray-600"
            
          >
            <option value="">Select parent</option>
            {data.map((cat) => (
              <option key={cat.categoryId} value={cat.categoryId}>
                {cat.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-blue-700 py-1 rounded font-bold hover:bg-blue-900"
          >
            {updateActive ? "Update" : "Add"}
          </button>

          {updateActive && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-red-700 py-1 rounded mt-1 hover:bg-red-900"
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default Category;
