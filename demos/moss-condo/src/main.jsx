// Importa o React, necessário para interpretar os componentes escritos em JSX.
import React from 'react';
// Importa a função que conecta a aplicação ao documento HTML.
import { createRoot } from 'react-dom/client';
// Importa o roteador com endereços que funcionam em hospedagens estáticas.
import { HashRouter } from 'react-router-dom';
// Importa a aplicação principal da demonstração.
import App from './App.jsx';
// Carrega somente os estilos exclusivos da MOSS CONDO.
import './styles/condo.css';
// Monta o aplicativo dentro do elemento root e ativa verificações de desenvolvimento.
createRoot(document.getElementById('root')).render(<React.StrictMode><HashRouter><App /></HashRouter></React.StrictMode>);
