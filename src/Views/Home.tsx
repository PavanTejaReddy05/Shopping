import { useEffect ,useState} from "react"
import Banner from "../components/Banner"
import Collection from "../components/Collection"
import Footer from "../components/Footer"
import Header from "../components/Header"
import GentsCollection from "../components/GentsCollection"
import Ladiescollection from "../components/ladiescollection"
import { useNavigate } from "react-router-dom"
import CartCollectionWrapper from "../components/CartColWrapper"

interface Item {
  image: string;
  price: string; // Price is a string with currency
}

interface Category {
  _id: string;
  title: string;
  items: Item[];
}


const Home = () => {
  const navigate=useNavigate();
  const [data,setdata]=useState<Category[]>([]);
  useEffect(()=>{
    const token=localStorage.getItem("token");
    console.log("Token:", token);
    fetch("http://127.0.0.1:8000/data",{
      method:"GET",
      headers:{
        Authorization:`Bearer ${token}`,
      },
    })
    .then(response=>{
      if (!response.ok){
        alert("Session Expired")
        navigate('/')
        return;
        // throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(json=>setdata(json))
    .catch(error=>console.error("Error fetching data:",error))
  },[]); 
  return (
    <div className="All">
      <Header/>
      <Banner />
      <GentsCollection/>
      <Ladiescollection/>
      {/* <Collection data={data} /> */}
      <CartCollectionWrapper data={data}/>
      <Footer/>
    </div>
  )
}

export default Home;