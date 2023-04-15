import axios from 'axios';





const apiFetch = axios.create({
    baseURL: 'http://localhost:3001'
});

const REGISTER_URL = '/user/register';
const LOGIN_URL = '/user/login';
const ADD_ARTICOLO = '/addArticolo';
const GET_ARTICOLI = '/getArticoli';

export const login = async (param) => {
    let res = await apiFetch.post(LOGIN_URL, param);
    return res;
}

export const register = async (param) => {
    let res = await apiFetch.post(REGISTER_URL, param);
    return res;
}

export const addArticolo = async (param) => {
    let res = await apiFetch.post(ADD_ARTICOLO, param);
    return res;
}

export const getArticoli = async () => {
    let res = await apiFetch.get(GET_ARTICOLI);
    return res;
}