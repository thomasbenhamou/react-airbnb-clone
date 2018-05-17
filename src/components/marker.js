import React from 'react';
import "./marker.css";

// creating a marker component just to style the selected flat's marker on the map


class Marker extends React.Component {

	render (){
		// adding the selected class to the flat which has been selected
		// rendering the HTML with the selected CSS styling
		// the selectFlat method in App is triggered on click and set the state selectedFlat with the flat which is clicked on
		let classes = "marker";
		if (this.props.selected){
			classes += " selected";
		}
		return (
			<div className={classes}>
			{this.props.text}
			</div>
		)
	}
}

export default Marker;