import { all, takeLatest, call, put } from 'redux-saga/effects';
import {getCustomerList} from "../../services/customerService";
import {
    fetchCustomerDataAction,
    fetchCustomerDataFailedAction,
    fetchCustomerDataSuccessAction
} from "./customerData.reducer";

function* getCustomerData({ payload }) {
    try {
        const customerDataResponse = yield call(
            () => getCustomerList(),
            payload
        );
        yield put(
            fetchCustomerDataSuccessAction(customerDataResponse.data)
        )
    } catch (error) {
        fetchCustomerDataFailedAction();
    }
}

export function* customerDataWatcher() {
    yield all([
        takeLatest(fetchCustomerDataAction, getCustomerData),
    ]);
}