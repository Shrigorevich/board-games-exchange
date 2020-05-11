import React, { useState } from "react";
import { Link } from "react-router-dom";

function GameCard(props) {
    
	if(props.user){
        return (
            <div className="game-card">
                <div className="game-card-head">
                    <img className="img" src={`${props.picture}`} alt={`${props.name}`}/>
                </div>
                <div className="game-card-body">
                    <p>Game: {props.name}</p>
                    <p>Price: {props.price}</p>
                    <p>{props.username}</p>
                    {props.user.username !== props.username ?
                        <p><Link to={{
                            pathname: `/exchange:${props.name}`,
                            game: {
                                ...props
                            }}
                        }>To exchange ></Link></p> : <p className="my-game-status">It is your game</p>
                    }
                </div>
            </div>
        );
    }else if(props.setSide){
        return (
            <div className="game-card">
                <div className="game-card-head">
                    <img className="img" src={`${props.picture}`} alt={`${props.name}`}/>
                </div>
                <div className="game-card-body">
                    <p>Game: {props.name}</p>
                    <p>Price: {props.price}</p>
                    <p>{props.username}</p>
                    <button className="btn btn-success" onClick={() => props.setSide({
                        _id: props._id,
                        name: props.name,
                        picture: props.picture,
                        price: props.price,
                        username: props.username
                    })}>Set</button>
                </div>
            </div>
        );
    }else{
        return (
            <div className="game-card">
                <div className="game-card-head">
                    <img className="img" src={`${props.picture}`} alt={`${props.name}`}/>
                </div>
                <div className="game-card-body">
                    <p>Game: {props.name}</p>
                    <p>Price: {props.price}</p>
                    <p>{props.username}</p>
                    <p><Link to={{
                        pathname: `/exchange:${props.name}`,
                        game: {
                            ...props
                        }}
                    }>To exchange ></Link></p>
                </div>
            </div>
        );
    }
}

export default GameCard;
