import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Registration from "./../components/Registration";
import Cpanel from "./../components/сreation-panel";
import { useHttp } from "./../hooks/httphook";
import { useFormDataReq } from "./../hooks/formDataReq";
import GamesList from "./../components/gamesList";
import {NavLink, Switch, Route} from "react-router-dom"

const Profile = (props) => {
	const { request } = useHttp();
	const { formDataReq } = useFormDataReq();

	const [viewParams, setParams] = useState({
		regView: false,
		regMsg: "",
	});

	const [games, setGames] = useState({
		list: null,
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

	const sendGame = async (formData) => {
		const req = await formDataReq(
			"/api/games/create-game",
			"POST",
			formData
		);
		console.log(req);
	};

	const getGames = async () => {
		const req = await request("/api/games/list", "GET");
		console.log(req);
		setGames({
			list: req.data,
		});
	};

	useEffect(() => {
		console.log("verify");
		props.verify();
		getGames();
	}, [props.auth]);
	
	return (
		<div>
			<Header
				toggle={showReg}
				auth={props.auth}
				user={props.user}
				logIn={logIn}
			/>
			<Registration view={viewParams} addUser={addUser} />
			{props.auth ? (
				<div className="profile-body">
					<div className="games-list-wrapper">
						<div className="list-toggle">
							<NavLink exact to="/profile" activeStyle={{color: "red"}}>My games</NavLink>
							<span> / </span> 
							<NavLink to="/profile/exchanges" activeStyle={{color: "red"}}>Exchange</NavLink>
						</div>
						<Switch>
							<Route path="/profile" exact>
								{games.list ? <GamesList list={games.list} /> : null}
							</Route>
							<Route path="/profile/exchanges" exact>
								{games.list ? <div>Exchanges</div> : null}
							</Route>
						</Switch>
					</div>
					<div className="creation-panel">
						<Cpanel sendGame={sendGame} />
					</div>
				</div>
			) : null}
		</div>
	);
};

export default Profile;
