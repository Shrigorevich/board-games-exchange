import React, {useState} from "react";

const Registration = (props) => {

   const [form, setForm] = useState({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
   })

   const changeHandler = (event) => {
      setForm({ ...form, [event.target.name]: event.target.value });
   }

   return (
      <div className={props.view.regView ? "shadow" : ""}>
         <div className={props.view.regView ? "reg-visible" : "reg-hidden"}>
            <div className="reg-name">
               <div className="reg-input-block">
                  <label htmlFor="firstName">First name</label>
                  <input id="firstName" name="firstName" type="text" value={form.firstName} onChange={changeHandler}/>
               </div>
               <div className="reg-input-block">
                  <label htmlFor="lastName">Last name</label>
                  <input id="lastName" name="lastName" type="text" value={form.lastName} onChange={changeHandler}/>
               </div>
            </div>
            <div className="reg-input-block">
               <label htmlFor="username">Username</label>
               <input id="username" name="username" type="text" value={form.username} onChange={changeHandler}/>
            </div>
            <div className="reg-input-block">
               <label htmlFor="email">Email</label>
               <input id="email" name="email" type="email" value={form.email} onChange={changeHandler}/>
            </div>
            <div className="reg-input-block">
               <label htmlFor="password">Password</label>
               <input id="password" name="password" type="password" value={form.password} onChange={changeHandler}/>
            </div>
            <div className="reg-buttons">
               <button className="btn btn-success" onClick={() => {props.addUser({...form})}}>Sign Up</button>
               <button className="btn btn-danger" onClick={() => {props.toggle()}}>Cancel</button>
            </div>
            <p className="reg-status">{props.view.regMsg}</p>
         </div>
      </div>
   );
}

export default Registration;
