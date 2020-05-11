import React, { useState } from "react";
import { Link } from "react-router-dom";

function ExchangeCard(props) {
        
    return (
        <div className="exchange-card">
            <div className="game-card-head">
                <img className="img" src={`${props.picture}`} alt={`${props.name}`}/>
            </div>
            <div className="game-card-body">
                <p>Game: {props.name}</p>
                <p>Price: {props.price}</p>
                <p>{props.username}</p>
            </div>
        </div>
    );

}

export default ExchangeCard;
