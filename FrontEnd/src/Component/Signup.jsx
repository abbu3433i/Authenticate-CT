import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [store, setstore] = useState({
    firstName:"",
    lastName:"",          //-----ye obj me is liye banaya he taki input field ka data isme store ho sake
    email:"",
    password:""
  })

  //-------fun1 onchange pe chalega
  function fun1(e){
    let {name,value} = e.target   //----jo bhi name or value aa rhi he input field se usa destructure kar lo e.target se
    setstore({...store,[name]:value}) //---purana to ...store rhe hi [name] target karayega ki kis field me change hoga ya data store hoga
  }

 async function done(e){
    e.preventDefault();    //--------आमतौर पर, जब हम HTML फॉर्म को submit करते हैं, तो पेज रिफ्रेश हो जाता है। यदि आप इस डिफॉल्ट व्यवहार को रोकना चाहते हैं ताकि पेज रिफ्रेश न हो और आप कस्टम लॉजिक को हैंडल कर सकें to hum e.preventDefault() ko use karte hen
    // console.log(store,"hii");

    //-----------------------ye backend me data save kar rha he with the help of axios
    let res = await axios.post('http://localhost:3000/signup',store);
    console.log(res,'hloooo');

    if (store.firstName=='' || store.lastName=='' || store.email=='' || store.password=='') {
      alert("Empty field")
    }
    else if (res.data=='user already exits') {
      alert("user already exits") 
    }
    else if (res.data=='data save in database') {
      alert("Data save successfully") 
    }
    else{
      alert("Something went wrong") 
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Sign Up</h2>

        <form onSubmit={done}>
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input 
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter your first name"

              name='firstName'
              value={store.firstName}    
              onChange={fun1}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter your last name"

              name='lastName'
              value={store.lastName}
              onChange={fun1}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter your email"

              name='email'
              value={store.email}
              onChange={fun1}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter your password"

              name='password'
              value={store.password}
              onChange={fun1}
            />
          </div>
          <div className="mb-4">
            <button className="w-full px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Sign Up
            </button>
          </div>
          <div className="text-center">
            <a href="#" className="text-blue-500 hover:underline">
              Already have an account? Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
