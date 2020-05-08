import React, {useState, useEffect} from "react";
import Header from "../components/Header";
import Registration from "./../components/Registration";
import Cpanel from "./../components/сreation-panel"
import { useHttp } from "./../hooks/httphook";
import get_cookie from "./../get-cookie"

const Profile = (props) => {

   const { request } = useHttp();

   const [viewParams, setParams] = useState({
      regView: false,
      regMsg: "",
      logView: false
   });

   const showReg = () => {
      console.log("showReg");
      
      setParams((viewParams) => {
         return {
            ...viewParams,
            regView: !viewParams.regView,
         };
      });
   };

   const logIn = async (data) => {
      try {
         const req = await request("/api/auth/", "POST", data);
         if(req.status){
            console.log('new cookie');
            document.cookie = `token=${req.data.token}; max-age=85000`;
            verify()
         }
      } catch (error) {}
   };

   const addUser = async (data) => {
      try {
         const req = await request("/api/users", "POST", data);         
         setParams((viewParams) => {
            return {
               ...viewParams,
               regMsg: req.msg,
            };
         });
         if (req.status) {
            document.cookie = `token=${req.data.token}; max-age=85000`;
            setTimeout(() => {
               setParams((viewParams) => {
                  return {
                     regView: false,
                     regMsg: "",
                     logView: req.status,
                     userData: req.data.user
                  }
               });
            }, 2000);
         }
      } catch (e) {}
   };

   const verify = async () => {
      const req = await request('/')
      console.log(req);
      if(req.status){
         setParams((viewParams) => {
            return {
               ...viewParams,
               logView: req.status,
               userData: req.data.user
            };
         });
      }
   }

   useEffect(() => {
      verify()
   }, [])

   return (
      <div>
         <Header toggle={showReg} view={{logView: viewParams.logView, user: viewParams.userData}} logIn={logIn} />
         <Registration view={viewParams} addUser={addUser} />
         <div className="profile-body">
            <div className="own-games">
            </div>
            <Cpanel/>
         </div>
      </div>
   );
}

export default Profile;
