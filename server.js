import express from "express";
import pool from "./db.js";

const app = express();
app.use(express.json())
app.use(express.static("public"));

app.post("/login", async (req,res) =>{
    const login = req.body.login
    const senha = req.body.senha;

    if (!login || !senha ) {
        return res.status(400).json({ erro: 'Preencha usuário e senha!' });
    }

    const r = await pool.query(
        'SELECT id, nome FROM usuario WHERE login = $1 AND senha = $2',
    [login, senha]
    );

    if (r.rows.length === 0){
        return res.status(401).json({erro: 'Usuário ou senha incorretos.'})
    }
    res.json(r.rows[0]);
});

app.post('/produtos', async (req,res) =>{
    const { nome, quantidade, estoque_minimo} = req.bodt
})