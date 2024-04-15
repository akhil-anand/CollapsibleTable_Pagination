import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import CollapsibleTable from './components/CollapsibleTable';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import TablePaginationComponent from './components/TablePagination';

function App() {

  const [allUsersData, setAllUsersData] = useState([])
  const [tableData, setTableData] = useState([])
  const [mainHeaders, setMainHeaders] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const fetchData = async () => {
    const data = await fetch('https://jsonplaceholder.typicode.com/users').then((res) => res.json())
    setTableData(data.slice(0, rowsPerPage))
    setAllUsersData(data)
  }

  const generateHeaders = (dataObj) => {
    const headerList = []
    for (const key in dataObj) {
      if (Object.hasOwnProperty.call(dataObj, key) && ['string', 'number'].includes(typeof dataObj[key])) {
        headerList.push(key);
      }
    }
    setMainHeaders(headerList)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (allUsersData?.length) {
      generateHeaders(allUsersData?.[0])
    }
  }, [allUsersData])

  useEffect(() => {
    setTableData(allUsersData.slice(0, rowsPerPage))
  }, [rowsPerPage])

  useEffect(() => {
    const firstRowIndex = rowsPerPage * page;
    const lastRowIndex = firstRowIndex + rowsPerPage;
    setTableData(allUsersData.slice(firstRowIndex, lastRowIndex))
  }, [page])
  


  return (
    <div className="App" style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
      <Typography variant='h3' sx={{ mt: 5, mx: 5}}>Collapsible Table</Typography>
      <TableContainer component={Paper} sx={{ mt: 5,display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell />
              {mainHeaders?.map(item => <TableCell style={{ fontWeight: 700, fontSize: '1.rem' }}>{item?.toUpperCase()}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData?.map(item => <CollapsibleTable key={item.id} row={item} columns={mainHeaders} />)}
          </TableBody>
        </Table>
        <Box sx={{width: '50%', display: 'flex', justifyContent: 'flex-end', alignSelf: 'flex-end'}}>
          <TablePaginationComponent count={allUsersData?.length ?? 0} page={page} setPage={setPage} rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage}/>
        </Box>
      </TableContainer>
    </div>
  );
}

export default App;
