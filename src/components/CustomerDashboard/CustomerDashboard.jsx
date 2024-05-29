import React from "react";
import styles from "./CustomerDashboard.module.scss";
import CustomerTable from "../CustomerTable/CustomerTable";

const CustomerDashboard = () => {

    return (
        <div style={{width: '90%', marginLeft:'auto', marginRight: 'auto'}}>
            <CustomerTable />
        </div>
    );
}

export default CustomerDashboard;