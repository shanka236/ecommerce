import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
//import { useAuth } from '../context/auth'
import axios from 'axios'
import { Checkbox, Radio } from 'antd'
import { Prices } from './user/Prices'
import { NavLink } from 'react-router-dom'
//import Product from './admin/Product'

export default function Home() {
 // const [auth, setAuth] = useAuth()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [checked,setChecked] = useState([]);
  const [radio,setRadio] = useState([])
 const [total,setTotal] =useState(0);
 const [page,setPage] = useState(1);
 const [ loading,setLoading] = useState(false)

 //get total count

 async function getTotalCount()
 {
  try{
  const {data} =  await axios.get(`http://localhost:5500/api/v1/product-count`);

  setTotal(data?.total)
  console.log(data?.total);
  }catch(error)
  {
    console.log(error);
  }
 }

 
  //filter product
  async  function filterProducts()
  {
    try{
      
       const {data} = await axios.post(`http://localhost:5500/api/v1/product-filter`,{checked,radio});
        setProducts(data?.products);
        console.log(data?.products);
    }catch(error)
    {
      console.log(error);
    }
    
  }
  // filter
  useEffect(()=>{
     if(!checked.length )
     {
      getAllProduct()
     }
    
  },[checked]);
  
  //filter
  useEffect(()=>{
    if(checked.length || radio.length) 
    filterProducts();
  },[checked,radio]);

// load more data
const loadMore = async () => {
  try {
    setLoading(true);
    const { data } = await axios.get(
     `http://localhost:5500/api/v1/product-list/${page}` 
    );
    setLoading(false);
    console.log(data);
    setProducts([...products,...data.products]);
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

useEffect(() => {
  if (page === 1) return;
  loadMore();
}, [page]);
 //get all  category
  async function getCategories() {
    const { data } = await axios.get(
     ` http://localhost:5500/api/v1/get-category`
    );
    //console.log(data?.categories);
    setCategories(data?.categories);
  }

  


  //get all products

  async function getAllProduct() {
    try {
      setLoading(true)
      const { data } = await axios.get(`http://localhost:5500/api/v1/product-list/${page}`);
      setLoading(false)
      console.log(data?.products);
      setProducts(data?.products);
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }
   // cat filter 

  const handleFilter = (value,cid)=>{
    let all = [...checked];
    if(value)
    {
      all.push(cid)
    }
    else{
      all = all.filter((c)=>c!==cid)
    }
    setChecked(all);
  }
  useEffect(() => {
     getAllProduct();
     getCategories();
     getTotalCount();
  }, [])

  return (
    <Layout>
      <div className="row">
        <div className="col-md-4">
          <h3 className="text-center">Filter by Category</h3>
          { JSON.stringify(checked,null,4)}
           <div className="d-flex flex-column mt-3 ms-5">
          {
            categories.map((cat)=>(
              <Checkbox key={cat._id} onChange={(e)=>handleFilter(e.target.checked,cat._id)}
              style={{fontSize:'30px'}}>
                {cat.name}
              </Checkbox>
            ))
          }
          <h3 className="text-center">Filter By Price</h3>
          { JSON.stringify(radio,null,4)}
        
            <Radio.Group onChange={e=>setRadio(e.target.value)}>
            <div className="d-flex flex-column mt-3 ms-5">
                  {
                    Prices.map((p=>
                      <>
                      <Radio value={p.array} style={{fontSize:"17px",paddingBottom:"5px"}}>{p.name}</Radio>
                      </>
                      ))
                  }
                   </div>

            </Radio.Group>
            <div className="mt-5">
          <button  className="btn btn-danger w-50" onClick={()=>window.location.reload()}> RESET FILTER</button>
        </div>
          </div>
        </div>
        <div className="col-md-8">
          <h3 className="text-center mb-3">All Products</h3>
          <div className="row">
            {products.map((products) => (
              <>
                <div className="col-md-4">
                  <div className="card" style={{ width: "18rem" }}>
                    <img
                     src={`http://localhost:5500/api/v1/product-photo/${products._id}`}
                     className="card-img-top "
                     alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">Name:{products?.name.toUpperCase()}</h5>
                      <p className="card-text">Category:{products?.category?.name}</p>
                      <p className="card-text">Price:{products?.price}</p>
                      <a href="#" className="btn btn-secondary me-2">
                       Add To Cart
                      </a>
                      <NavLink to={`/product-details/${products?._id}`} className="btn btn-primary">
                       More Details
                      </NavLink>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
          {
            products.length < total && (
              <button 
            className="btn btn-primary" 
            onClick={(e)=>{
              e.preventDefault();
              setPage(page+1);
            }}>
                 {loading ? "Loading..." : "Load More..."}
            </button>
            ) }
             <div>
          </div>
        </div>
      </div> 
    </Layout>
  )
}

// import { useEffect, useState } from "react";
// import { useAuth } from "../context/auth";
// import Layout from "../layout/Layout";
// import axios from "axios";

// export default function Home() {
//   const [auth, setAuth] = useAuth();
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);

//   async function getAllProducts() {
//     try {
//       const { data } = await axios.get(`http://localhost:5500/api/v1/products`);
//       // console.log(data?.products);
//       setProducts(data?.products);
//     } catch (error) {
//       console.log(error);
  
//   }

//   useEffect(() => {
//     getAllProducts();
//   }, []);

//   return (
//     <Layout>
//       {/* <pre>
//           {JSON.stringify(auth,null,4)}
//         </pre> */}

//       <div className="row">
//         <div className="col-md-4">
//           <h3 className="text-center">Filter by Category</h3>
//         </div>
//         <div className="col-md-8">
//           <h3 className="text-center">All Products</h3>
//           <div className="row">
//             {products.map((products) => (
//               <>
//                 <div className="col-md-4">
//                   <div className="card" style={{ width: "18rem" }}>
//                     <img src="..." className="card-img-top" alt="..." />
//                     <div className="card-body">
//                       <h5 className="card-title">Card title</h5>
//                       <p className="card-text">
//                         Some quick example text to build on the card title and
//                         make up the bulk of the card's content.
//                       </p>
//                       <a href="#" className="btn btn-primary">
//                         Go somewhere
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }
