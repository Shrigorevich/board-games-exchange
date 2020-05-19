import React from "react";

function Gag(props) {
	return (
		<div className="gag">
			{props.side ? (
				<h5>
                Choose the game you offer in exchange</h5>
			) : (
				<h5>Choose the game you want to trade</h5>
			)}
		</div>
	);
}

export default Gag;
