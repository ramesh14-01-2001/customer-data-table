import { all } from "redux-saga/effects";
import { customerDataWatcher } from "./CustomerData/customerData.saga";

export const rootSaga = function* rootSaga() {
    yield all([
        customerDataWatcher()
    ])
}