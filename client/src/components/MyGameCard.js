import React, { useState } from "react";
import { Link } from "react-router-dom";

function MyGameCard(props) {
	
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
            </div>
        </div>
    );
}

export default MyGameCard;
