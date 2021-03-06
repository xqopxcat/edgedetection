import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchImage, getImage, ROOT_URL } from '../actions';
import ImageItem from '../components/image_item';
import ImageDetector from './image_detector';
import Slider from 'react-slick';

class ImageList extends Component{
	constructor(props){
		super(props)
		this.state = { imgSrc: '', extension:'', cilentWidth:400, clientHeight:300 };
		this.next = this.next.bind(this)
    	this.previous = this.previous.bind(this)
	}
	  next() {
    this.slider.slickNext()
  }
  previous() {
    this.slider.slickPrev()
  }
	componentDidMount(){
		this.props.fetchImage();
	}
	onImgClick(id, extension){
		this.setState({imgSrc: `${id}`, extension:`${extension}`}, () => {
			var item = document.querySelector('.small-pic');
			this.setState({cilentWidth: item.clientWidth, clientHeight: item.clientHeight});
			this.props.getImage(id, extension, item.clientWidth*2, item.clientHeight*2);
		})
	}
	renderImages(){
		return _.map(this.props.images, (image) =>{
			return (
			<div className="list-group-item col-xs-4 text-xs-center" key={image.name}>
				<img onClick={() => {this.onImgClick(`${image.name}`, `${image.extension}`)}} width={128} height={128} style={{objectFit:'cover'}} src={`${ROOT_URL}/${image.name}${image.extension}`} />
			</div>)
		})	
	}
	render(){
		const imgSrc = this.state.imgSrc;
		const imgExt = this.state.extension;
		const cilentWidth = this.state.cilentWidth;
		const clientHeight = this.state.clientHeight;
		const settings = {
			initialSlide:3,
			dots: false,
			infinite: true,
			arrows:false,
			speed: 500,
			slidesToShow: 5,
			slidesToScroll: 1,
		};
		return(
			<div>
				<div style={{margin:'20px 0px',minHeight:'500px'}}>
					{imgSrc == "" ? <div className="col-xs-12 text-info">Click image for view</div> : 
					<ImageDetector smallImg={`${ROOT_URL}/${imgSrc}${imgExt}`} imgSrc={`${imgSrc}${imgExt}`}/>}
				</div>
				<div className="list-group col-xs-12">
					{this.renderImages().length == 0 ? <div></div> :
						<div>
				<Slider ref={c => this.slider = c } {...settings}>
					{this.renderImages()}
				</Slider>
				<div style={{textAlign: 'center'}}>
					<a href="javascript:void(0)" className="navBtn previous" onClick={this.previous}>&#8249;</a>
					<a href="javascript:void(0)" className="navBtn next" onClick={this.next}>&#8250;</a>
		        </div>
		        </div>
			}
				</div>
				
			</div>
		)
	}
}

function mapStateToProps(state){
	return { 
		images: state.images,
		getimage: state.getimage
	 };
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({ fetchImage, getImage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageList);