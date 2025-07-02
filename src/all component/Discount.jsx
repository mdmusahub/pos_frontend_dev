import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AppContext } from './Contextapi'
import { useContext } from 'react'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Navbar from './Navbar';
const Discount = () => {
    const [data, setData] = useState([])
    const [disName, setDisname] = useState('')
    const [varId, setvarId] = useState("")
    const [mode, setmode] = useState('')
    const [disvalue, setdisvalue] = useState()
    const [enddate, setend] = useState()
    const [endtime, settime] = useState()
    const [Id, setId] = useState()
    const [update, setupdate] = useState(false)
    const [updateId, setupdateId] = useState(null)
    const [variants, setVariants] = useState([])


    
    let getdata = () => {
        axios.get(`https://9341-2405-201-3037-e814-34ec-3713-6be8-8c8a.ngrok-free.app/discount/getAll`, {
            headers: { 'ngrok-skip-browser-warning': 'true' },
        }).then((res) => {
            console.log(res.data)
            setData(res.data)
        }).catch((errr) => {
            console.log(errr)
        })
    }

    
  const fetchVariants = () => {
    axios.get('https://9341-2405-201-3037-e814-34ec-3713-6be8-8c8a.ngrok-free.app/productVariant/getAll', {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    }).then((res) => {
      setVariants(res.data);
      console.log(res.data)
    });
  };

    let data1 = useContext(AppContext)
    const [token, settoken, count, setcount, user, setuser, Base_url_] = data1
    useEffect(() => {
        getdata()
        fetchVariants()
    }, [])

    let reset = () => {
        setDisname("")
        setdisvalue('')
        setend("")
        setupdate(false)
        setmode("")
        setvarId("")
        setupdateId(null)
    }

    let sbt = (e) => {
        e.preventDefault()

        let obj = {
            discountName: disName,
            variantId: Number(varId),
            waiverMode: mode,
            discountValue: disvalue,
            endDateTime: enddate,

        }

        console.log(enddate)

        if (update) {
            axios.put(`https://9341-2405-201-3037-e814-34ec-3713-6be8-8c8a.ngrok-free.app/discount/update/${updateId}`, obj).then(() => {
                getdata()
                reset()
            })
        } else {
            axios.post(`https://9341-2405-201-3037-e814-34ec-3713-6be8-8c8a.ngrok-free.app/discount/create`, obj).then(() => {
                getdata()
                reset()
            })
        }

    }
    let dlt = (id) => {
        axios.delete(`https://9341-2405-201-3037-e814-34ec-3713-6be8-8c8a.ngrok-free.app/discount/delete/${id}`).then(() => {
            getdata()
            reset()
        })
    }
    let edt = (v) => {
        console.log(v)
        console.log(v.discountId)
        setupdateId(v.discountId)
        setupdate(true)
        setDisname(v.discountName)
        setvarId(v.variant?.productVariantId)
        setupdate(true)
        setmode(v.waiverMode)
        setdisvalue(v.discountValue)
    }
  const [ismenu, setismenu] = useState(false);

    return (
        <>
              <Navbar ismenu={ismenu} setismenu={setismenu}  /> 
<div onClick={()=>{setismenu(false)}} className="min-h-screen absolute top-16 w-full ">
            <div className='flex flex-col gap-3  '>
                <form action="" className='flex bg-gray-200 p-4 justify-center gap-14 ' >
                    <input className='bg-white  text-black w-80 rounded-xl p-2' placeholder='DiscountName' value={disName} type="text" onChange={(e) => setDisname(e.target.value)} />
                    {/* <input className='bg-white text-black w-80 rounded-xl p-2' value={varId} type="number" onChange={(e) => setvarId(e.target.value)} /> */}
                      <select
          value={varId}
          onChange={(e) => setvarId(e.target.value)}
          className="border p-2 rounded"
          required
        >
          <option value="">Select variants</option>
          {variants.map((p) => (
            <option key={p.productVariantId} value={p.productVariantId}>
              {p.variantName}
            </option>
          ))}
        </select>
                    <select className='bg-white rounded-xl w-60 px-2' value={mode}  name="" id="" onChange={(e) => setmode(e.target.value)}>
                        <option value="">Modes</option>
                        <option value="PERCENT">
                            percent
                        </option>
                        <option value="FIXED">
                            fixed
                        </option>
                    </select>
                    <input className='bg-white text-black w-80 rounded p-2' value={disvalue} type="percent" onChange={(e) => setdisvalue(e.target.value)} />
                    <input className='bg-white text-black w-40 rounded p-2' value={enddate} type="datetime-local" onChange={(e) => setend(e.target.value)} />
                    {/* <input className='bg-white text-black w-40 rounded-xl p-2' value={endtime} type="time" onChange={(e)=>settime(e.target.value)} /> */}
                    <button className='bg-gray-400   p-2 w-40 font-bold text-white rounded-xl hover:bg-violet-700 hover:cursor-pointer' onClick={(e) => sbt(e)} >submit</button>

                </form>
                <div className='flex gap-3  flex-wrap'>
                    {data.map((v) => (
                        <div key={v.discountId} className='flex bg-gray-500 w-80 h-48 flex-col p-3 gap-2 rounded-xl ' >
                            <div>
                                <div className='text-white font-bold' >
                                    <p>Name <span> {v.discountName}</span></p>
                                    <p>VariantId <span>{v.variant?.productVariantId}</span></p>
                                </div>
                                <div className='text-white font-bold'>
                                    <p>WaiverMode <span>{v.waiverMode}</span></p>
                                    <p>Discount Value <span>{v.discountValue}</span></p>
                                </div>
                            </div>
                            <div className='flex bg-white p-4 rounded-xl justify-center gap-3 font-semibold text-white'>
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

                    ))

                    }
                </div>
            </div>
            </div>
        </>
    )
}

export default Discount
