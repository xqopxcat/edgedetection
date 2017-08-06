import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getEdgeImage, ROOT_URL } from '../actions';

class ImageDetector extends Component {
	constructor(props){
		super(props)
		this.state = {image: this.props.smallImg, low:50, high:150}
	}
	componentDidUpdate(prevProps) {
		if(prevProps.smallImg != this.props.smallImg){
			this.setState({image: this.props.smallImg});
		}
	}
	handleChange(event, id) {
		let value = event.target.value
		switch(id){
			case "low":
				if(parseInt(this.state.high) > parseInt(value)){
		            this.setState({low:value});
		        }
				break;
			case "high":
				if(parseInt(this.state.low) < parseInt(value)){
					this.setState({high: value});
				}
				break;
		}
	}
	handleSubmit(event, id, low, high){
		event.preventDefault();
		var body = JSON.stringify({low: low, high: high});
		this.props.getEdgeImage(id, body, () => {
			this.setState({image: `${ROOT_URL}/${low}-${high}-${id}`});
		})
	}
	resetImage(){
		this.setState({image: this.props.smallImg});
	}
	render(){
		const image = this.state.image;
		const low = this.state.low;
		const high = this.state.high;
		return(
			<div style={{marginTop:20}}>
				<div className="col-xs-6 small-pic text-xs-center ">
					<img src={`${image}`} />
				</div>
				<div className="col-xs-6">
					<div>
						<input type="range" key="low" min="0" max="250" value={low} step="1" onChange={(event)=>this.handleChange(event, "low")}/>
					</div>
					<div>
						<label>Low thereshold:{low}</label>
					</div>
					<div>
						<input type="range" key="high" min="0" max="250" value={high} step="1" onChange={(event)=>this.handleChange(event, "high")}/>
					</div>
					<div>
						<label>High thereshold:{high}</label>
					</div>
					<div>
						<button className="btn btn-primary" style={{margin:'20px 0'}}
				    		type="submit" 
				    		onClick={()=>this.resetImage()}>Reset Image</button>
					</div>
					<div>
						<button className="btn btn-primary" style={{margin:'20px 0'}} 
				    		type="submit" 
				    		onClick={(event)=>this.handleSubmit(event, this.props.imgSrc, low, high)}>Edge detection</button>
					</div>
		    	</div>
			</div>

		)
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({ getEdgeImage }, dispatch);
}

export default connect(null, mapDispatchToProps)(ImageDetector);