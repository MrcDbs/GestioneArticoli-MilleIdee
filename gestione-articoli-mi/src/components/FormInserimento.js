import { FormControl, MenuItem, Select, TextField, InputLabel, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { addArticolo, getArticoli } from '../api/Fetch';

const FormInserimento = (props) => {

    const [articolo, setArticolo] = useState({
        id: null,
        descrizione: '',
        quantita: '',
        prezzo: '',
        categoria: '',
        data_inserimento: null
    });

    useEffect(() => {
        console.log('CATEGORIA NELLO USE EFFECT ', articolo.categoria);
    }, [articolo]);

    const [categorie, setCategorie] = useState([
        { name: "N/A", value: "" },
        { name: "Merceria", value: "Merceria" },
        { name: "Lana", value: "Lana" },
        { name: "Filati", value: "Filati" },
        { name: "Intimo", value: "Intimo" },
        { name: "Tessuti", value: "Tessuti" }
    ])

    const handleFillArticolo = (event) => {
        console.log('SELECT ' + event.target.name + ' ' + event.target.value, event);
        event.preventDefault();
        setArticolo((articolo) => ({ ...articolo, [event.target.name]: event.target.value }));
        console.log('CATEGORIA DOPO SELECT ', articolo.categoria);
    };

    const addArt = () => {
        //setArticolo((articolo) => ({ ...articolo, data_inserimento: new Date() }));
        articolo.data_inserimento = new Date();
        console.log('ARTICOLO ', articolo);
        const token = localStorage.getItem('token');
        if (token !== null || token !== undefined) {
            addArticolo(token, articolo)
                .then(res => {
                    props.addArticoloToList(res.data);
                    setArticolo({
                        descrizione: '',
                        quantita: '',
                        prezzo: '',
                        categoria: '',
                        data_inserimento: null
                    });
                    console.log('RESPONSE ' + res.status + ' ', res);
                })
                .catch(error => {
                    console.log('ERRORE CON STATUS ', error.status);
                });
        } else {
            //showErrorModal();
        }

    }

    const getFormView = () => {
        return (
            <div>
                <FormControl fullWidth margin="normal" style={{ marginBottom: "25px", marginTop: "25px" }}>
                    <TextField
                        label="Descrizione articolo"
                        id="descrizione"
                        required={true}
                        onChange={(e) => handleFillArticolo(e)}
                        variant="standard">
                    </TextField>
                </FormControl>
                <FormControl fullWidth margin="normal" style={{ marginBottom: "25px" }}>
                    <TextField
                        type="number"
                        label="Quantità(Cm/Pz)"
                        id="quantita"
                        required={true}
                        onChange={(e) => handleFillArticolo(e)}
                        variant="standard">
                    </TextField>
                </FormControl>
                <FormControl fullWidth margin="normal" style={{ marginBottom: "25px" }}>
                    <TextField
                        type="number"
                        label="Prezzo"
                        id="prezzo"
                        required={true}
                        onChange={(e) => handleFillArticolo(e)}
                        variant="standard">
                    </TextField>
                </FormControl>
                <FormControl fullWidth margin="normal" style={{ marginBottom: "25px" }}>
                    <InputLabel id="categoria">Categoria</InputLabel>
                    <Select
                        name="categoria"
                        value={articolo.categoria}
                        variant="standard"
                        onChange={(event) => handleFillArticolo(event)}
                    >
                        {categorie.map((cat) => (
                            <MenuItem key={cat.name} value={cat.value}>
                                {cat.name}
                            </MenuItem>
                        ))}
                        {/* <MenuItem value=""><em>N/A</em></MenuItem>
                        <MenuItem value="merceria">Merceria</MenuItem>
                        <MenuItem value="lana">Lana</MenuItem>
                        <MenuItem value="filati">Filati</MenuItem>
                        <MenuItem value="intimo">Intimo</MenuItem>
                        <MenuItem value="tessuti">Tessuti</MenuItem> */}
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mx: "auto" }}>
                    <Button variant="contained"
                        type="submit"
                        onClick={() => {
                            console.log('Adding...');
                            addArt();
                        }}>Aggiungi</Button>
                </FormControl>
            </div>
        )
    }

    return (
        <>
            {getFormView()}
        </>
    )
}

export default FormInserimento;