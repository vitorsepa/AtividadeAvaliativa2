const express = require('express');
const fs = require('fs');
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

//--------------------------------------------------------------------------------

app.get('/logs/:id', (req, res) => {
    const { id } = req.params;
    fs.readFile('logs.txt', 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao ler o arquivo de logs.' });
      }
  
      const logs = data.split('\n');
      const log = logs.find(log => log.startsWith(id));
  
      if (log) {
        return res.status(200).json({ log });
      } else {
        return res.status(404).json({ error: 'Log não encontrado.' });
      }
    });
  });

  app.listen(8000, () => {
    console.log('ta rodando na porta 8000');
  });