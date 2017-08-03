import React, { Component } from 'react';
import AvatarEditor from 'react-avatar-editor'
class ImageCropper extends Component{
	constructor(props) {
	  super(props);
	  this.state ={dataURL: this.props.src, rotate: 0}
	  this.onSliderChange = this.onSliderChange.bind(this);
	}
	componentDidUpdate(prevProps, prevState) {
		if(this.props.src != prevProps.src){
			this.setState({dataURL: this.props.src});
		}
	}
	onSliderChange(event){
		this.setState({rotate:parseInt(event.target.value)})
	}
	onClickSave(){
	  if (this.editor) {
	    const canvasScaled = this.editor.getImageScaledToCanvas();
	    var dataURL = canvasScaled.toDataURL();
	    this.setState({dataURL: dataURL, rotate:0}, () => {
	    	this.props.updateImage(this.state.dataURL);
	    });
	  }
	}
	setEditorRef = (editor) => this.editor = editor
	render(){
		const rotate = this.state.rotate;
		return(
			<div>
				<div>
					<AvatarEditor
			        image={this.state.dataURL}
			        ref={this.setEditorRef}
			        width={500}
			        height={500}
			        border={50}
			        crossOrigin="anonymous"
			        color={[200, 200, 200, 0.6]} // RGBA 
			        scale={1.3}
			        rotate={rotate}
			      />
				</div>
				<div style={{margin:'20px 0'}}>
					<span>Rotate:</span>
					<input type="range" min="0" max="360" value={rotate} step="1" onChange={this.onSliderChange} />
				</div>
				<button className="btn btn-success" style={{marginBottom:'20px'}}
		    		  onClick={()=>this.onClickSave()}>Get New Image
		    	</button>
			</div>		    	
		)
	}
}

export default ImageCropper;