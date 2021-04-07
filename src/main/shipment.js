import React, { useState, Fragment } from "react";
import "../App.css";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const createStyle = makeStyles({
    tablecell : {
      fontWeight:'bold'
    },
    collapseheader : {
        marginTop:5
    }
  });
function Shipment (props) {
    const classes = createStyle();
    const [open, setOpen ] = useState(false);
    return (
        <Fragment>
            <TableRow>
                <TableCell>
                    <IconButton onClick ={() => setOpen(!open)} size='small'>
                        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{props.name}</TableCell>
                <TableCell>{props.mode}</TableCell>
                <TableCell>{props.type}</TableCell>
                <TableCell>{props.destination}</TableCell>
                <TableCell>{props.origin}</TableCell>
                <TableCell>{props.total}</TableCell>
                <TableCell>{props.status}</TableCell>   
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open}>
                        <Box margin={1}>
                            <Typography className={classes.collapseheader}>Cargo</Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.tablecell}>Type</TableCell>
                                        <TableCell className={classes.tablecell}>Description</TableCell>
                                        <TableCell className={classes.tablecell}>Volume</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        props.cargo.map(value => <TableRow>
                                                <TableCell>{value.type}</TableCell>
                                                <TableCell>{value.description}</TableCell>
                                                <TableCell>{value.volume}</TableCell>
                                            </TableRow>
                                        )
                                    }
                                </TableBody>
                            </Table>
                            <Typography className={classes.collapseheader}>Services</Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.tablecell}>Type</TableCell>
                                        <TableCell className={classes.tablecell}>Value</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        props.services.map(value => <TableRow>
                                                <TableCell>{value.type}</TableCell>
                                                <TableCell>{value.value||'Not found'}</TableCell>
                                            </TableRow>
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    )
}

export default Shipment;