import { FormControl, MenuItem, Select, TextField, InputLabel, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { addArticolo, getArticoli } from '../api/Fetch';

const FormInserimento = (props) => {

    const [articolo, setArticolo] = useState({
        descrizione: '',
        quantita: '',
        prezzo: '',
        categoria: '',
        data_inserimento: null
    });

    const handleFillArticolo = (event) => {
        event.preventDefault();
        setArticolo((articolo) => ({ ...articolo, [event.target.id]: event.target.value }));
    };

    const addArt = () => {
        //setArticolo((articolo) => ({ ...articolo, data_inserimento: new Date() }));
        articolo.data_inserimento = new Date();
        console.log('ARTICOLO ', articolo);
        addArticolo(articolo)
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
                        label="Quantità(Cm/Pz)"
                        id="quantita"
                        required={true}
                        onChange={(e) => handleFillArticolo(e)}
                        variant="standard">
                    </TextField>
                </FormControl>
                <FormControl fullWidth margin="normal" style={{ marginBottom: "25px" }}>
                    <TextField
                        label="Prezzo"
                        id="prezzo"
                        required={true}
                        onChange={(e) => handleFillArticolo(e)}
                        variant="standard">
                    </TextField>
                </FormControl>
                <FormControl fullWidth margin="normal" style={{ marginBottom: "25px" }}>
                    <InputLabel>Categoria</InputLabel>
                    <Select
                        value={articolo.categoria}
                        onChange={(e) => handleFillArticolo(e)}
                        label="Categoria"
                        variant="standard"
                    >
                        <MenuItem value=""><em>N/A</em></MenuItem>
                        <MenuItem value="merceria">Merceria</MenuItem>
                        <MenuItem value="lana">Lana</MenuItem>
                        <MenuItem value="filati">Filati</MenuItem>
                        <MenuItem value="intimo">Intimo</MenuItem>
                        <MenuItem value="tessuti">Tessuti</MenuItem>
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