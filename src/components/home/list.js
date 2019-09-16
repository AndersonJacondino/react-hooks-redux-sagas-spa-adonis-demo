import React, { useMemo, useState } from 'react';
import { useTable, useFilters } from 'react-table';
import matchSorter from 'match-sorter';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import tweetService from '../../service/tweetService';
import Button from '@material-ui/core/Button';
import { loadlist } from '../../redux/core/actions/listActions';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Input from '@material-ui/core/Input';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import './list.css';

const useStyles1 = makeStyles(theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing(2.5),
    },
}));

// Define a default UI for filtering
function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length

    return (
        <div className="tableTop">
            <Input
                value={filterValue || ''}
                onChange={e => {
                    setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
                }}
                placeholder={`Search ${count} records...`}
            />
        </div>
    )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

function TablePaginationActions(props) {
    const classes = useStyles1();
    const dispatch = useDispatch();
    
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    function handleFirstPageButtonClick(event) {
        onChangePage(event, 0);
    }

    function handleBackButtonClick(event) {
        onChangePage(event, page - 1);
    }

    function handleNextButtonClick(event) {
        dispatch(loadlist(page === 0 ? page + 2 : page + 1))
        onChangePage(event, page + 1);
    }

    function handleLastPageButtonClick(event) {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    }

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

// Our table component
function TableFilter({ columns, data, lastPage, pages, rowsPerPages, total }) {
    const [isValid, setIsValid] = useState({});
    const dispatch = useDispatch();

    async function deletar(id) {
        await tweetService.delTweet('/tweets', id);
        dispatch(loadlist(1));
    }

    const filterTypes = useMemo(
        () => ({
            // Add a new fuzzyTextFilterFn filter type.
            fuzzyText: fuzzyTextFilterFn,
            // Or, override the default text filter to use
            // "startWith"
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const rowValue = row.values[id]
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true
                })
            },
        }),
        []
    )

    const defaultColumn = useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    )

    const { getTableProps, headerGroups, rows, prepareRow } = useTable(
        {
            columns,
            data,
            defaultColumn, // Be sure to pass the defaultColumn option
            filterTypes,
        },
        useFilters // useFilters!
    )

    // We don't want to render all of the rows for this example, so cap
    // it for this use case
    const firstPageRows = rows.slice(0, parseInt(total))

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    function handleChangePage(event, newPage) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event) {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    return (
        <Paper style={{ marginTop: '2em' }}>
            <Table {...getTableProps()}>
                <TableHead>
                    {headerGroups.map(headerGroup => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column, i) => (
                                <TableCell style={{ position: 'relative!important' }} {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                    <FilterListIcon style={{ fontSize: 16 }} onClick={() => setIsValid({ ...isValid, [i]: !isValid[i] })} />
                                    <div style={{ display: isValid[i] ? 'block' : 'none' }}>
                                        {column.canFilter ? column.render('Filter') : null}
                                    </div>
                                </TableCell>
                            ))}
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody>
                    {firstPageRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(
                        (row, i) =>
                            prepareRow(row) || (
                                <TableRow {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                                        )
                                    })}
                                    <TableCell>
                                        <Button onClick={() => deletar(row.values.id)} size="small" color="default">
                                            <DeleteIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                    )}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 48 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[10, 25]}
                            count={parseInt(total)}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </Paper>
    )
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
    return rows.filter(row => {
        const rowValue = row.values[id]
        return rowValue >= filterValue
    })
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = val => typeof val !== 'number'

function List({ list, lastPage, page, perPage, total }) {

    const columns = useMemo(
        () =>
            [
                {
                    Header: 'Id',
                    accessor: 'id',
                },
                {
                    Header: 'Content',
                    accessor: 'content',
                },
                {
                    Header: 'Date Create',
                    accessor: 'created_at',
                },
                {
                    Header: 'Date Update',
                    accessor: 'updated_at',
                },
            ],
        []
    )

    return (
        <TableFilter
            columns={columns}
            data={list}
            lastPage={lastPage}
            pages={page}
            rowsPerPages={perPage}
            total={total} />
    )
}

export default List;