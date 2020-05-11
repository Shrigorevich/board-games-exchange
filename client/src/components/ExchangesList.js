import React from "react";
import ExchangeCard from "./ExchangeCard"
import {Switch, Route, Redirect} from "react-router-dom"

function ExchangesList(props) {

    console.log(props);
    
	return (
		<div className="ExchangesList">
			<Switch>
                <Route path="/profile/exchanges/for-me">
                    <div className="forMeList">
                        {props.forMeList.map((item, i) => (
                            <div key={i} className="new-exchange">
                                <ExchangeCard {...item.firstGame} />
                                <div className="exchange-offer-wrapper">
                                    <img className="img-exchange" src={require('./../images/exchange.png')} />
                                    {!item.status ? (
                                        <div className="offer-button">
                                            <button className="btn btn-success" onClick={() => (props.accept(item._id))}>Accept offer</button>
                                            <button className="btn btn-danger" onClick={() => (props.reject(item._id))}>Reject offer</button>
                                        </div>
                                    ) : (
                                        item.secondUser.status ? (
                                            <div className="offer-status">
                                                <span className="active-exchange">Active exchange!</span>
                                            </div>
                                        ) : (
                                            <div className="offer-status">
                                                <span className="rejected-exchange">Rejecter by you</span>
                                            </div>
                                        )
                                    )}
                                </div>
                                <ExchangeCard {...item.secondGame} />
                            </div>
                        ))}
                    </div>
                </Route>

                <Route path="/profile/exchanges/from-me">
                    <div className="fromMeList">
                        {props.fromMeList.map((item, i) => (
                            <div key={i} className="new-exchange">
                                <ExchangeCard {...item.secondGame} />
                                <div className="exchange-offer-wrapper">
                                    <img className="img-exchange" src={require('./../images/exchange.png')} />
                                    {!item.status ? (
                                        <div className="offer-status">
                                            <span className="waiting-answer">Waiting for an answer..</span>
                                        </div>
                                    ) : (
                                        item.secondUser.status ? (
                                            <div className="offer-status">
                                                <span className="active-exchange">Active exchange!</span>
                                            </div>
                                        ) : (
                                            <div className="offer-status">
                                                <span className="rejected-exchange">Rejecter by the user</span>
                                            </div>
                                        )
                                    )}
                                </div>
                                <ExchangeCard {...item.firstGame} />
                            </div>
                        ))}
                    </div>
                </Route>

                <Redirect exact from="/profile/exchanges" to="/profile/exchanges/from-me"/>
            </Switch>
		</div>
	);
}

export default ExchangesList;
