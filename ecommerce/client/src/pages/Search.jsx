import React, { useEffect, useState } from 'react'
import { useSearch } from '../context/search'
import Layout from '../layout/Layout'
import { set} from 'mongoose'

export default function Search() {
    const  [values,setValues] = useSearch()
    const [products,setProducts] = useState([])
    useEffect(()=>{
        setProducts(values?.results.length)
    },[])
  return (
    <Layout>
    <div className="container">
        <h1>Search Results</h1>
        {
           JSON.stringify(values?.results,null,4)
           
        }
        <div className="row">
            {values.results.map((products) => (
              <>

             
                <div className="col-md-4">
                  <div className="card" style={{ width: "18rem" }}>
                    <img
                     src={`http://localhost:5500/api/v1/search-product/${products._id}`}
                     className="card-img-top "
                     alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">Name:{products?.name.toUpperCase()}</h5>
                      <p className="card-text">Category:{products?.category?.name}</p>
                      <p className="card-text">Price:{products?.price}</p>
                      <a href="#" className="btn btn-secondary me-2">
                       Add To Cart
                      </a>
                      <a href="#" className="btn btn-primary">
                       Read more...
                      </a>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
    </div>
    </Layout>
  )
}
<div/>

// import React from 'react'

// export default function Search() {
//   return (
//     <div>Search</div>
//   )
// }
