import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

let Category = () => {
  let [data, setData] = useState([]);
  let [id, setId] = useState("");
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [parent_id, setParentId] = useState("");
  let [updateID, setUpdateID] = useState(null);
  let [updateActive, setUpdateActive] = useState(false);

  let getData = () => {
    axios.get("http://localhost:3000/Category").then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  // const getParentCategoryName = (id) => {
  //   const parent = data.find((cat) => cat.id === parseInt(id));
  //   return parent ? parent.name : "None";
  // };

  let del = (id) => {
    axios.delete(`http://localhost:3000/Category/${id}`).then(() => {
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
      id: parseInt(id),
      name,
      description,
      parent_id: parent_id ? parseInt(parent_id) : null,
    };

    if (updateActive) {
      axios.put(`http://localhost:3000/Category/${updateID}`, obj).then(() => {
        getData();
        resetForm();
      });
    } else {
      axios.post("http://localhost:3000/Category", obj).then(() => {
        getData();
        resetForm();
      });
    }
  };

  const edt = (v) => {
    setId(v.id);
    setName(v.name);
    setDescription(v.description);
    setParentId(v.parent_id);
    setUpdateID(v.id);
    setUpdateActive(true);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full bg-cyan-700 p-4">
        <div className="flex flex-wrap absolute top-20 gap-4">
          {data.map((v) => (
            <div
              key={v.id}
              className="h-[250px] w-[200px] flex flex-col justify-center gap-1 bg-cyan-900 text-white shadow-lg p-4 rounded"
            >
              <span>ID: {v.id}</span>
              <span>Name: {v.name}</span>
              <span>Description: {v.description}</span>
              {/* <span>Parent: {getParentCategoryName(v.parent_id)}</span> */}
              <div className="mt-2 flex justify-between">
                <button
                  onClick={() => edt(v)}
                  className="bg-pink-950 px-5 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => del(v.id)}
                  className="bg-pink-700 px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={sub}
          className="mt-6 fixed top-[45%] bg-gray-950 p-4 rounded w-[250px] flex flex-col gap-2 text-white"
        >
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="ID"
            className="bg-cyan-900 py-1 px-2 w-full"
          />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="bg-gray-800 py-1 px-2 w-full"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="bg-cyan-900 py-1 px-2 w-full"
          />
          <input
            type="number"
            value={parent_id}
            onChange={(e) => setParentId(e.target.value)}
            placeholder="Parent ID (optional)"
            className="bg-gray-800 py-1 px-2 w-full"
          />
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
