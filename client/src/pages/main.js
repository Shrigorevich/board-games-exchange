import React, { useState, useEffect } from "react";
import Header from "./../components/Header";
import Registration from "./../components/Registration";
import { useHttp } from "./../hooks/httphook";
import GameList from "./../components/gamesList";

const Main = (props) => {
	const { request } = useHttp();

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

	const logOut = () => {
        console.log('log out', props.user._id);
        document.cookie = `token=${props.user._id}; max-age=0`;
        props.verify()
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
				props.verify();
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

	const getGames = async () => {
		const req = await request("/api/games/full-list", "GET");
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
				logOut={logOut}
			/>
			<Registration view={viewParams} addUser={addUser} />
			<div className="main-body">
				{games.list ? <GameList list={games.list} user={props.user}/> : null}
			</div>
		</div>
	);
};

export default Main;
