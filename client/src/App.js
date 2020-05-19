import React, { useState, useEffect } from "react";
import Main from "./pages/main";
import Profile from "./pages/profile";
import ProfileOverview from "./pages/profileOverview";
import Exchange from "./pages/exchange";
import { useHttp } from "./hooks/httphook";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	const { request } = useHttp();

	const [state, setState] = useState({
      auth: false,
      userdata: null
	});

	const verify = async () => {
		const req = await request("/api/auth/verify");
		
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

	const [viewParams, setParams] = useState({
		regView: false,
		regMsg: "",
	});

	const showReg = () => {
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
			if (req.status) {
				document.cookie = `token=${req.data.token}; max-age=85000`;
				verify();
			}
		} catch (error) {}
	};

	const logOut = () => {
        document.cookie = `token=${state.userdata._id}; max-age=0`;
    	verify()
    }

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
				verify();
				setTimeout(() => {
					setParams((viewParams) => {
						return {
							regView: false,
							regMsg: "",
						};
					});
				}, 1500);
			}
		} catch (e) {}
	};


	useEffect(() => {
      verify()
   }, []);

	return (
		<Router>
			<Switch>
				<Route path="/" exact>
					<Main auth={state.auth}
					user={state.userdata} 
					verify={verify} 
					addUser={addUser}
					logOut={logOut}
					logIn={logIn}
					showReg={showReg}
					viewParams={viewParams}/>
				</Route>

				<Route path="/profile">
					<Profile auth={state.auth} 
					user={state.userdata} 
					verify={verify}
					addUser={addUser}
					logOut={logOut}
					logIn={logIn}
					showReg={showReg}
					viewParams={viewParams}/>
				</Route>

				<Route exact path="/user/:username" render={(props) => (<ProfileOverview {...props} 
					auth={state.auth} 
					user={state.userdata} 
					verify={verify}
					addUser={addUser}
					logOut={logOut}
					logIn={logIn}
					showReg={showReg}
					viewParams={viewParams}/>)}/>

				<Route exact path="/exchange/:game" render={(props) => (<Exchange {...props} 
					auth={state.auth} 
					user={state.userdata} 
					verify={verify}
					addUser={addUser}
					logOut={logOut}
					logIn={logIn}
					showReg={showReg}
					viewParams={viewParams}/>)}/>
				
				<Route exact path="/exchange">
					<Exchange auth={state.auth}
					user={state.userdata}
					verify={verify}
					addUser={addUser}
					logOut={logOut}
					logIn={logIn}
					showReg={showReg}
					viewParams={viewParams}/>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
