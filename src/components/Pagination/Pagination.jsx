import React, { useEffect, useState } from 'react';
import Button from '../PaginationButton/PaginationButton';
import { ReactComponent as ChevronLeft } from '../../assets/icons/ChevronLeft.svg';
import { ReactComponent as ChevronRight } from '../../assets/icons/ChevronRight.svg';
import { ReactComponent as ChevronLeftDisabled } from '../../assets/icons/ChevronLeftDisabled.svg';
import { ReactComponent as ChevronRightDisabled } from '../../assets/icons/ChevronRightDisabled.svg';
import DropDown from '../DropDown/DropDown';
import styles from './Pagination.module.scss';

const options = [
    '5/page',
    '10/page',
    '20/page',
    '30/page',
    '40/page',
    '50/page'
];

const Pagination = ({ totalRecords, currentPage, setCurrentPage, recordsPerPage, setRecordsPerPage }) => {
    const [pages, setPages] = useState([]);

    const handleOnClickPage = (page) => {
        if(page !== '...') {
            setCurrentPage(page);
        }
    }

    const handleOnClickPreviousPage = () => {
        if(currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleOnClickNextPage = () => {
        if(currentPage < totalRecords) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handleOnChangeRecordsPerPage = (event) => {
        setCurrentPage(1);
        setRecordsPerPage(parseInt(event.currentTarget.value.split('/')[0]));
    }

    useEffect(() => {
        const totalPages = Math.ceil(totalRecords / recordsPerPage);
        const tempCurrentPage = Math.floor( ((currentPage*recordsPerPage)-recordsPerPage)/ recordsPerPage) + 1;
        const tempPages = [];
        tempPages.push(tempCurrentPage);
        tempCurrentPage !== 1 && tempPages.unshift(tempCurrentPage - 1);
        tempCurrentPage === totalPages && totalPages >= 3 && tempPages.unshift(tempCurrentPage - 2);
        tempPages[0] > 2 && tempPages.unshift('...');
        tempPages[0] !== 1 && tempPages.unshift(1);
        tempCurrentPage !== totalPages && tempPages.push(tempCurrentPage + 1);
        tempCurrentPage === 1 && totalPages >= 3 && tempPages.push(tempCurrentPage + 2);
        tempPages[tempPages.length - 1] <= totalPages - 2 && tempPages.push('...');
        tempPages[tempPages.length - 1] !== totalPages && tempPages.push(totalPages);
        setPages([...tempPages.map((page) => page)]);
    }, [currentPage, recordsPerPage, totalRecords]);

    return (
        <div className={styles.paginationWrapper}>
            <span style={{color:'#0655D3'}}>{totalRecords} Profiles</span>
            <Button label='Previous' Icon={currentPage === 1 ? ChevronLeftDisabled : ChevronLeft} position='left' disabled={currentPage === 1} onClick={handleOnClickPreviousPage}/>
            {pages.map((page, index) => {
                return (
                    <Button label={page} key={index} onClick={() => handleOnClickPage(page)} active={currentPage === page}/>
                );
            })}
            <Button label='Next' Icon={currentPage === Math.ceil(totalRecords/recordsPerPage) ? ChevronRightDisabled : ChevronRight} position='right' disabled={currentPage === Math.ceil(totalRecords/recordsPerPage)} onClick={handleOnClickNextPage}/>
            <DropDown options={options} selectedOption={`${recordsPerPage}/page`} onChange={handleOnChangeRecordsPerPage}/>
        </div>
    );
}

export default Pagination;