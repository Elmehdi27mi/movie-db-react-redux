import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Joi, { allow, number } from 'joi';
export default function Register() {
    let navigate = useNavigate();
    const [errList,setErrList]=useState([]);
    const [err,setErr]=useState('');
    const [isLoading,setIsLoading]=useState(false);
    const [user1,setUser1] = useState({
        first_name:'mehdi',
        last_name:'ben',
        age:22,
        email:'mehdi@gmail.com',
        password:'1234'
    });
    const [user,setUser] = useState({
        first_name:'',
        last_name:'',
        age:0,
        email:'',
        password:''
    });
    function getUserData(eventInf){
        let myUser={...user};
        myUser[eventInf.target.name] = eventInf.target.value;
        setUser(myUser);
    
    }



    function sendRegisterToApi(){
        if(user.email==user1.email && user.password ==user1.password){
           
            setIsLoading(false);
            navigate('/login');
        }else{
            setIsLoading(false);
                setErr('citizen validation failed: email: email already registred');
        }
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
             first_name:Joi.string().min(3).max(10).required(),
             last_name:Joi.string().min(3).max(10).required(),
             age:Joi.number().min(16).max(86).required(),
             email: Joi.string().email({ tlds: { allow: false } }).required(),             password:Joi.string().required()
         });
         return scheme.validate(user,{abortEarly:false});
     }
    //pour transformer des données réelles.............................................................................
// async function sendRegisterToApi(){
//     let {data} = await axiosfrom.post('url',user);

// }

// function submitRegisterForm(e){
//     e.preventDefault();
//     sendRegisterToApi();
// }


  return <>
  <form onSubmit={submitRegisterForm}>
    
    {err.length>0? <div className='alert alert-danger'>{err}</div>:''}
  <label htmlFor="first_name">first name :</label>
  <input onChange={getUserData} type="text" className='form-control my-input my-2' name='first_name' id='first_name' />
  <p className='text-danger fs-6'>{errList.filter((err)=>err.context.label==='first_name')[0]?.message}</p>

  <label htmlFor="last_name">last name :</label>
  <input onChange={getUserData} type="text" className='form-control my-input my-2' name='last_name' id='last_name' />
  <p className='text-danger fs-6'>{errList.filter((err)=>err.context.label==='laste_name')[0]?.message}</p>

  <label htmlFor="age">age :</label>
  <input onChange={getUserData} type="number" className='form-control my-input my-2' name='age' id='age' />
  <p className='text-danger fs-6'>{errList.filter((err)=>err.context.label==='age')[0]?.message}</p>

  <label htmlFor="email">email :</label>
  <input onChange={getUserData} type="email" className='form-control my-input my-2' name='email' id='email' />
  <p className='text-danger fs-6'>{errList.filter((err)=>err.context.label==='email')[0]?.message}</p>

  <label htmlFor="password">password :</label>
  <input onChange={getUserData} type="password" className='form-control my-input my-2' name='password' id='password' />
  <p className='text-danger fs-6'>{errList.filter((err)=>err.context.label==='password')[0]?'password invalid':''}</p>

  <button className='btn btn-outline-info'>
    {isLoading?<i className='fas fa-spinner fa-spin'></i>:'Register'}</button>
  </form>
  
  </>
}
