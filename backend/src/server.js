// src/server.js

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import veiculoRoutes from './routes/veiculoRoutes.js';
import revisaoRoutes from './routes/revisaoRoutes.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Rota base para CRUD de veículos
app.use('/veiculo', veiculoRoutes);
app.use('/revisao', revisaoRoutes);

const HOST = process.env.HOST;
const PORT = process.env.PORT;
app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
  });
  