import React, { useState } from "react";
import { Link } from "react-router-dom";

function GamesList(props) {
	return (
		<div className="games-list">
			{props.list.map((item, i) => (
                <div className="game-card" key={i}>
                    <div className="game-card-head">
                        <img className="img" src={`${item.picture}`} alt={`${item.name}`}/>
                    </div>
                    <div className="game-card-body">
                        <p>Game: {item.name}</p>
                        <p>Price: {item.price}</p>
                        <p>{item.username}</p>
                    </div>
                </div>
            ))}
		</div>
	);
}

export default GamesList;
