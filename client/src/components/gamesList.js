import React, { useState } from "react";
import { Link } from "react-router-dom";
import MainGameCard from "./MainGameCard"
import MyGameCard from "./MyGameCard"
import SetGameCard from "./SetGameCard"

function GamesList(props) {

    if(props.setSide){
        return (
            <div className="games-list">      
                {props.list.map((item, i) => (
                    <SetGameCard key={i} {...item} setSide={props.setSide} />
                ))}
            </div>
        );
    }else if(props.myList){
        return (
            <div className="games-list">      
                {props.list.map((item, i) => (
                    <MyGameCard key={i} {...item} />
                ))}
            </div>
        );
    }else{
        return (
            <div className="games-list">      
                {props.list.map((item, i) => (
                    <MainGameCard key={i} {...item} loggedUser={props.loggedUser ? props.loggedUser : null} />
                ))}
            </div>
        );
    }
        
    
    
}

export default GamesList;
