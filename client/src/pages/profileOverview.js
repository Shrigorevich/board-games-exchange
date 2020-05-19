import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Registration from "./../components/Registration";
import ProfileCard from "./../components/ProfileCard"
import { useHttp } from "./../hooks/httphook";
import { useFormDataReq } from "./../hooks/formDataReq";
import GamesList from "./../components/gamesList";

const ProfileOverview = (props) => {		
	
	const { request } = useHttp();
	const { formDataReq } = useFormDataReq();
	
	const [data, setData] = useState({
		games: null,
		user: null
	});

	const [form, setForm] = useState({
		rate: 0,
		text: ""
	})

	const leaveComment = async () => {
		if(props.auth){
			const req = await request('/api/users/leave-comment', "POST", {
				...form,
				to: data.user._id
			})
			setForm({
				rate: 0,
				text: ""
			})
		}else{
			alert("Please, Log in to leave a comment!")
		}
	}

	const getData = async () => {
		const req = await request(`/api/users/get-user/${props.match.params.username}`)
		
		if(req.status){
			setData(() => {						
				return {
					games: req.data.games,
					user: req.data.user,
					comments: req.data.comments
				}
			});
		}
	};

	const changeHandler = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value });
	}

	useEffect(() => {
		getData();
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
			<div className="profile-overview-body">
				<div className="about-user">
					{data.user ? <ProfileCard {...data.user} comments={data.comments} /> : null}
					<div className="feedback-form">
						<label>Rate: <span className="rate">{form.rate}</span></label>
						<input name="rate" value={form.rate} type="range" id="vol" min="0.0" max="5.0" step="0.5" onChange={changeHandler}/>
						<div className="textarea-wrapper">
							<textarea name="text" className="comment-textarea" value={form.text} onChange={changeHandler}/>
						</div>
						<button className="btn btn-success" onClick={leaveComment}>Send</button>
					</div>
				</div>
				{data.games ? <GamesList  list={data.games} />: null}
				<div className="comments-list">
					{data.comments ? (data.comments.length > 0 ? (	
						data.comments.map((item, i) => (
							<div key={i} className="comment">
								<div className="d-flex">
									<div className="avatar-mini">
										<img className="img-fluid" src={item.from.avatar}/>
									</div>
									<div className="comment-user">
										<span>{item.from.firstName}</span>
										<span>{item.from.lastName}</span>
									</div>
								</div>
								<div className="comment-text">
									<span className="mr-2">{item.rate} <i className="far fa-star rate"></i></span>
									<span>{item.text}</span>
								</div>
							</div>		
						))
					) : <h5>No comments yet</h5>) : null}
				</div>
			</div>
		</div>
	);
};

export default ProfileOverview;
