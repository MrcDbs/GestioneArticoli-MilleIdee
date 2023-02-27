import React, { useState } from 'react';

const LoginForm = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const gestisciCredenziali = (event) => {
        console.log(event.target.value);
        if (event.target.id === 'username') {
            setUsername(event.target.value);
        } else {
            setPassword(event.target.value);
        }

    }
    return (
        <>
            <h1>Accedi</h1>
            <form>
                <label>Username</label>
                <br />
                <input type="text" id="username" onChange={(event) => gestisciCredenziali(event)} />
                <br />
                <label>Password</label>
                <br />
                <input type="password" id="password" onChange={(event) => gestisciCredenziali(event)} />
                <br />
                <button className="btn btn-primary" onClick={(e) => {
                    e.preventDefault();
                    console.log('CLICKING')
                }}>Login</button>
            </form>
        </>
    )
}

export default LoginForm;