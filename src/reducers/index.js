import { combineReducers } from 'redux';
import ImageReducer from './reducer_images';
import GetImageReducer from './reducer_getimage';


const rootReducer = combineReducers({
		images: ImageReducer,
		getimage: GetImageReducer
});

export default rootReducer;
