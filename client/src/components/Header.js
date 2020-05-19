import React, { useState } from "react";
import {Link} from "react-router-dom";

function Header(props) {
   
   const [form, setForm] = useState({
      username: "",
      password: "",
   });

   const changeHandler = (event) => {
      setForm({ ...form, [event.target.name]: event.target.value });
   };

   return (
      <div className="header">
         <div className="nav-bar">
            <span className="nav-bar-item"><Link to="/">MAIN</Link></span>
            <span className="nav-bar-item"><Link to="/profile">PROFILE</Link></span>
            <span className="nav-bar-item"><Link to="/exchange">EXCHANGE</Link></span>
            <span className="nav-bar-item" onClick={() => (props.search())}><i className="fas fa-search fa-sm"></i></span>
         </div>
         {!props.auth ? (
            <div className="auth">
               <button className="btn btn-dark" onClick={() => props.toggle()}>
                  Sign Up
               </button>
               <button
                  className="btn btn-light"
                  onClick={() => props.logIn({ ...form })}
               >
                  Log In
               </button>
               <input
                  name="username"
                  type="text"
                  value={form.username}
                  className="auth-input"
                  onChange={changeHandler}
               />
               <input
                  name="password"
                  type="password"
                  value={form.password}
                  className="auth-input"
                  onChange={changeHandler}
               />
            </div>
         ) : (
            <div>
               <button className="btn btn-light" onClick={() => props.logOut()}>
                  Log Out
               </button>
               <span className="username" >Hello, {props.user.firstName}</span>
            </div>
         )}
      </div>
   );
}

export default Header;
