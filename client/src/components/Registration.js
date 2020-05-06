import React, {useState, useEffect} from "react";
import {useHttp} from "./../hooks/httphook"

const Registration = (props) => {

   const [form, setForm] = useState({
      username: "",
      password: "",
   })

   const {request} = useHttp()

   const changeHandler = (event) => {
      setForm({ ...form, [event.target.name]: event.target.value });
   }

   const addUser = async () => {
      try {
         const req = await request("/api/users", "POST", {...form});
         
         console.log(req);
         
      } catch (e) {}
   };

   return (
      <div>
         <div className="reg-input-block">
            <span>Username</span>
            <input name="username" type="text" value={form.username} onChange={changeHandler}/>
         </div>
         <div className="reg-input-block">
            <span>Password</span>
            <input name="password" type="password" value={form.password} onChange={changeHandler}/>
         </div>
         <div>
            <button className="btn btn-success" onClick={addUser}>Sign Up</button>
         </div>
      </div>
   );
}

export default Registration;
