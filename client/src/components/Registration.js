import React, {useState} from "react";

const Registration = (props) => {

   const [form, setForm] = useState({
      username: "",
      password: "",
   })

   const changeHandler = (event) => {
      setForm({ ...form, [event.target.name]: event.target.value });
   }

   return (
      <div className={props.view.regView ? "reg-visible" : "reg-hidden"}>
         <div className="reg-input-block">
            <span>Username</span>
            <input name="username" type="text" value={form.username} onChange={changeHandler}/>
         </div>
         <div className="reg-input-block">
            <span>Password</span>
            <input name="password" type="password" value={form.password} onChange={changeHandler}/>
         </div>
         <div>
            <button className="btn btn-success" onClick={() => {props.addUser({...form})}}>Sign Up</button>
         </div>
         <p className="reg-status">{props.view.msg}</p>
      </div>
   );
}

export default Registration;
