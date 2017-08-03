import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postImage, postImageByUrl } from '../actions';
import ImageCropper from '../components/image_cropper.js';

class ImageUploader extends Component{
	constructor(props) {
	  super(props);
	  this.state = {file: '', 
	  	imageString: '', 
	  	imagePreviewUrl: '../../public/images/default.jpg',
	  	selectedOption: 'uploadfile',
	  	term: ''
	  };
	  this.handleChange = this.handleChange.bind(this);
	  this.handleOptionChange = this.handleOptionChange.bind(this);
	  this.onInputChange = this.onInputChange.bind(this);
	}
	_handleSubmit(event) {
	  event.preventDefault();
	  if(this.state.selectedOption === 'uploadfile'){
	  	this.props.postImage(this.state.file, () => {
		  	this.props.history.push('/list');
		});
	  }
	  else{
	  	if(!this.state.file){
	  		var body = JSON.stringify({imageUrl: this.state.term});
		  	this.props.postImageByUrl(body, () => {
		  		this.props.history.push('/list');
			});
	  	}
	  	else{
	  		this.props.postImage(this.state.file, () => {
			  	this.props.history.push('/list');
			});
	  	}
	  }
	}
	_handleImageChange(event) {
		event.preventDefault();
		let reader = new FileReader();
		let file = event.target.files[0];
		reader.onloadend = () => {
		  this.setState({
		    file: file,
		    imagePreviewUrl: reader.result
		  });
		}
		reader.readAsDataURL(file)
	}
	handleChange(item){
		this.setState({imageString: item}, () => {
			var file = dataURLtoFile(this.state.imageString, Date.now() + ".png");
			this.setState({file:file});
		});
	}
	handleOptionChange(e){
		this.setState({selectedOption: e.target.value});
	}
	onInputChange(event){
		this.setState({ term: event.target.value});
	}
	imagePreview(){
		let {imagePreviewUrl, term, selectedOption} = this.state;
	    let $imagePreview = null;
	    if (imagePreviewUrl || term) {
	    	if(selectedOption === 'uploadfile'){
	    		return (
		    		<ImageCropper src={imagePreviewUrl} updateImage={this.handleChange}/>
		    	)
	    	}
	    	else{
	    		return (
		    		<ImageCropper src={term} updateImage={this.handleChange}/>
		    	)
	    	}
	    } else {
	    	return (
	    		<div>Loading...</div>
	    	)
	    }
	}
	render(){
		const selectedOption = this.state.selectedOption;
		const term = this.state.term;
		return(
			<div style={{backgroundColor: '#F2F7FF'}}>
		    	<form className="text-xs-center form-upload" onSubmit={(event)=>this._handleSubmit(event)}>
	                <label>
	                    {selectedOption == "uploadfile" ? <span className="btn btn-link" style={{margin: '20px 0'}}>
	                        Select the file & Preview<input type="file" style={{display:'none'}} onChange={(event)=>this._handleImageChange(event)} />
	                    </span> : <input
	                    	className="inputurl-bar"
							placeholder={`Input url`}
							value={term}
							onChange={this.onInputChange} 
						/>}
	                    <button className="btn btn-primary" 
		    		  type="submit" 
		    		  onClick={(event)=>this._handleSubmit(event)}>Upload Image</button>
                	</label>
	                <div className="radio radio-info">
	                <label style={{marginRight:20}}>
			        	<input type="radio" checked={this.state.selectedOption === 'uploadfile'} onChange={this.handleOptionChange}  value="uploadfile" />
			            By File
			        </label>
	                <label>
			        	<input type="radio" checked={this.state.selectedOption === 'uploadurl'} onChange={this.handleOptionChange} value="uploadurl" />
			            By Url
			        </label>
			        </div>
		    	</form>
		    	<div className="imgPreview text-xs-center">
		    	  {this.imagePreview()}
		    	</div>

		    </div>
		)
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({postImage, postImageByUrl}, dispatch);
}

export default connect(null, mapDispatchToProps)(ImageUploader);

function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}