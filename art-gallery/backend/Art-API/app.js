const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config();

// Importa conexao com Supabase e Cloudinary
require('./db');

// Importa rotas
const authRoutes = require('./routes/auth');
const collectionsRouter = require('./routes/collections');
const pictureRouter = require('./routes/pictureRoutes');
const magicedenRouter = require('./routes/magiceden');

const app = express();
const port = process.env.PORT || 3001;

// CORS
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://pallasgalaxy.vercel.app',
  'https://pallas-galaxy.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true); // Permite todas em dev
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas
app.use('/auth', authRoutes);
app.use('/collections', collectionsRouter);
app.use('/pictures', pictureRouter);
app.use('/magiceden', magicedenRouter);

// Rota raiz
app.get('/', (req, res) => res.json({ 
  message: 'Pallas Galaxy API - Supabase', 
  status: 'online',
  version: '2.0.0'
}));

// Rota get-all na raiz (compatibilidade)
app.get('/get-all', async (req, res) => {
  const collectionController = require('./controllers/collectionController');
  return collectionController.getAll(req, res);
});

// Erro global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;
