import { useSelector } from 'react-redux';

export const useCustomerDataSelectors = () => useSelector(state => state.customerData);