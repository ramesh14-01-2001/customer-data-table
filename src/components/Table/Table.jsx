import React, { useEffect, useState } from "react";
import Input from "../Input/Input";
import { ReactComponent as ChevronUp } from "../../assets/icons/ChevronUp.svg";
import { ReactComponent as ChevronDown } from "../../assets/icons/ChevronDown.svg";
import { ReactComponent as SearchSVG } from "../../assets/icons/SearchIcon.svg";
import _ from "lodash";
import Pagination from "../Pagination/Pagination";
import { columns, headers } from "../../utils/customerTableUtils";
import { CUSTOMER_INPUT, INPUT, SEARCH_CUSTOMER } from "../../constants/constants";
import styles from './Table.module.scss';

const Table = ({searchText, setSearchText, tableData}) => {
    const [isSorting, setIsSorting] = useState([]);
    const [filteredTableData, setFilteredTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);

    useEffect(() => {
        setIsSorting([...headers.map(header => false)]);
        setFilteredTableData([...tableData]);
    }, [tableData])

    useEffect(() => {
        const tempRecords = tableData?.filter(customer => customer?.name?.toLowerCase()?.includes(searchText?.toLowerCase()));
        const filteredRecords = [];
        tempRecords.forEach((tempRecord, index) => {
            if(index+1 > (currentPage-1)*recordsPerPage && index < currentPage*recordsPerPage) {
                filteredRecords.push(tempRecord);
            }
        })
        setFilteredTableData([...filteredRecords]);
    }, [currentPage, searchText, recordsPerPage, tableData])

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

    const totalRecords = tableData?.filter(customer => customer?.name?.toLowerCase()?.includes(searchText?.toLowerCase()))?.length;

    const handleOnSetSearchText = (event) => {
        setSearchText(event.target.value);
        setCurrentPage(1);
    }

    return (
        <div className={styles.tableWrapper}>
            <div className={styles.tableHeader}>
                <h2>Customer Table</h2>
                    <Input
                        type={INPUT}
                        id={CUSTOMER_INPUT}
                        value={searchText}
                        placeholder={SEARCH_CUSTOMER}
                        onChange={handleOnSetSearchText}
                        leftBlock={<SearchSVG/>}
                    />
            </div>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                    {headers.map((header, headerIndex) => (
                        <th key={headerIndex} className={styles.header}>
                            {header}
                            <span className={styles.tableHeaderItem}>{isSorting[headerIndex] ? <ChevronDown onClick={() => handleOnSorting(headerIndex)}/> : <ChevronUp onClick={() => handleOnSorting(headerIndex)}/>}</span>
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
            {totalRecords > 0 && <div className={styles.paginationContainer}>
                <Pagination totalRecords={totalRecords} currentPage={currentPage} recordsPerPage={recordsPerPage} setCurrentPage={setCurrentPage} setRecordsPerPage={setRecordsPerPage}/>
            </div> }
        </div>
    );
}

export default Table;