import { useCallback } from "react";
import get_cookie from "./../get-cookie";
export const useHttp = () => {
   const request = useCallback(
      async (url, method = "GET", body = null, headers = {}) => {
         try {
            if (body) {
               body = JSON.stringify(body);
               headers["Content-Type"] = "application/json";
            }
            headers["x-auth-token"] = get_cookie("token");
            const response = await fetch(`${url}`, {
               method,
               body,
               headers,
            });
            const req_data = await response.json();

            if (!response.ok) {
               throw new Error(req_data.msg || "Somesong is wrong");
            }
            return { data: req_data, status: true };
         } catch (e) {
            console.log(e);
            return { msg: e.message, status: false };
         }
      },
      []
   );

   return { request };
};
