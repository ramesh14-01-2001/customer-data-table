import React, {useEffect, useState} from "react";
import { customerData } from "../../utils/customerData";
import styles from "./CustomerTable.module.scss";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { ReactComponent as ChevronUp } from "../../assets/icons/ChevronUp.svg";
import { ReactComponent as ChevronDown } from "../../assets/icons/ChevronDown.svg";
import _ from 'lodash';
import Pagination from "../Pagination/Pagination";

const columns = [
    'name',
    'date',
    'status',
    'amount'
];

const headers = [
    'Name',
    'Date',
    'Status',
    'Amount'
];

const CustomerTable = () => {
    const [searchText, setSearchText] = useState('');
    const [isSorting, setIsSorting] = useState([]);
    const [filteredTableData, setFilteredTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);

    useEffect(() => {
        setIsSorting([...headers.map(header => false)]);
        setFilteredTableData([...customerData]);
    }, [])

    useEffect(() => {
        const tempRecords = customerData?.filter(customer => customer?.name?.toLowerCase()?.includes(searchText?.toLowerCase()));
        const filteredRecords = [];
        tempRecords.forEach((tempRecord, index) => {
            if(index+1 > (currentPage-1)*10 && index < currentPage*10) {
                filteredRecords.push(tempRecord);
            }
        })
        setFilteredTableData([...filteredRecords]);
    }, [currentPage])

    useEffect(() => {

    })

    const searchCustomer = () => {
        setFilteredTableData(customerData.filter(customer => customer?.name?.toLowerCase()?.includes(searchText?.toLowerCase())));
    }

    const handleOnSorting = (headerIndex) => {
        const sortableArray = [...isSorting];
        sortableArray.forEach((sort,index) => {
            if(index === headerIndex){
                sortableArray[index] = !sortableArray[headerIndex];
            } else {
                sortableArray[index] = false;
            }
        })
        setIsSorting([...sortableArray]);

        if(isSorting[headerIndex]) {
            setFilteredTableData([..._.orderBy([...filteredTableData], columns[headerIndex], 'desc')]);
        } else {
            setFilteredTableData([..._.orderBy([...filteredTableData], columns[headerIndex], 'asc')]);
        }
    }

    return (
        <div style={{height:'100vh'}}>
            <div style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between', alignItems: 'center', height:'10vh'}}>
                <h2>Customer Table</h2>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center', gap:'3px'}}>
                    <Input
                        type='input'
                        id='customerInput'
                        value={searchText}
                        placeholder='Search Customer'
                        onChange={(event) => setSearchText(event.target.value)}
                    />
                    <Button onClick={searchCustomer}>Search</Button>
                </div>
            </div>
            <div style={{height:'80vh', overflowY:'scroll'}}>
                <table className={styles.table}>
                    <thead>
                    {headers.map((header, headerIndex) => (
                        <th key={headerIndex} className={styles.header}>
                            {header}
                            <span style={{marginLeft:'5px', cursor: 'pointer'}}>{isSorting[headerIndex] ? <ChevronDown onClick={() => handleOnSorting(headerIndex)}/> : <ChevronUp onClick={() => handleOnSorting(headerIndex)}/>}</span>
                        </th>
                    ))}
                    </thead>
                    <tbody>
                    {filteredTableData?.map((row, rowIndex) => (
                        <React.Fragment key={rowIndex}>
                            <tr key={rowIndex} className={styles.row}>
                                {columns?.map((column, columnIndex) => {
                                    return <td key={columnIndex} className={styles.cell}>{row[`${column}`]}</td>;
                                })}
                            </tr>
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            </div>
            {customerData?.length > 0 && <div style={{height:'10vh',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <Pagination totalRecords={customerData?.filter(customer => customer?.name?.toLowerCase()?.includes(searchText?.toLowerCase()))?.length} currentPage={currentPage} recordsPerPage={recordsPerPage} setCurrentPage={setCurrentPage} setRecordsPerPage={setRecordsPerPage}/>
            </div> }
        </div>
    );
}

export default CustomerTable;