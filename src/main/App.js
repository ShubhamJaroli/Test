import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { shipments } from "../database/db.json";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Shipment from "./shipment";
const createStyle = makeStyles({
  dataGrid: {
    display: "flex",
    flex: 1,
    backgroundColor: "#fff",
  },
  div: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    height: "100vh",
    padding: 5,
    backgroundColor: "#fff",
  },
  textfield: {
    padding: 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "end",
    alignItems: "center",
  },
  tablecell: {
    fontWeight: "bold",
    cursor:'pointer'
  },
  table: {
    height: "90%",
  },
  footer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    padding: 4,
    borderTopStyle: "solid",
    borderTop: 0.05,
    borderColor: "#95a5a6",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  tableContainer: {
    borderStyle: "solid",
    border: 0.05,
    borderColor: "#95a5a6",
  },
});

function App() {
  const classes = createStyle();
  const [state, setState] = useState({
    shipments: [],
    searchField: "",
    shipmentPerPage: 10,
    page: 1,
    sort: "",
    sortDirection: "desc",
  });
  useEffect(() => {
    setState((prevState) => ({ ...prevState, shipments: shipments }));
  }, []);
  const handleChange = (event) => {
    setState({
      ...state,
      searchField: event.target.value,
      shipments: shipments.filter((value) =>
        value.name.includes(event.target.value)
      ),
    });
  };
  return (
    <Paper className={classes.div}>
      <div className={classes.textfield}>
        <TextField
          placeholder="Search "
          variant="outlined"
          value={state.searchField}
          size="small"
          onChange={handleChange}
        />
      </div>
      <div className={classes.tableContainer}>
        <TableContainer className={classes.table}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell
                  className={classes.tablecell}
                  onClick={() =>
                    setState({
                      ...state,
                      sort: "name",
                      sortDirection:
                        state.sortDirection === "asc" ? "desc" : "asc",
                    })
                  }
                >
                  Name
                </TableCell>
                <TableCell className={classes.tablecell}   onClick={() =>
                    setState({
                      ...state,
                      sort: "mode",
                      sortDirection:
                        state.sortDirection === "asc" ? "desc" : "asc",
                    })
                  }>Mode</TableCell>
                <TableCell className={classes.tablecell}   onClick={() =>
                    setState({
                      ...state,
                      sort: "type",
                      sortDirection:
                        state.sortDirection === "asc" ? "desc" : "asc",
                    })
                  }>Type</TableCell>
                <TableCell className={classes.tablecell} 
                  onClick={() =>
                    setState({
                      ...state,
                      sort: "destination",
                      sortDirection:
                        state.sortDirection === "asc" ? "desc" : "asc",
                    })
                  }>Destination</TableCell>
                <TableCell className={classes.tablecell}
                  onClick={() =>
                    setState({
                      ...state,
                      sort: "origin",
                      sortDirection:
                        state.sortDirection === "asc" ? "desc" : "asc",
                    })
                  }>Origin</TableCell>
                <TableCell className={classes.tablecell}   onClick={() =>
                    setState({
                      ...state,
                      sort: "total",
                      sortDirection:
                        state.sortDirection === "asc" ? "desc" : "asc",
                    })
                  }>Total</TableCell>
                <TableCell className={classes.tablecell}   onClick={() =>
                    setState({
                      ...state,
                      sort: "status",
                      sortDirection:
                        state.sortDirection === "asc" ? "desc" : "asc",
                    })
                  }>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.table}>
              {state.shipments
                .slice(state.page - 1, state.page + state.shipmentPerPage - 1)
                .sort((a, b) => {
                  if (!state.sort) return true;
                  else
                    return state.sortDirection === "asc"
                      ? a[state.sort] > b[state.sort]
                      : a[state.sort] < b[state.sort];
                })
                .map((value) => {
                  return <Shipment {...value} key={value.id} />;
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={classes.footer}>
          <TextField
            variant="outlined"
            value={state.shipmentPerPage}
            type="number"
            size="small"
            onChange={(e) => {
              if (parseInt(e.target.value))
                setState((prevState) => ({
                  ...prevState,
                  shipmentPerPage: parseInt(e.target.value),
                  page: 1,
                }));
            }}
          />
          <Typography>
            {`${state.page}-${
              state.page + state.shipmentPerPage - 1 > state.shipments.length
                ? state.shipments.length
                : state.page + state.shipmentPerPage - 1
            }`}
          </Typography>
          <IconButton
            size="small"
            color="inherit"
            disabled={state.page === 1}
            onClick={() =>
              setState({ ...state, page: state.page - state.shipmentPerPage })
            }
          >
            <ArrowBackIosIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="inherit"
            onClick={() =>
              setState({ ...state, page: state.page + state.shipmentPerPage })
            }
            disabled={
              state.page + parseInt(state.shipmentPerPage) - 1 >
              state.shipments.length
            }
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
    </Paper>
  );
}

export default App;
