import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Registration from "./../components/Registration";
import Cpanel from "./../components/сreation-panel";
import { useHttp } from "./../hooks/httphook";
import { useFormDataReq } from "./../hooks/formDataReq";
import GamesList from "./../components/gamesList";
import ExchangesList from "./../components/ExchangesList";
import ProfileCard from "./../components/ProfileCard"
import {NavLink, Switch, Route} from "react-router-dom";

const Profile = (props) => {
	const { request } = useHttp();
	const { formDataReq } = useFormDataReq();

	const [data, setData] = useState({
		games: null,
		exchanges: null

	});

	const sendGame = async (formData) => {
		const req = await formDataReq(
			"/api/games/create-game",
			"POST",
			formData
		);
		document.location.reload()
	};

	const setAvatar = async (formData) => {
		const req = await formDataReq(
			"/api/users/set-avatar",
			"POST",
			formData
		);
		document.location.reload()
	}

	const getData = async () => {
		const games = await request("/api/games/list", "GET");
		const exchanges = await request("/api/exchanges/list", "GET");
		const comments = await request(`/api/users/get-user/${props.user.username}`)
		
		setData({
			games: games.data,
			exchanges: exchanges.data,
			comments: comments.data.comments
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
		if(props.auth){
			getData();
		}
	}, [props.auth]);
	
	return (
		<div>
			<Header
				toggle={props.showReg}
				auth={props.auth}
				user={props.user}
				logIn={props.logIn}
				logOut={props.logOut}
			/>
			<Registration view={props.viewParams} addUser={props.addUser} />
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
								{data.games ? <GamesList myList={true} list={data.games} /> : null}
							</Route>
							<Route path="/profile/exchanges/">
								{data.exchanges ? <ExchangesList accept={accept} reject={reject} fromMeList={data.exchanges.fromMeList} forMeList={data.exchanges.forMeList}/> : null}
							</Route>
						</Switch>
					</div>
					<div className="right-side">
						<div className="profile-card-wrapper">
							{data.comments ? <ProfileCard {...props.user} myProfile={true} comments={data.comments} set={setAvatar}/> : null}
						</div>
						<div className="creation-panel">
							<Cpanel sendGame={sendGame} />
						</div>
					</div>
				</div>
			) : <img className="img-fluid" src={require('./../images/wampus-bg.png')} alt="wampus" />}
		</div>
	);
};

export default Profile;
