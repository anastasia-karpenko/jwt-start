import { client } from "./db";
import express from 'express';

const app = express();

app.use(express.json());

app.post('/auth/register', (req, res) => {

})

app.post('/auth/login', (req, res) => {

})

app.post('/auth/logout', (req, res) => {

})

app.post('/profile', (req, res) => {

})

app.listen(3000, () => {
    console.log("Сервер запущен...");
});