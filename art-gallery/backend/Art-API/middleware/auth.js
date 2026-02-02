// middleware/auth.js
// const jwt = require('jsonwebtoken');

// exports.authenticate = (req, res, next) => {
//   // Extrai o token do header 'Authorization'
//   const token = req.header('Authorization')?.replace('Bearer ', '');

//   // Verifica se o token foi fornecido
//   if (!token) {
//     return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
//   }

//   try {
//     // Verifica e decodifica o token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.userId; // Adiciona o ID do usuário à requisição
//     next(); // Passa para o próximo middleware ou rota
//   } catch (error) {
//     res.status(400).json({ message: 'Token inválido.' });
//   }
// };  




// exports.authenticate = (req, res, next) => {
//   const authHeader = req.header('Authorization');
//   if (!authHeader) return res.status(401).json({ message: 'Token não fornecido' });

//   const token = authHeader.replace('Bearer ', '');
  
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log('Token válido para usuário:', decoded.userId);
//     req.userId = decoded.userId;
//     next();
//   } catch (error) {
//     console.error('Falha na verificação:', error.message);
//     res.status(401).json({ message: 'Token inválido' });
//   }
// };  



// middleware/auth.js
const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  // Debug: Verifica se o JWT_SECRET está carregado
  if (!process.env.JWT_SECRET) {
    console.error('FALHA CRÍTICA: JWT_SECRET não definido');
    return res.status(500).json({ message: 'Erro de configuração do servidor' });
  }

  // Extrai o token do header
  const authHeader = req.header('Authorization');
  
  // Debug: Verifica se o header existe
  if (!authHeader) {
    console.log('Tentativa de acesso sem header Authorization');
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  // Extrai o token (com tratamento mais seguro)
  const token = authHeader.startsWith('Bearer ') 
    ? authHeader.slice(7) 
    : authHeader;

  // Debug: Verifica formato básico do token
  if (token.split('.').length !== 3) {
    console.log('Token malformado recebido:', token);
    return res.status(400).json({ message: 'Formato de token inválido' });
  }

  try {
    // Verificação com debug detalhado
    console.log('Verificando token com secret:', process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Debug: Verifica payload
    console.log('Token decodificado:', {
      userId: decoded.userId,
      iat: new Date(decoded.iat * 1000),
      exp: new Date(decoded.exp * 1000)
    });

    // Verifica se o token está expirado
    if (decoded.exp < Date.now() / 1000) {
      console.log('Token expirado em:', new Date(decoded.exp * 1000));
      return res.status(401).json({ message: 'Token expirado' });
    }

    // Adiciona informações ao request
    req.userId = decoded.userId;
    next();

  } catch (error) {
    // Tratamento detalhado de erros
    console.error('Falha na autenticação:', {
      error: error.message,
      token: token,
      secretUsed: process.env.JWT_SECRET
    });

    const message = error.name === 'TokenExpiredError' 
      ? 'Token expirado' 
      : 'Token inválido';

    res.status(401).json({ 
      message,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};