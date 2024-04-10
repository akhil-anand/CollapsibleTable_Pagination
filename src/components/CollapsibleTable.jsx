import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const CollapsibleTable = ({ row, columns }) => {
    const [open, setOpen] = useState(false)

    if (!columns?.length) {
        return null
    }
    const generateHeaders = (dataObj) => {
        const headerList = []
        for (const key in dataObj) {
            if (Object.hasOwnProperty.call(dataObj, key) && ['string', 'number'].includes(typeof dataObj[key])) {
            headerList.push(key);
          }
        }
        return headerList
      }
      const generateMainHeaders = (dataObj) => {
        const headerList = []
        for (const key in dataObj) {
          if (Object.hasOwnProperty.call(dataObj, key) && !['string', 'number'].includes(typeof dataObj[key])) {
            headerList.push(key);
          }
        }
        return headerList
      }
    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell onClick={() => setOpen(!open)}>
                    <IconButton size='small'></IconButton>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </TableCell>
                {columns?.map(item => <TableCell component="th" scope="row">{row[item]}</TableCell>)}
            </TableRow>
            <TableRow>
                <TableCell  style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1, p:2, border: '1px solid gray', borderRadius: '8px' }}>
                        {generateMainHeaders(row)?.map((rowItem, row_index) =>
                        <>
                        <Typography gutterBottom component="div" sx={row_index !== 0 ? {mt: 2} : {}} style={{fontWeight: 800}}>{rowItem?.toUpperCase()}</Typography>
                            <Table key={'main'+row_index} size="small">
                                <TableHead>
                                    <TableRow>
                                        {generateHeaders(row[rowItem])?.map((item, item_index) => 
                                        <TableCell key={rowItem[item] + item_index}  style={{fontWeight: 700, fontSize: '1.rem'}}>{item?.toUpperCase()}</TableCell>
                                        )}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                    {generateHeaders(row[rowItem])?.map((item, item_index) => 
                                        <TableCell key={rowItem[item] + item_index}>{row[rowItem][item]}</TableCell>
                                        )}
                                    </TableRow>
                                </TableBody>
                            </Table>
                            </>
                        )}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}

export default CollapsibleTable