import React, { Component } from 'react';

class ImageItem extends Component {
	constructor(props){
		super(props)
		this.state = { display: 'none', ptX:0, ptY:0, moveX:0, moveY:0 };
		this.handleMouseOver = this.handleMouseOver.bind(this);
		this.handleMouseOut = this.handleMouseOut.bind(this);
		this.handleMouseMove= this.handleMouseMove.bind(this);
	}
	handleMouseOver(){
		this.setState({display:'block'});
	}
	handleMouseOut(){
		this.setState({display:'none'});
	}
	handleMouseMove(event){
		const smallPic = document.querySelector(".small-pic");
		const selectFrame = document.querySelector(".select-frame");
		const large = document.querySelector(".large-pic");
		const largePic = document.querySelector(".large-pic img");
		var x = event.clientX - smallPic.offsetLeft - selectFrame.offsetWidth /2;
		var y = event.clientY - smallPic.offsetTop - selectFrame.offsetHeight /2;
		var maxX = smallPic.clientWidth - selectFrame.offsetWidth;
        var maxY = smallPic.clientHeight - selectFrame.offsetHeight;
        if(x<=0){
            x=0;
        }
        else if(x>=maxX){
            x=maxX;
        }
        if(y<=0){
            y=0;
        }else if(y>=maxY){
            y=maxY;
        }
        var moveX = x / maxX;
        var moveY = y / maxY;
        var largePicX = moveX * ( large.clientWidth - largePic.offsetWidth);
        var largePicY = moveY * ( large.clientHeight - largePic.offsetHeight);
        this.setState({ ptX:x, ptY:y, moveX: largePicX, moveY: largePicY})
	}
	render(){
		const display = this.state.display;
		const ptX = this.state.ptX;
		const ptY = this.state.ptY;
		const moveX = this.state.moveX;
		const moveY = this.state.moveY;
		return(
			<div>
				<div className="small-pic" onMouseMove={this.handleMouseMove} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} >
					<img src={`${this.props.smallImg}`} />
					<div className="select-frame" style={{display:`${display}`, left:`${ptX}`, top:`${ptY}`}}></div>
				</div>
				 <div className="large-pic" style={{display:`${display}`, width:`${this.props.clientWidth}px`, height: `${this.props.clientHeight}px`}}><img style={{left:`${moveX}`, top:`${moveY}`}} src={`${this.props.largeImg}`} /></div>
			</div>

		)
	}
}

export default ImageItem;