import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Joi from 'joi';
import axios from 'axios';
export default function Register() {
    let navigate = useNavigate();
    const [errList,setErrList]=useState([]);
    const [err,setErr]=useState('');
    const [isLoading,setIsLoading]=useState(false);
    const [user,setUser] = useState({
        firstName:'',
        lastName:'',
        age:0,
        email:'',
        password:'',
        role:'USER'
    });
    function getUserData(eventInf){
        let myUser={...user};
        myUser[eventInf.target.name] = eventInf.target.value;
        setUser(myUser);
    
    }

     function submitRegisterForm(e){
        e.preventDefault();
        setIsLoading(true);
        let validation=validationRegisterForm();
        if(validation.error){
            setIsLoading(false);
            setErrList(validation.error.details);
        }else{
             sendRegisterToApi();
        }
    }

    function validationRegisterForm(){
        let scheme= Joi.object({
             firstName:Joi.string().min(3).max(10).required(),
             lastName:Joi.string().min(3).max(10).required(),
             age:Joi.number().min(16).max(86).required(),
             email: Joi.string().email({ tlds: { allow: false } }).required(),             
             password:Joi.string().required(),
             role:Joi.string(),
         });
         return scheme.validate(user,{abortEarly:false});
     }

async function sendRegisterToApi(){
    let {data} = await axios.post('http://localhost:8080/register',user);
    console.log(data);
    if(data.message==='User registration was successful'){
            setIsLoading(false);
             navigate('/login');
    }else{
                setIsLoading(false);
                setErr(data.message);
    }
}



  return <>
  <div className='px-5 '>
  <form onSubmit={submitRegisterForm}>
    
    {err.length>0? <div className='alert alert-danger'>{err}</div>:''}
  <label htmlFor="firstName">first name :</label>
  <input onChange={getUserData} type="text" className='form-control my-input my-2 rounded-1' name='firstName' id='firstName' />
  <p className='text-danger fs-6'>{errList.filter((err)=>err.context.label==='firstName')[0]?.message}</p>

  <label htmlFor="lastName">last name :</label>
  <input onChange={getUserData} type="text" className='form-control my-input my-2 rounded-1' name='lastName' id='lastName' />
  <p className='text-danger fs-6'>{errList.filter((err)=>err.context.label==='laste_name')[0]?.message}</p>

  <label htmlFor="age">age :</label>
  <input onChange={getUserData} type="number" className='form-control my-input my-2 rounded-1' name='age' id='age' />
  <p className='text-danger fs-6'>{errList.filter((err)=>err.context.label==='age')[0]?.message}</p>

  <label htmlFor="email">email :</label>
  <input onChange={getUserData} type="email" className='form-control my-input my-2 rounded-1' name='email' id='email' />
  <p className='text-danger fs-6'>{errList.filter((err)=>err.context.label==='email')[0]?.message}</p>

  <label htmlFor="password">password :</label>
  <input onChange={getUserData} type="password" className='form-control my-input my-2 rounded-1' name='password' id='password' />
  <p className='text-danger fs-6'>{errList.filter((err)=>err.context.label==='password')[0]?'password invalid':''}</p>

  <div className='d-flex justify-content-between'>
<p>you have an account ? <span><Link to='/login'>login</Link></span>  </p>

<button className='btn rounded-1 btn-outline-info'>
{isLoading?<i className='fas fa-spinner fa-spin'></i>:'Register'}</button>
</div>
  </form>
  </div>
  </>
}
