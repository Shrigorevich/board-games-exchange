import React, { useState } from "react";
import { Link } from "react-router-dom";
import GameCard from "./GameCard"

function GamesList(props) {

    if(props.setSide){
        return (
            <div className="games-list">      
                {props.list.map((item, i) => (
                    <GameCard key={i} {...item} setSide={props.setSide} />
                ))}
            </div>
        );
    }
        
    return (
        <div className="games-list">      
            {props.list.map((item, i) => (
                <GameCard key={i} {...item} user={props.user} />
            ))}
        </div>
    );
    
}

export default GamesList;
