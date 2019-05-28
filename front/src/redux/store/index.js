import{createStore,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import reducers from "../reducers";

const logger = store => next => action=>{
    console.log("prev state:",store.getState());
    console.log("dispatching",action);
    next(action);
    console.log("next state",store.getState());
}

const store = createStore(reducers,applyMiddleware(thunk,logger));
export default store;