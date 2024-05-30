import React, {useEffect, useState} from "react";
import Table from "../Table/Table";
import { customerData } from "../../utils/customerData";
// import {useCustomerDataActions} from "../../store/CustomerData/useCustomerDataActions";
// import {useCustomerDataSelectors} from "../../store/CustomerData/useCustomerDataSelectors";

const CustomerDashboard = () => {
    const [searchText, setSearchText] = useState('');
    // const {fetchCustomerDataAction} = useCustomerDataActions();
    // const {customerData} = useCustomerDataSelectors();

    useEffect(() => {
        // fetchCustomerDataAction();
    }, [])

    // useEffect(() => {
    //     console.log('redux customer Data =>', customerData);
    // }, [customerData])

    return (
        <Table searchText={searchText} setSearchText={setSearchText} tableData={customerData}/>
    );
}

export default CustomerDashboard;