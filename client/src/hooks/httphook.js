import {useCallback} from 'react'

export const useHttp = () => {

   const request = useCallback(async (url, method = "GET", body = null,  headers = {}) => {

      try {
         if(body){
            body = JSON.stringify(body)
            headers['Content-Type'] = 'application/json'
         }
         const response = await fetch(`http://localhost:5000${url}`, {method, body, headers})
         const data = await response.json();

         if (!response.ok){
            throw new Error(data.message || "Somesong is wrong")
         }
         return data;
      } catch (e) {
         console.log('Err: ', e);
      }
   }, [])

   return { request }
}
