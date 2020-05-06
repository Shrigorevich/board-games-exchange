import React, {useState} from "react";
import Header from "./../components/Header";
import Registration from "./../components/Registration"
import {useHttp} from "./../hooks/httphook"

const Main = (props) => {

   // const {request} = useHttp()

   // const addUser = async () => {
   //    try {
   //       const req = await request("/api/new-user", "POST", {...form});
         
   //       console.log(req);
         
   //    } catch (e) {}
   // };

   return (
      <div>
         <Header/>
         <Registration />
      </div>
   );
}

export default Main;
