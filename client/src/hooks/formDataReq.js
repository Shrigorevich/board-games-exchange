import { useCallback } from "react";
import get_cookie from "./../get-cookie";
export const useFormDataReq = () => {
   const formDataReq = useCallback(
      async (url, method = "GET", body = null, headers = {}) => {        
         try {
            headers["x-auth-token"] = get_cookie("token");
            //http://localhost:5000
            const response = await fetch(`${url}`, {
               method,
               body,
               headers
            });
            const req_data = await response.json();

            if (!response.ok) {
               throw new Error(req_data.msg || "Somesong is wrong");
            }
            return { data: req_data, status: true, msg: req_data.msg };
         } catch (e) {
            console.log(e);
            return { msg: e.message, status: false };
         }
      },
      []
   );

   return { formDataReq };
};
