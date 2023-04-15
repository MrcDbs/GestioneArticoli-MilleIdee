import React, { useState, useEffect } from 'react';
import { login, register, getArticoli } from '../api/Fetch';
import Dashboard from './dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm = (props) => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState({
        username: '',
        password: ''
    });
    const [totaleGiornaliero, setTotaleGiornaliero] = useState({
        totale: 0,
        data: null
    })

    const [listaArticoli, setListaArticoli] = useState([]);

    useEffect(() => { console.log('User 3 ', username) }, [username]);
    const gestisciCredenziali = (event) => {
        //console.log(event.target.value);
        if (event.target.id === 'username') {
            let user = event.target.value;
            setUsername(user);
            //console.log('User ', username);
        } else {
            setPassword(event.target.value);
            //console.log('Pass ', password);
        }

    }

    const logout = () => {
        setLoggedIn(false);
    }
    const addArticoloToList = (art) => {
        listaArticoli.push(art);
    }
    const submitLogin = () => {
        console.log('Login ', { username, password });
        //console.log(user);
        login({ username, password })
            .then(res => {
                setUser({
                    username: '',
                    password: ''
                });
                console.log('FA IL LOGIN ');
                getArticoli().then(res => {
                    //console.log('LISTA INIZIALE ', res);
                    setListaArticoli(res.data);
                }).catch(error => {
                    console.log('ERRORE retrieve CON STATUS ', error);
                });
                //props.loggedIn();
                setLoggedIn(true);
                console.log('RESPONSE ' + res.status + ' ', res);
            })
            .catch(error => {
                console.log('ERRORE CON STATUS ', error);
            });
    }
    return (
        <>
            {!loggedIn ? <div><h1>Accedi</h1>
                <form>
                    <label>Username</label>
                    <br />
                    <input type="text" id="username" value={username} onChange={(event) => gestisciCredenziali(event)} />
                    <br />
                    <label>Password</label>
                    <br />
                    <input type="password" id="password" value={password} onChange={(event) => gestisciCredenziali(event)} />
                    <br />
                    <button class="btn btn-primary mt-2" onClick={(e) => {
                        e.preventDefault();
                        console.log('CLICKING');
                        submitLogin();
                    }}>Login</button>
                </form><hr /></div> : <></>}
            <br />
            {loggedIn ? <Dashboard
                listaArticoli={listaArticoli}
                addArticoloToList={addArticoloToList}
                logout={logout}
                totaleGiornaliero={totaleGiornaliero}
                setTotaleGiornaliero={setTotaleGiornaliero}></Dashboard> : <></>}
        </>
    )
}

export default LoginForm;