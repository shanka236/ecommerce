// import { NavLink, useParams } from "react-router-dom";
// import Layout from "../../layout/Layout";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function ProductDetails() {
//   const { id} = useParams();
//   const [name, setName] = useState();
//   const [description, setDescription] = useState("");
//   const [category, setcateogy] = useState("");
//   const [price, setPrice] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [similarProduct,setSimilarProduct] = useState([])
// // similar product
//    async function getSimilarProduct(pid,cid)
//    {
//        try {
//        const {data} = await 
//        axios.get(`http://localhost:5500/api/v1/similar-products/${pid}/${cid}`)
//        setSimilarProduct(data?.products)
//        console.log(data?.products);
//        } catch (error) {
//         console.log(error);
//        }
//    }
// // get products
//   async function getproduct() {
//     try {
//       const { data } = await axios.get(
//         `http://localhost:5500/api/v1/single-product/${id}`
//       );
//     //   console.log(data?.product);
//       setName(data?.product?.name);
//       setDescription(data?.product?.description);
//       setPrice(data?.product?.price);
//       setQuantity(data?.product?.quantity);
//       setcateogy(data?.product?.category?.name);
//     // calling similar product  
//       getSimilarProduct(data?.product._id,data?.product?.category?._id)
//     } catch (error) {
//       console.log(error);
//     }
//   }
  
//   useEffect(() => {
//     getproduct();
//   }, [id]);
//   return (
//     <Layout>
//       <div className="row">
//         <div className="col-md-6 mt-3">
//         <img 
//                   src={`http://localhost:5500/api/v1/product-photo/${id}`}   
//                   alt="product_photo" 
//                   width="350" 
//                   height="350" 
//                   style={{ marginLeft: "200px" }} 
//                   className="img img-responsive" 
//                 /> 
//         </div>
//         <div className="col-md-6 mt-3">
//           <h1>Product Detials</h1>
//           <h5>Name : {name}</h5>
//           <h5>Description : {description}</h5>
//           <h5>Category : {category}</h5>
//           <h5>Price : {price}</h5>
//           <h5>Quantity : {quantity}</h5>
//           <button className="btn btn-secondary mt-2"> Add to cart</button> 
//         </div>
//       </div>

//       <div> 
//         <h3 className="mt-3">Similar Products</h3>
//         <hr />
//         {/* {JSON.stringify(similarProduct,null,4)} */}
//         <div className="d-flex flex-wrap mt-4">
                
//                 {
//                   similarProduct.map((product)=>(<>
//                     <div className="card m-3" style={{ width: "18rem" }}>
//                     <img
//                       src={`http://localhost:5500/api/v1/product-photo/${product._id}`}
//                       className="card-img-top mt-3"
//                       alt="..."
//                       id="image"
//                     />

//                     <div className="card-body">
//                       <h5 className="card-title">
//                         Name : {product?.name?.toUpperCase()}
//                       </h5>
//                       <p className="card-text">
//                         Category : {product?.category?.name}
//                       </p>
//                       <p className="card-text">Price : {product?.price}</p>
//                       <a href="#" className="btn btn-secondary me-2">
//                         Add To Cart
//                       </a>
//                       <NavLink to={`/product-details/${product?._id}`} className="btn btn-success">
//                         More Detials
//                       </NavLink>
//                     </div>
//                   </div>
//                   </>))     
//                 }
//              </div>
//              </div>
//     </Layout>
//   )
// }






// import { useParams } from "react-router-dom";
// import Layout from "../../layout/Layout";
// import { useEffect, useState } from "react";
// import axios from "axios";
// //import Category from "../admin/Category";



// export default function ProductDetails() {
//     const { id } = useParams()
//     const [name, setName] = useState();
//     const [description, setDescription] = useState("");
//     const [category,setCategory] = useState("");
//     const [price, setPrice] = useState("");
//     const [quantity, setQuantity] = useState("");
//     const [similarProduct,setSimilarProduct] = useState([])
//     async function getproduct() {
//         try {
//             const { data } = await axios.get(
//                 `http://localhost:5500/api/v1/single-product/${id}`
//             );
//             console.log(data?.product);
//             setName(data?.product?.name);
//             setDescription(data?.product?.description);
//             setPrice(data?.product?.price);
//             setQuantity(data?.product?.quantity);
//             setCategory(data?.product?.category?.name);
//         } catch (error) {
//             console.log(error);
//         }

//     }
//     useEffect(() => {
//         getproduct();
//     }, [])
//     return (
//         <Layout>
//             <div className="row">
//             <div className="'col-md-6 mt-5">
//                     <img
//                         src={`http://localhost:5500/api/v1/product-photo/${id}`}
//                         alt="product_photo"
//                         width="350"
//                         height="350"
//                         style={{ marginLeft: "200px" }}
//                         className="img img-responsive"
//                     />
//                 </div>

//                 <div className="'col-md-6 pt-3">
//                     <h1>Product Details</h1>
//                     <h5>Name:{name}</h5>
//                     <h5>Description:{description}</h5>
//                     <h5>Category:{category}</h5>
//                     <h5>Price:{price}</h5>
//                     <h5>Quantity:{quantity}</h5>
//                     <button className="btn btn-secondary">Add to cart</button>
//                 </div>

                

//                 <div>similar products</div>
//             </div>
//         </Layout>
//     )
// }





