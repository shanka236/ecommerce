import axios from "axios";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";

export default function SearchInput() {
    const [values,setValues] = useSearch()
    const navigate = useNavigate()
    // search function
   async function handleSubmit(e){
    e.preventDefault()
        try {
         const {data} = await axios.get(`http://localhost:5500/api/v1/search-product/${values.keyword}`)
         console.log(data);
         setValues({...values,results:data})
         navigate("/search")
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <>
      <form className="d-flex" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          value={values.keyword}
          onChange={(e)=>setValues({...values,keyword:e.target.value})}
        />
        <button className="btn btn-outline-success" 
        type="submit" onClick={handleSubmit}>
          Search
        </button>
      </form>
    </>
  );
}
