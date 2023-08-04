import {configureStore} from 'redux';  
import rootReducer from '../reducers/';  
/*Create a function called makeStore */
export default function makeStore() {  
  return configureStore(rootReducer);
}
