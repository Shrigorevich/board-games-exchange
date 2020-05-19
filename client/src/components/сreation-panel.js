import React, {useState} from "react"

const Cpanel = (props) => {

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
      
      props.sendGame(formData)
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
            <span>Price</span>
            <input type="text" name="price" onChange={changeHandler}/>
         </div>
         <div>
            <label htmlFor="picture" className="custom-file-upload">
               <i className="fa fa-cloud-upload"></i> Game picture
            </label>
            <input type="file" id="picture" name="picture" onChange={changeHandlerImage}/>
         </div>
         <div>
            <input type="submit" value="Send" className="btn btn-success"/>
         </div>
      </form>
   );
}

export default Cpanel