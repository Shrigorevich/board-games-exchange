import React, { useState, useEffect } from "react";
import Header from "./../components/Header";
import Registration from "./../components/Registration";
import { useHttp } from "./../hooks/httphook";
import GameList from "./../components/gamesList";

const Main = (props) => {
	const { request } = useHttp();

	const [games, setGames] = useState({
		list: null,
	});

	const [form, setForm] = useState({
		str: ""
	});

	const [show, setShow] = useState({
		state: false
	})

	const getGames = async () => {
		const req = await request("/api/games/full-list", "GET");
		setGames({
			list: req.data,
		});
	};

	const changeHandler = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	const search = async () => {
		const req = await request(`/api/games/search/${form.str}`)
		setGames({
			list: req.data,
		});
	}

	const searchToggle = () => {		
		setShow(show => {
			return {
				state: !show.state
			}
		})
	}

	useEffect(() => {
		getGames();
	}, [props.auth]);

	return (
		<div className="main">
			<Header
				toggle={props.showReg}
				auth={props.auth}
				user={props.user}
				logIn={props.logIn}
				logOut={props.logOut}
				search={searchToggle}
			/>
			<Registration
				view={props.viewParams}
				addUser={props.addUser}
				toggle={props.showReg}
			/>
			<div className="main-body">
				<div className={show.state ? 'form-search-visible' : 'form-search-hidden'}>
					<input value={form.str} onChange={changeHandler} name="str" className="input-search mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
					<button className="btn btn-outline-success my-2 my-sm-0" onClick={search}>Search</button>
				</div>
				{games.list ? (
					<GameList
						list={games.list}
						loggedUser={props.user ? props.user.username : null}
					/>
				) : null}
			</div>
		</div>
	);
};

export default Main;
