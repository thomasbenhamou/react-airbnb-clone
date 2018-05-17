import React from 'react';
import "./flat.css";

// a flat component to render a single flat 

class Flat extends React.Component {
	
	// function triggered by the onClick event in the HTML code below
	handleClick = () => {
		//Calling the parent method selectFlat which selects the current flat
		this.props.selectFlat(this.props.flat);
	}

	// the react rendering code
	render() {
		// chaining the title together using data which flowed from the JSON to the flat "state" (see app.js)
 		const title = this.props.flat.price + this.props.flat.priceCurrency + "-" + this.props.flat.name;
 		// retrieving the image url from the JSON and putting it in a string
		const style = {
			backgroundImage: `url('${this.props.flat.imageUrl}')`
		};

		// the HTML code to be rendered
		return (
			<div className="flat" onClick={this.handleClick}>
				{/* using the style const*/}
				<div className="flat-picture" style={style}>
				</div>
				{/* using the title const*/}
				<div className="flat-title">
				{title}
				</div>
			</div>
			);
	}
}

// exporting the flat component so it can be used by the App
export default Flat;