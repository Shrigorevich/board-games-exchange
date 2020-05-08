import React, {useState, useEffect} from "react"
import {useFormDataReq} from "./../hooks/formDataReq"

const Cpanel = (props) => {

   const {formDataReq} = useFormDataReq()

   const [form, setForm] = useState({
      name: "",
      picture: null,
      price: ""
   })

   const changeHandler = (event) => {
      setForm({ ...form, [event.target.name]: event.target.value });
   };

   const changeHandlerImage = (event) => {
      setForm({...form, picture: event.target.files[0]})
   }

   const createGame = async (event) => {
      event.preventDefault();

      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('picture', form.picture);
      formData.append('price', form.price);

      const req = await formDataReq("/api/games/create-game", "POST", formData)
      console.log(req);   
   }

   return (
      <form onSubmit={createGame} encType="multipart/form-data">
         <div>
            <h3>Add new game</h3>
         </div>
         <div className="cp-input">
            <span>Title</span>
            <input type="text" name="name" onChange={changeHandler}/>
         </div>
         <div className="cp-input">
            <span>Picture</span>
            <input type="file" name="picture" onChange={changeHandlerImage}/>
         </div>
         <div className="cp-input">
            <span>Price</span>
            <input type="text" name="price" onChange={changeHandler}/>
         </div>
         <div>
            <input type="submit" value="Send" className="btn btn-seccess"/>
         </div>
      </form>
   );
}

export default Cpanel