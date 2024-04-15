import React, { useState } from 'react'
import TablePagination from '@mui/material/TablePagination';

const TablePaginationComponent = ({count, page, setPage, rowsPerPage, setRowsPerPage}) => {

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }
  return (
    <TablePagination
    component="div"
    count={count}
    page={page} 
    onPageChange={handleChangePage}
    rowsPerPage={rowsPerPage}
    onRowsPerPageChange={handleChangeRowsPerPage}
    rowsPerPageOptions={[5,10,20]}/>
  )
}

export default TablePaginationComponent