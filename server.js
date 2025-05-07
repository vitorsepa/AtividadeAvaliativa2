const express = require('express');
const { registrarLog } = require('./script');

const app = express();
app.use(express.json());

app.post('/logs', (req, res) => {
    const { nomeAluno } = req.body;
  
  if (!nomeAluno) {
    return res.status(400).json({ error: 'Nome do aluno é obrigatório.' });
  }

  registrarLog(nomeAluno);
  return res.status(200).json({ message: 'Log registrado com sucesso.' });
});

app.listen(8000, () => {
  console.log('ta rodando na porta 8000');
});
