import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Joi, { allow, number } from 'joi';
export default function Login({saveUserData}) {
    
    let navigate = useNavigate();
    const [errList,setErrList]=useState([]);
    const [err,setErr]=useState('');
    const [isLoading,setIsLoading]=useState(false);
    const [user1,setUser1] = useState({
        email:'mehdi@gmail.com',
        password:'1234'
    });
    const [user,setUser] = useState({
        email:'',
        password:''
    });
    let [userData,setUserData]=useState({
        first_name:'mehdi',
        last_name:'ben',
        age:22,
        email:'mehdi@gmail.com',
        password:'1234'
    })

    function getUserData(eventInf){
        let myUser={...user};
        myUser[eventInf.target.name] = eventInf.target.value;
        setUser(myUser);
    
    }



    function sendLoginToApi(){
        if(user.email==user1.email && user.password ==user1.password){
            saveUserData();
            localStorage.setItem('userData',userData)
            setIsLoading(false);
            navigate('/');
        }else{
            setIsLoading(false);
                setErr('citizen validation failed: email or password invalid');
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
  <form onSubmit={submitLoginForm}>
    
    {err.length>0? <div className='alert alert-danger'>{err}</div>:''}
  <label htmlFor="email">email :</label>
  <input onChange={getUserData} type="email" className='form-control my-input my-2' name='email' id='email' />
  <p className='text-danger fs-6'>{errList.filter((err)=>err.context.label==='email')[0]?.message}</p>

  <label htmlFor="password">password :</label>
  <input onChange={getUserData} type="password" className='form-control my-input my-2' name='password' id='password' />
  <p className='text-danger fs-6'>{errList.filter((err)=>err.context.label==='password')[0]?'password invalid':''}</p>

  <button className='btn btn-outline-info'>
    {isLoading?<i className='fas fa-spinner fa-spin'></i>:'Login'}</button>
  </form>
  
  </>
}
