import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Registration from "./../components/Registration";
import Cpanel from "./../components/сreation-panel";
import { useHttp } from "./../hooks/httphook";
import { useFormDataReq } from "./../hooks/formDataReq";
import GamesList from "./../components/gamesList";
import ExchangesList from "./../components/ExchangesList";
import {NavLink, Switch, Route} from "react-router-dom";

const Profile = (props) => {
	const { request } = useHttp();
	const { formDataReq } = useFormDataReq();

	const [viewParams, setParams] = useState({
		regView: false,
		regMsg: "",
	});

	const [data, setData] = useState({
		games: null,
		exchanges: null

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
				console.log("new cookie");
				document.cookie = `token=${req.data.token}; max-age=85000`;
				props.verify();
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
						};
					});
				}, 1500);
			}
		} catch (e) {}
	};

	const logOut = () => {
        console.log('log out', props.user._id);
        document.cookie = `token=${props.user._id}; max-age=0`;
        props.verify()
    }

	const sendGame = async (formData) => {
		const req = await formDataReq(
			"/api/games/create-game",
			"POST",
			formData
		);
		console.log(req);
		document.location.reload()
	};

	const getData = async () => {
		const games = await request("/api/games/list", "GET");
		const exchanges = await request("/api/exchanges/list", "GET");

		setData({
			games: games.data,
			exchanges: exchanges.data
		});
	};

	const accept = async (exchangeId) => {
		await request('/api/exchanges/accept', "POST", {exchangeId})
		document.location.reload()
	}

	const reject = async (exchangeId) => {
		await request('/api/exchanges/reject', "POST", {exchangeId})
		document.location.reload()
	}



	useEffect(() => {
		console.log("verify");
		if(props.auth){
			getData();
		}
	}, [props.auth]);
	
	return (
		<div>
			<Header
				toggle={showReg}
				auth={props.auth}
				user={props.user}
				logIn={logIn}
				logOut={logOut}
			/>
			<Registration view={viewParams} addUser={addUser} />
			{props.auth ? (
				<div className="profile-body">
					<div className="games-list-wrapper">
						<div className="list-toggle">
							<div>
								<NavLink exact to="/profile" activeStyle={{color: "#44D62C"}}>My games</NavLink>
								<span> / </span> 
								<NavLink to="/profile/exchanges/" activeStyle={{color: "#44D62C"}}>Exchanges</NavLink>
							</div>
							<div>
								<Route path="/profile/exchanges">
									<NavLink to="/profile/exchanges/from-me" activeStyle={{color: "#44D62C"}}>From Me</NavLink>
									<span> / </span> 
									<NavLink to="/profile/exchanges/for-me" activeStyle={{color: "#44D62C"}}>For Me</NavLink>
								</Route>
							</div>
						</div>
						<Switch>
							<Route path="/profile" exact>
								{data.games ? <GamesList list={data.games} /> : null}
							</Route>
							<Route path="/profile/exchanges/">
								{data.exchanges ? <ExchangesList accept={accept} reject={reject} fromMeList={data.exchanges.fromMeList} forMeList={data.exchanges.forMeList}/> : null}
							</Route>
						</Switch>
					</div>
					<div className="creation-panel">
						<Cpanel sendGame={sendGame} />
					</div>
				</div>
			) : <img className="img-fluid" src={require('./../images/wampus-bg.png')} alt="wampus" />}
		</div>
	);
};

export default Profile;
