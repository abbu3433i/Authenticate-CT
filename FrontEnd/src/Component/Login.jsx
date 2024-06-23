import React, { useState } from 'react';
import axios from 'axios';
import { json } from 'react-router-dom';

function Login() {
  const [loginstore, setloginstore] = useState({         
    email:"",
    password:""
  })

  //-------fun1 onchange pe chalega
  function fun2(e){
    let {name,value} = e.target   //----jo bhi name or value aa rhi he input field se usa destructure kar lo e.target se
    setloginstore({...loginstore,[name]:value}) //---purana to ...store rhe hi [name] target karayega ki kis field me change hoga ya data store hoga
  }

  async function login(e){
    e.preventDefault()
    console.log(loginstore,"bgjgjhhggv");

    console.log('clickkkk');
    let res = await axios.post('http://localhost:3000/login',loginstore);
    console.log(res,'hhkjshkjhk');

    //store in localstorage
    localStorage.setItem('userData',JSON.stringify(res.data))
    let get = localStorage.getItem('userData')
    console.log(get);

    if (res.data=='user nhi mila') {
      alert("user not found") 
    }else if(res.data==='invalid pass'){
      alert("invalid pass") 
    }else{
      alert("login successfully")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Login</h2>

        <form onSubmit={login}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter your email"

              name='email'
              value={loginstore.email}
              onChange={fun2}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter your password"

              name='password'
              value={loginstore.password}
              onChange={fun2}
            />
          </div>
          <div className="mb-4">
            <button className="w-full px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Login
            </button>
          </div>
          <div className="text-center">
            <a href="#" className="text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
