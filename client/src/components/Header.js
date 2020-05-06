import React, {useState} from "react";

function Header(props) {

   const [form, setForm] = useState({
      username: "", 
      password: ""
   })

   const changeHandler = (event) => {
      setForm({ ...form, [event.target.name]: event.target.value });
   }


   return (
      <div className="header">
         <div className="nav-bar">
            <span className="nav-bar-item">Main</span>
            <span className="nav-bar-item">Profile</span>
            <span></span>
         </div>
         <div className="auth">
            <input type="text" value={form.username} />
            
         </div>
      </div>
   );
}

export default Header;
