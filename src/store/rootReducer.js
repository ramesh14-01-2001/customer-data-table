import { combineReducers } from 'redux';
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import customerDataReducer from "./CustomerData/customerData.reducer";

const rootReducer = combineReducers({
    customerData: customerDataReducer
});

const config = {
    key: 'root',
    storage,
};

const reducer = persistReducer(config, rootReducer);

export default reducer;