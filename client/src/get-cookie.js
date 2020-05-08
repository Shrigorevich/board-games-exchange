const get_cookie = (cookie_name) => {
   let results = document.cookie.match(
      "(^|;) ?" + cookie_name + "=([^;]*)(;|$)"
   );

   if (results) return unescape(results[2]);
   else return null;
};

export default get_cookie