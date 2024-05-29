import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchCustomerDataAction} from "./customerData.reducer";

export const useCustomerDataActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators({
        fetchCustomerDataAction
    }, dispatch);
};