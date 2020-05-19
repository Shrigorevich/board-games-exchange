import React, { useState, useEffect } from "react";
import Header from "./../components/Header";
import Registration from "./../components/Registration";
import { useHttp } from "./../hooks/httphook";
import ExchangeCard from "./../components/ExchangeCard";
import GamesList from "./../components/gamesList";
import Gag from "./../components/Gag"
import {useHistory} from "react-router-dom"


const Exchange = (props) => {
    
    const history = useHistory()
 
    const [exchange, setExchange] = useState({
        mySide: null,
        partnerSide: props.location ? props.location.game : null
    })
    
    const { request } = useHttp();

    const [games, setGames] = useState({
        list: null,
        my: null
    })
    
    const getGames = async () => {
		const req = await request("/api/games/full-list", "GET");
		setGames({
            list: req.data,
            my: req.data.filter((item, i) => item.userid === props.user._id)
		});
    };
    
    const setSide = (game) => {
        setExchange((exchange) => {
            return {
                ...exchange,
                mySide: game
            }
        })
    }

    const offer = async () => {     
        await request("/api/exchanges/new-exchange", "POST", {
            firstGameId: exchange.mySide._id,
            secondGameId: exchange.partnerSide._id,
            initiator: props.user._id,
            partner: exchange.partnerSide.userid
        });
        history.push('/profile/exchanges/from-me')
    }


    useEffect(() => {
        if(props.auth){
            getGames()
        }
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
            {props.auth ? (
                <div className="exchange-body">
                    <div className="new-exchange">
                        {exchange.partnerSide ? (
                            <ExchangeCard {...exchange.partnerSide} />
                        ) : <Gag side={false}/>}
                        <div className="exchange-offer-wrapper">
                            <img className="img-exchange" src={require('./../images/exchange.png')} />
                            {exchange.partnerSide && exchange.mySide ? (
                                <div className="offer-button">
                                    <button className="btn btn-success" onClick={offer}>Send offer</button>
                                </div>
                            ) : null}
                        </div>
                        {exchange.mySide ? (
                            <ExchangeCard {...exchange.mySide} />
                        ) : <Gag side={true}/>}
                    </div>
                    {games.my ? (
                        <GamesList list={games.my} setSide={setSide} />
                    ) : null}
                </div>
            ) : (
                <img className="img-fluid" src={require('./../images/wampus-bg.png')} alt="wampus" />
            )}
        </div>
    );

}
export default Exchange;
