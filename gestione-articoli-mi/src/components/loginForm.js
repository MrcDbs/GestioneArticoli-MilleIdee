import React, { useState, useEffect } from 'react';
import { login, register, getArticoli } from '../api/Fetch';
import Dashboard from './dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

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
    });
    const navigate = useNavigate();

    // const [listaArticoli, setListaArticoli] = useState([]);

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
        // localStorage.clear();
        // navigate('/GestioneArticoli-MilleIdee');
        //setLoggedIn(false);
    }
    // const addArticoloToList = (art) => {
    //     listaArticoli.push(art);
    // }
    const submitLogin = () => {
        //setLoggedIn(true);
        console.log('Login ', { username, password });
        //console.log(user);
        login({ username, password })
            .then(res => {
                setUser({
                    username: '',
                    password: ''
                });
                console.log('FA IL LOGIN ');
                // getArticoli().then(res => {
                //     //console.log('LISTA INIZIALE ', res);
                //     setListaArticoli(res.data);
                // }).catch(error => {
                //     console.log('ERRORE retrieve CON STATUS ', error);
                // });
                //props.loggedIn();
                //setLoggedIn(true);
                const token = res.data.accessToken;
                localStorage.setItem('token', token);
                console.log('RESPONSE ' + res.status + ' ', res);
                navigate('/GestioneArticoli-MilleIdee/dashboard');

            })
            .catch(error => {
                console.log('ERRORE CON STATUS ', error);
            });
    }
    return (
        <>
            {!loggedIn ? <div><h1>Accedi</h1>
                <form class="form" style={{ border: '2px solid darkgrey', padding: '15px' }}>
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
                // listaArticoli={listaArticoli}
                // addArticoloToList={addArticoloToList}
                logout={logout}
                totaleGiornaliero={totaleGiornaliero}
                setTotaleGiornaliero={setTotaleGiornaliero}></Dashboard> : <></>}
        </>
    )
}

export default LoginForm;