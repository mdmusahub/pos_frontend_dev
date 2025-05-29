import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment';
import Navbar from './Navbar'
import { ShoppingCart } from 'lucide-react';
import Carousel from "./Carousel"





const Inventory = () => {

    const [inventory, setInventory] = useState([])
    const [product_id, setProduct_id] = useState()
    const [product_variant_id, setProduct_variant_id] = useState()
    const [quantity, setQuantity] = useState('')
    const [location, setLocation] = useState('')
    const [editActive, setEditactive] = useState(false)
    const [Id, setId] = useState(null)


    useEffect(() => {
        getInventory()
    }, [])



    // GET 
    let getInventory = () => {

        axios.get('http://localhost:3000/Inventory').then((r) => {
            console.log(r.data);
            setInventory(r.data)

        }).catch((err) => {
            console.log("GetError", err);

        })
    }



    // POST
    let object = {

        product_id: product_id,
        product_variant_id: product_variant_id,
        quantity: quantity,
        location: location,
        lastUp: Date.now()


    }
    let post = (e) => {
        e.preventDefault()

        if (editActive === false) {

            axios.post('http://localhost:3000/Inventory', object).then((res) => {

                console.log(res.data);
                setInventory(res.data)
                getInventory()

            }).catch((err) => {
                console.log('PostError', err);

            })
        } else {

            axios.put(`http://localhost:3000/Inventory/${Id}`, object).then((r) => {
                console.log(r.data);
                setInventory(r.data)
                getInventory()
                setEditactive(false)
                setId(null)

            }).catch((err) => {
                console.log('Updation Error', err);

            })
        }

        product_id = ""
        product_variant_id = ""
        quantity = ""
        location = ""



    }

    // DELETE
    let dlt = (id) => {
        console.log(id);

        axios.delete(`http://localhost:3000/Inventory/${id}`).then((res) => {
            console.log(res.data);
            setInventory(res.data)
            getInventory()

        }).catch((e) => {
            console.log("DeletionError", e);

        })


    }

    // UPDATE
    let edit = (v) => {
        setEditactive(true)
        setId(v.id)

        setProduct_id(v.id)
        setProduct_variant_id(v.product_variant_id)
        setLocation(v.location)
        setQuantity(v.quantity)

    }



    let slides = [
        "https://m6n3t9d3.rocketcdn.me/wp-content/uploads/2021/12/Blinit-Blog-Image-1024x576.png",
        "https://miro.medium.com/v2/resize:fit:1358/1*wZspF7Fb4KpTZc8e3fgTPg.jpeg",
        "https://static.theprint.in/wp-content/uploads/2022/10/Blinkit-VIGYAPANTI.jpg",
        "https://bizbracket.in/wp-content/uploads/2024/05/Blinkit-Offers-Free-Dhaniya-With-Vegetable-Orders.jpg",
        "https://digest.thegstco.com/wp-content/uploads/2023/06/2-1-1024x576.png"
    ]


    return (

        <>



            <Navbar />

            <div className='h-400px w-[1000px] m-auto'>
                <Carousel slides={slides} />
            </div>

            {/* CARDS */}

            <div className='min-h-screen w-full gap-2 flex flex-wrap'>
                {inventory.map((v, index) => (


                    <div className="h-[450px] w-[250px] p-8 bg-white shadow-lg my-7 mx-5 border flex" key={index}>
                        <div className="space-y-4">
                            <div className="text-xl font-bold flex text-gray-800">Product Id: {v.product_id}</div>
                            <div className="text-xl font-sans text-gray-800">Product Variant Id: {v.product_variant_id}</div>
                            <h2 className="text-lg font-semibold text-blue-600">Quantity: {v.quantity}</h2>
                            <p className="text-gray-600">Location: {v.location}</p>
                            <h4 className="text-sm text-gray-500">{moment().format("MMMM Do YYYY")}</h4>
                            <div className='my-15'>
                                <button onClick={() => { edit(v) }} className='bg-blue-400 hover:bg-blue-500 text-white rounded-lg px-6 justify-between font-serif mx-2 py-2 text-semibold'>Edit</button>
                                <button onClick={() => { dlt(v.id) }} className='bg-red-400 hover:bg-red-500 text-white rounded-lg px-4 justify-between font-serif my-4 py-2 text-semibold'>Delete</button>
                                <button className='bg-green-600 text-white rounded-lg mx-3 px-5 py-2 flex hover:bg-green-700 items-center'>
                                    <ShoppingCart className="mr-2" size={20} />
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                <br /><br />


                {/* //-------------Form --------------- */}

                <form className='h-30% w-50% p-5 m-10 bg-blue-200 rounded-2xl text-black'>
                    <label htmlFor="id" className='text-xl font-bold'>ProductID</label>
                    <input type="number" placeholder='Product Variant ID' className='m-1.5 py-1.5 font-semibold rounded-lg text-center' value={product_id} onChange={(e) => setProduct_id(e.target.value)} /><br />

                    <label htmlFor="id" className='text-xl font-bold'>ProvariantID</label>
                    <input type="number" placeholder='Product Variant ID' className='m-1.5 py-1.5 font-semibold rounded-lg text-center' value={product_variant_id} onChange={(e) => setProduct_variant_id(e.target.value)} /><br />

                    <label htmlFor="quantity" className='text-xl font-bold'>Quantity</label>
                    <input type="text" placeholder='Quantity' className='p-2  text-semibold rounded-lg text-center m-2' value={quantity} onChange={(e) => setQuantity(e.target.value)} /><br />

                    <label htmlFor="Place" className='text-xl font-bold'>Location</label>
                    <input type="text" placeholder='Location' className='p-2  text-semibold rounded-lg text-center m-2' value={location} onChange={(e) => setLocation(e.target.value)} /><br />

                    <button onClick={(e) => { post(e) }} className='bg-white text-black rounded-2xl px-4 justify-between font-mono m-3 py-2 text-semibold'>Add</button>
                </form>
            </div>

        </>
    )
}

export default Inventory