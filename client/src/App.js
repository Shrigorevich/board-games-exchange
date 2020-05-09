import React, { useState, useEffect } from "react";
import Main from "./pages/main";
import Profile from "./pages/profile";
import { useHttp } from "./hooks/httphook";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	const { request } = useHttp();

	const [state, setState] = useState({
      auth: false,
      userdata: null
	});

	const verify = async () => {
		const req = await request("/");
		if (req.status) {
			setState({
            auth: true,
            userdata: req.data.user
			});
		}else{
         setState({
            auth: false,
            userdata: null
         })
      }
	};

	useEffect(() => {
      verify()
   }, []);

	return (
		<Router>
			<Switch>
				<Route path="/" exact>
					<Main auth={state.auth} user={state.userdata} verify={verify} />
				</Route>
				<Route path="/profile">
					<Profile auth={state.auth} user={state.userdata} verify={verify}/>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
