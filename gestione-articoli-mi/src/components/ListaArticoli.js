import React, { useEffect, useState } from "react";
import {
    Modal,
    Typography,
    Box,
    Paper,
    IconButton, Divider,
    TableBody,
    TableContainer, Table, TableCell, TableRow, TableHead
} from '@mui/material';
import { getArticoli } from "../api/Fetch";
import * as Icon from 'react-bootstrap-icons';
// import { Table } from "react-bootstrap-icons";

const ListaArticoli = (props) => {

    const [open, setOpen] = useState(false);

    useEffect(() => {
        getArticoli().then(res => {
            console.log('USE EFFECT DASHBOARD');
            props.setListaArticoli(res.data);
            //props.setTotaleGiornaliero((totaleGiornaliero) => ({ ...totaleGiornaliero, totale: getTotal(res.//data) }));
            console.log('TOTALE GIORN  ', props.totaleGiornaliero.totale);
        }).catch(error => {
            console.log('ERRORE CON STATUS ', error.status);
        });

    }, [props.listaArticoli]);

    const openModal = () => {
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false);
    }

    const showList = () => {
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Descrizione</TableCell>
                            <TableCell>Quantità&nbsp;(cm/pz)</TableCell>
                            <TableCell>Prezzo&nbsp;(euro)</TableCell>
                            <TableCell>Categoria</TableCell>
                            <TableCell>Data Inserimento</TableCell>
                            <TableCell colspan="2">Azioni</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.listaArticoli?.map((entry, index) => (

                            <TableRow
                                key={index + 1}>
                                <TableCell component="th" scope="row">{entry + 1}</TableCell>
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
                <h2 style={{ color: 'darkblue', fontSize: '30px' }}>Lista Articoli</h2>
                <Box style={{ textAlign: 'right' }}>

                </Box>
                <Divider />
            </Box>
            {showList()}
        </>
    )
}

export default ListaArticoli;