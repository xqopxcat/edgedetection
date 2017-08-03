import _ from 'lodash';
import { FETCH_IMAGE, POST_IMAGE, POST_IMAGE_URL }  from '../actions';

export default function(state = [], action){
	switch(action.type){
		case FETCH_IMAGE:
			return _.mapKeys(action.payload.data, 'name');
		case POST_IMAGE:
			return _.mapKeys(action.payload, 'filename');
		case POST_IMAGE_URL:
			return _.mapKeys(action.payload, 'filename');
		default:
		return state;
	}
	return state;
}