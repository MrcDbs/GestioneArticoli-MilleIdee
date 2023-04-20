import React, { useState, useEffect } from 'react';
import { addArticolo, getArticoli } from '../api/Fetch';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './node_modules/bootstrap-icons/icons/trash3.svg';
import '../style/dashStyle.css';
import * as Icon from 'react-bootstrap-icons';
import { getTotal } from '../util/utils';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Modal,
    Typography,
    Box,
    Grid, Paper,
    Divider, FormControl, Button, Avatar, Tooltip
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
    const location = useLocation();
    const navigate = useNavigate();

    const user = {
        username: location.state.username,
        name: location.state.name,
        lastname: location.state.lastname
    }

    useEffect(() => {
        getArticoli().then(res => {
            //console.log('LISTA INIZIALE ', res);
            setListaArticoli(res.data);
        }).catch(error => {
            console.log('ERRORE retrieve CON STATUS ', error);
        });
    }, []);
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
    const [listaArticoli, setListaArticoli] = useState([]);
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


    // const addArticoloToList = (art) => {
    //     listaArticoli.push(art);
    // }



    const openModal = () => {
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false);
    }
    const logout = () => {
        localStorage.clear();
        navigate('/GestioneArticoli-MilleIdee');
        //setLoggedIn(false);
    }
    const stringToColor = (string) => {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        // for (i = 0; i < string.length; i += 1) {
        //     hash = string.charCodeAt(i) + ((hash << 5) - hash);
        // }

        // let color = '#';

        // for (i = 0; i < 3; i += 1) {
        //     const value = (hash >> (i * 8)) & 0xff;
        //     color += `00${value.toString(16)}`.slice(-2);
        // }
        /* eslint-enable no-bitwise */

        // return color;
        return '#7d8eb5';
    }

    const stringAvatar = (name) => {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '20px'
                }}>  <h1 style={{
                    color: "white",
                }}>Gestione - Tracciamento Articoli | Mille Idee</h1></div>
                <div style={{ paddingTop: '15px' }}>
                    <Tooltip title={user.name + ' ' + user.lastname}><Avatar sx={{ width: '56px', height: '56px' }} {...stringAvatar(user.name + ' ' + user.lastname)} /></Tooltip>
                </div>
                <FormControl sx={{ margin: '15px' }} >
                    <Button variant="contained" onClick={logout}>Log Out</Button>
                </FormControl>

                {/* <button className='btn btn-primary b-logout'>Log Out</button> */}
                {/* <a href="#">Log out</a> */}
            </div >
            <div className="main-b">

                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} className="dashText">
                            <h1 style={{ color: "#636569", fontSize: "60px", fontFamily: "Helvetica" }}>
                                DASHBOARD
                            </h1>
                        </Grid>
                        <Grid container spacing={12} className="lista">
                            {/* <Grid item xs={1} ></Grid> */}
                            <Grid item xs={8} >
                                <Paper elevation={6} style={{ minHeight: "300px", padding: "30px" }}>
                                    <ListaArticoli
                                        listaArticoli={listaArticoli}
                                        setListaArticoli={setListaArticoli} />
                                </Paper>

                            </Grid>
                            {/* <Grid item xs={1} ></Grid> */}
                            <Grid item xs={4}>
                                <Divider orientation="vertical" flexItem />
                                <Paper elevation={6} style={{ minHeight: "300px", padding: "30px", borderRadius: "5px", marginRight: '17px' }}>
                                    <h1 style={{ color: "#636569", textAlign: "center" }}>Inserisci nuovo articolo</h1>
                                    <Divider />
                                    <FormInserimento />

                                </Paper>
                            </Grid>
                            {/* <Grid item xs={1} ></Grid> */}

                        </Grid>
                    </Grid>
                </Box>
                {/* <div><h2>Totale Giornaliero: {props.totaleGiornaliero.totale} - {props.totaleGiornaliero.data}</h2>
                </div> */}
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