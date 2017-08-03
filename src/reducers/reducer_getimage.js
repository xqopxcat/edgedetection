import _ from 'lodash';
import { GET_IMAGE, GET_EDGE_IMAGE }  from '../actions';

export default function(state = [], action){
	switch(action.type){
		case GET_IMAGE:
			return action.payload.data;
		case GET_EDGE_IMAGE:
			return action.payload.data;
		default:
			return state;
	}
	return state;
}