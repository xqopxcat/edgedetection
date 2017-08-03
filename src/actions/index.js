import axios from 'axios';

export const ROOT_URL = 'http://localhost:3000';

export const FETCH_IMAGE = 'FETCH_IMAGE';
export const POST_IMAGE = 'POST_IMAGE';
export const POST_IMAGE_URL = 'POST_IMAGE_URL';
export const GET_IMAGE = 'GET_IMAGE';
export const GET_EDGE_URL = 'GET_EDGE_URL';

export function fetchImage(){
	const request = axios.get(`${ROOT_URL}/api/getList`);
	return {
		type: FETCH_IMAGE,
		payload: request
	};
}

export function postImage(image, callback){
	var formData = new FormData();
	formData.append("image", image);
	const request = axios.post(`${ROOT_URL}/api/uploadfile`, formData).then(() => callback());
	return {
		type: POST_IMAGE,
		payload: request
	};
}

export function postImageByUrl(imageurl, callback){
	const request = axios.post(`${ROOT_URL}/api/uploadurl`, imageurl, {
 		headers: {
 	    	'Content-Type': 'application/json'
 	    }
 	}).then(() => callback());
	return {
		type: POST_IMAGE_URL,
		payload: request
	};
}

export function getImage(id, format, width, height){
	const request = axios.get(`${ROOT_URL}/api/getimage/${id}?format=${format}&width=${width}&height=${height}`);
	return {
		type: GET_IMAGE,
		payload: request
	};
}

export function getEdgeImage(id, body, callback){
	const request = axios.post(`${ROOT_URL}/api/getdetection/${id}`, body, {
 		headers: {
 	    	'Content-Type': 'application/json'
 	    }
 	}).then(() => callback());
	return {
		type: GET_EDGE_URL,
		payload: request
	};
}