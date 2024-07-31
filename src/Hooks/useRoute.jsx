import { useEffect,useState } from 'react'
import axios from 'axios'
export default function useRoute() {

const [trendingMovies,setTrendingMovies]=useState([]);
const [trendingTv,setTrendingTv]=useState([]);
const [trendingPeople,setTrendingPeople]=useState([]);
    async function getTrending(mediaType,callback){
       let {data}=await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=b22e299473a6bd3b4ae42b1953fbd4b6`);
       callback(data.results);
       console.log(data.results);
    }
    useEffect(()=>{
        getTrending('movie',setTrendingMovies);
        getTrending('tv',setTrendingTv);
        getTrending('person',setTrendingPeople);
    },[]);
  return {trendingMovies,trendingTv,trendingPeople}
}
