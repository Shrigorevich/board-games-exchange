import React, { useState } from "react";
import { Link } from "react-router-dom";

function MainGameCard(props) {
	return (
		<div className="game-card">
			<div className="game-card-head">
				<img
					className="img"
					src={`${props.picture}`}
					alt={`${props.name}`}
				/>
			</div>
			<div className="game-card-body">
				<p>Game: {props.name}</p>
				<p>Price: {props.price}</p>
				<p>
					<Link exact="true" to={`/user/${props.username}`}>{props.username}</Link>
				</p>
				{props.username !== props.loggedUser ? (
					<p>
					<Link className="to-exchange"
						to={{
							pathname: `/exchange/${props.name}`,
							game: {
								...props,
							},
						}}
					>To exchange ></Link>
					</p>
				) : null}
			</div>
		</div>
	);
}

export default MainGameCard;
