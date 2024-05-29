import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    customerData: [],
    status: 'INITIAL'
}

const customerSlice = createSlice({
    name: 'customerData',
    initialState,
    reducers: {
        fetchCustomerDataAction(state) {
            state.customerData = initialState.customerData;
            state.status = 'PROGRESS'
        },
        fetchCustomerDataSuccessAction(state, action) {
            state.customerData = action.payload;
            state.status = 'SUCCESS'
        },
        fetchCustomerDataFailedAction(state) {
            state.customerData = initialState.customerData;
            state.status = 'FAILED'
        },
        resetCustomerDataAction(state) {
            state.customerData = initialState.customerData;
            state.status = initialState.status
        }
    }
});

export const { fetchCustomerDataAction, fetchCustomerDataSuccessAction, fetchCustomerDataFailedAction, resetCustomerDataAction } = customerSlice.actions;
export default customerSlice.reducer;