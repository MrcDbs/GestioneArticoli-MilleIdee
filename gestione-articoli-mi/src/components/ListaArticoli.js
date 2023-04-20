import React, { useEffect, useState } from "react";
import {
    Modal,
    Typography,
    Box,
    Paper,
    IconButton, Divider,
    TableBody,
    TableContainer, Table, TableCell, TableRow, TableHead, TablePagination
} from '@mui/material';
import { getArticoli } from "../api/Fetch";
import * as Icon from 'react-bootstrap-icons';
// import { Table } from "react-bootstrap-icons";

const ListaArticoli = (props) => {

    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [listaPerPage, setListaPerPage] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        if (page != 0)
            setPage(0);

    };
    useEffect(() => {
        setListaPerPage(props.listaArticoli.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
        // getArticoli().then(res => {
        //     console.log('USE EFFECT DASHBOARD');
        //     props.setListaArticoli(res.data);
        //     setListaPerPage(res.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
        //     console.log('LISTA PER PAGE ', listaPerPage);
        //     //props.setTotaleGiornaliero((totaleGiornaliero) => ({ ...totaleGiornaliero, totale: getTotal(res.//data) }));
        //     console.log('TOTALE GIORN  ', props.totaleGiornaliero.totale);
        // }).catch(error => {
        //     console.log('ERRORE CON STATUS ', error.status);
        // });

    }, [props.listaArticoli]);
    useEffect(() => {
        setListaPerPage(props.listaArticoli.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
    }, []);

    useEffect(() => {
        setListaPerPage(props.listaArticoli.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
    }, [page]);
    useEffect(() => { }, [page]);

    useEffect(() => {
        console.log('rows per PAGE ', rowsPerPage);
        setListaPerPage(props.listaArticoli.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
    }, [rowsPerPage]);
    // useEffect(() => { }, []);

    const openModal = () => {
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false);
    }

    const showList = () => {
        return (
            <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
                <Table stickyHeader sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Descrizione</TableCell>
                            <TableCell>Quantità&nbsp;(cm/pz)</TableCell>
                            <TableCell>Prezzo&nbsp;(euro)</TableCell>
                            <TableCell>Categoria</TableCell>
                            <TableCell>Data Inserimento</TableCell>
                            <TableCell colSpan="2">Azioni</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listaPerPage?.map((entry, index) => (

                            <TableRow

                                hover={true}
                                key={index + 1}>
                                <TableCell component="th" scope="row">{entry.id}</TableCell>
                                <TableCell>{entry.descrizione}</TableCell>
                                <TableCell align="right">{entry.quantita}</TableCell>
                                <TableCell align="right">&euro; {entry.prezzo}</TableCell>
                                <TableCell align="right">{entry.categoria}</TableCell>
                                <TableCell align="right">{entry.data_inserimento}</TableCell>
                                <TableCell onClick={openModal} style={{ cursor: 'pointer', align: 'right' }}><Icon.PencilFill /></TableCell>
                                <TableCell style={{ cursor: 'pointer', align: 'right' }}><Icon.Trash /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
    return (
        <>
            <Box>
                <div style={{ textAlign: 'left' }}>
                    <h2 style={{ color: '#636569', fontSize: '30px' }}>Lista Articoli</h2>
                    <h2 style={{ color: '#636569', fontSize: '20px' }}>Totale: 123.90</h2>
                </div>

                <Box sx={{ verticalAlign: 'middle', borderTop: '1px solid lightgrey' }}>
                    {/* <TableRow> */}
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 40]}
                        component="div"
                        count={props.listaArticoli.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    // classes={{ toolbar: 'nav' }}
                    />
                    {/* </TableRow> */}
                </Box>

                <Divider />
            </Box>
            {showList()}
        </>
    )
}

export default ListaArticoli;