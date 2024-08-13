import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Joi from 'joi';
import axios from 'axios';
export default function Login({saveUserData}) {
    
    let navigate = useNavigate();
    const [errList,setErrList]=useState([]);
    const [err,setErr]=useState('');
    const [isLoading,setIsLoading]=useState(false);

    const [user,setUser] = useState({
        email:'',
        password:''
    });
 

    function getUserData(eventInf){
        let myUser={...user};
        myUser[eventInf.target.name] = eventInf.target.value;
        setUser(myUser);
    
    }




    async function sendLoginToApi() {
        try {
            let { data } = await axios.post('http://localhost:8080/login', user);
            console.log("API Response:", data);
            
            if (data.message === 'User login was successful') {
                console.log("Login successful, redirecting...");
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);
                saveUserData();
                setIsLoading(false);
                navigate('/');
            } else {
                console.error("Login failed:", data.message);
                setIsLoading(false);
                setErr(data.message);
            }
        } catch (error) {
            console.error("Error during login request:", error);
            setIsLoading(false);
            setErr("An error occurred during login.");
        }
    }
    

    
    function submitLoginForm(e){
        e.preventDefault();
        setIsLoading(true);
        let validation=validationLoginForm();
        if(validation.error){
            setIsLoading(false);
            setErrList(validation.error.details);
        }else{
             sendLoginToApi();
        } 
    }




    function validationLoginForm(){
        let scheme= Joi.object({
            email: Joi.string().email({ tlds: { allow: false } }).required(),       
            password:Joi.string().required()
         });
         return scheme.validate(user,{abortEarly:false});
     }




     
    //pour transformer des données réelles.............................................................................
// async function sendLoginToApi(){
//     let {data} = await axiosfrom.post('url',user);

// }

// function submitLoginForm(e){
//     e.preventDefault();
//     sendLoginToApi();
// }


  return <>
<div className='px-5 bg-danger '>
  <form onSubmit={submitLoginForm}>
    
    {err.length>0? <div className='alert p-2 alert-danger'>{err}</div>:''}
  <label htmlFor="email">email :</label>
  <input onChange={getUserData} type="email" className='form-control my-input my-2 rounded-1' name='email' id='email' />
  <p className='text-danger fs-6'>{errList.filter((err)=>err.context.label==='email')[0]?.message}</p>

  <label htmlFor="password">password :</label>
  <input onChange={getUserData} type="password" className='form-control my-input my-2 rounded-1' name='password' id='password' />
  <p className='text-danger fs-6'>{errList.filter((err)=>err.context.label==='password')[0]?'password invalid':''}</p>

<div className='d-flex justify-content-between'>
<p>dont have account ? <span className='po'><Link to='/register'>register</Link></span>  </p>

<button className='btn rounded-1 btn-outline-info'>
{isLoading?<i className='fas fa-spinner fa-spin'></i>:'Login'}</button>
</div>

  </form>
  </div>
  </>
}
