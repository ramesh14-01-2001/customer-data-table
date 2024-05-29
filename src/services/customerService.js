import axios from "axios";

export const getCustomerList = () => axios.get("https://customer-data-table.free.beeceptor.com/customer/list");