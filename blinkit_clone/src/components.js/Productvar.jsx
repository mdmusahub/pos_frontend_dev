import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Carousel from './Carousel'
// import { Link } from 'react'


const Productvar = () => {

  const [variant, setVariant] = useState([])
  const [id, setProductid] = useState(null)
  const [variant_name, setVariantname] = useState('')
  const [variant_value, setVariantvalue] = useState('')
  const [price, setPrice] = useState(null)
  const [updateActive, setUpdateactive] = useState(false)
  const [Id, setId] = useState(null)



  useEffect(() => {

    getProduct_variant()

  }, [])

  // CAROUSEL

  

  // GET DATA

  let getProduct_variant = () => {

    axios.get("http://localhost:3001/product_variant").then((response) => {

      console.log(response.data);
      setVariant(response.data)


    }).catch((error) => {

      console.log("axiosError", error);

    })

  }

  let object = {

    product_id: id,
    variant_name: variant_name,
    variant_value: variant_value,
    price: price

  }
  // POST DATA

  let post = (e) => {

    e.preventDefault()


    if (updateActive == false) {

      axios.post('http://localhost:3001/product_variant', object).then((res) => {

        console.log(res.data);
        setVariant(res.data)
        getProduct_variant()

      })

    } else {


      axios.put(`http://localhost:3001/product_variant/${Id}`, object).then((r) => {

        console.log(r.data);
        getProduct_variant()
        setUpdateactive(false)
        setId(null)

      }).catch((e) => {

        console.log('UpdationError', e);

      })
    }


    id = ""
    variant_name = ""
    variant_value = ""
    price = ""

  }

  // DELETE DATA
  let cut = (id) => {

    console.log(id);

    axios.delete(`http://localhost:3001/product_variant/${id}`).then((r) => {
      // console.log(r);

      setVariant(r.data)
      getProduct_variant()

    }).catch((e) => {

      console.log('DeletionError', e);

    })

  }


  // UPDATE DATA

  let update = (v) => {

    setUpdateactive(true)
    setId(v.id)
    // console.log(v);


    setProductid(v.product_id)
    setVariantname(v.variant_name)
    setVariantvalue(v.variant_value)
    setPrice(v.price)


  }


  return (
    <>


      <div>
{/* 
        <div className='h-400px w-[1000px] m-auto'>
          <Carousel slides={slides}/>
        </div> */}

        {/* ------Product Variant------ */}
        {/* CARD */}

        {variant.map((v, i, a) => (


          <div className='bg-white text-black text-centre border-4 m-10 h-[300px] w-[250px] flex-wrap rounded-2xl'>
            <h1 className='p-3 text-2xl'>{v.product_id}</h1>
            <h1 className='p-2 text-xl'>{v.variant_name}</h1>
            <p className='p-2 text-xl'>{v.variant_value}</p>
            <h3 className='p-2 text-xl'>${v.price}</h3>
            <div className='mx-2'>
              <button onClick={() => { update(v) }} className='px-5 py-2.5 rounded-lg m-4 bg-gray-800 text-white'>Edit</button>
              <button onClick={() => { cut(v.id) }} className='px-5 py-2.5 rounded-lg m-4 bg-gray-800 text-white'>Delete</button>

            </div>
          </div>

        ))}




        {/* Form */}

        <form className='m-100 p-10 border-3 rounded-2xl'>

          <label htmlFor="ID" className=''>ProductID</label>
          <input type="text" className='p-2 m-2' placeholder='ID' value={id} onChange={(e) => setProductid(e.target.value)} /><br />

          <label htmlFor="name">VariantName</label>
          <input type="text" className='p-2 m-2' placeholder='VariantName' value={variant_name} onChange={(e) => setVariantname(e.target.value)} /><br />

          <label htmlFor="value">VariantValue</label>
          <input type="text" className='p-2 m-2' placeholder='VariantValue' value={variant_value} onChange={(e) => setVariantvalue(e.target.value)} /><br />

          <label htmlFor="price" >Price</label>
          <input type="number" className='p-2 m-2' placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)} /><br />

          <button className='px-5 py-2.5 rounded-lg m-4 bg-gray-800 text-white' onClick={(e) => { post(e) }}> Submit</button>
        </form>

        {/* <Link to='/inventory'> */}
        {/* <button  className='px-5 py-2.5 rounded-lg m-4 bg-gray-800 text-white justify-items-end'>Go To Inventory</button> */}
        {/* </Link> */}
      </div>

    </>
  )
}

export default Productvar
