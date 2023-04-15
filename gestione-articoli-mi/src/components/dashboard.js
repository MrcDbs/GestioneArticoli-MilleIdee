import React, { useState, useEffect } from 'react';
import { addArticolo, getArticoli } from '../api/Fetch';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './node_modules/bootstrap-icons/icons/trash3.svg';
import '../style/dashStyle.css';
import * as Icon from 'react-bootstrap-icons';
import { getTotal } from '../util/utils';
import {
    Modal,
    Typography,
    Box,
    Grid, Paper,
    Divider, Card, CardActionArea, CardContent
} from '@mui/material';
import ListaArticoli from './ListaArticoli';
import FormInserimento from './FormInserimento';

const Dashboard = (props) => {

    // useEffect(() => {
    //     getArticoli().then(res => {
    //         console.log('USE EFFECT DASHBOARD');
    //         props.setListaArticoli(res.data);
    //         //props.setTotaleGiornaliero((totaleGiornaliero) => ({ ...totaleGiornaliero, totale: getTotal(res.//data) }));
    //         console.log('TOTALE GIORN  ', props.totaleGiornaliero.totale);
    //     }).catch(error => {
    //         console.log('ERRORE CON STATUS ', error.status);
    //     });

    // }, [props.listaArticoli]);

    // useEffect(() => { }, [props.totaleGiornaliero]);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [open, setOpen] = useState(false);
    // const [articolo, setArticolo] = useState({
    //     descrizione: '',
    //     quantita: '',
    //     prezzo: '',
    //     categoria: '',
    //     data_inserimento: null
    // });

    // const [totaleGiornaliero, setTotaleGiornaliero] = useState({
    //     totale: 0,
    //     data: null
    // })






    const openModal = () => {
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false);
    }

    return (
        <>
            <h1 style={{ color: "darkblue" }}>Gestione Articoli</h1>
            <div className="main-b">

                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} className="dashText">
                            <h1 style={{ color: "white", fontSize: "60px", fontFamily: "Helvetica" }}>
                                DASHBOARD
                            </h1>
                        </Grid>
                        <Grid container spacing={12} >
                            <Grid item xs={1} ></Grid>
                            <Grid item xs={5} >
                                <Paper elevation={4} style={{ minHeight: "300px", padding: "30px" }}>
                                    <ListaArticoli
                                        listaArticoli={props.listaArticoli} />
                                </Paper>

                            </Grid>
                            <Grid item xs={1} ></Grid>
                            <Grid item xs={4}>
                                <Divider orientation="vertical" flexItem />
                                <Paper elevation={4} style={{ minHeight: "300px", padding: "30px", borderRadius: "15px" }}>
                                    <h1 style={{ color: "darkblue", textAlign: "center" }}>Inserisci nuovo articolo</h1>
                                    <Divider />
                                    <FormInserimento />

                                </Paper>
                            </Grid>
                            <Grid item xs={1} ></Grid>

                        </Grid>
                    </Grid>
                </Box>
                <div><h2>Totale Giornaliero: {props.totaleGiornaliero.totale} - {props.totaleGiornaliero.data}</h2>
                </div>
                <Modal
                    open={open}
                    onClose={onClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                    </Box>
                </Modal>
            </div>


        </>
    )
}

export default Dashboard;