import React, { useMemo, useState } from 'react';
import { useTable, useFilters } from 'react-table';
import matchSorter from 'match-sorter';

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <div className="tableTop">
      <input
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

// Our table component
function Table({ columns, data }) {
  const [isValid, setIsValid] = useState({});
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

  const { getTableProps, headerGroups, rows, prepareRow, state } = useTable(
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
  const firstPageRows = rows.slice(0, 10)

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i) => (
                <th style={{ position: 'relative!important' }} {...column.getHeaderProps()}>
                  {column.render('Header')}
                  <button onClick={() => setIsValid({ ...isValid, [i]: !isValid[i] })}>teste</button>
                  <div style={{ display: isValid[i] ? 'block' : 'none' }}>
                    {column.canFilter ? column.render('Filter') : null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {firstPageRows.map(
            (row, i) =>
              prepareRow(row) || (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                  })}
                </tr>
              )
          )}
        </tbody>
      </table>
    </>
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

function App() {
  const columns = useMemo(
    () =>
      [
        {
          Header: 'First Name',
          accessor: 'name',
        },
        {
          Header: 'Age',
          accessor: 'date',
          //   // Aggregate the average age of visitors
          //   aggregate: 'date',
          //   Aggregated: ({ cell: { value } }) => `${value} (avg)`,
        },
        {
          Header: 'Visits',
          accessor: 'id',
          // Aggregate the sum of all visits
          //   aggregate: 'sum',
          //   Aggregated: ({ cell: { value } }) => `${value} (total)`,
        },
        {
          Header: 'Profile Progress',
          accessor: 'price',
          // Use our custom roundedMedian aggregator
          //aggregate: roundedMedian,
          //Aggregated: ({ cell: { value } }) => `${value} (med)`,
        },
      ],
    []
  )

  const data = [
    {
      id: 1,
      name: 'product 1',
      price: 100,
      date: '05/06/2018'
    },
    {
      id: 2,
      name: 'product 2',
      price: 200,
      date: '06/06/2018'
    },
    {
      id: 3,
      name: 'product 3',
      price: 300,
      date: '07/06/2018'
    },
    {
      id: 4,
      name: 'product 4',
      price: 400,
      date: '08/06/2018'
    },
    {
      id: 5,
      name: 'product 5',
      price: 500,
      date: '09/06/2018'
    },
  ]


  return (
    <Table columns={columns} data={data} />
  )
}

export default App
