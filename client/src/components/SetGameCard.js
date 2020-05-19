import React from "react";

function SetGameCard(props) {

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
                <p>{props.username}</p>
                <button
                    className="btn btn-success"
                    onClick={() =>
                        props.setSide({
                            _id: props._id,
                            name: props.name,
                            picture: props.picture,
                            price: props.price,
                            username: props.username,
                        })
                    }
                >
                    Set
                </button>
            </div>
        </div>
    );
}

export default SetGameCard;
