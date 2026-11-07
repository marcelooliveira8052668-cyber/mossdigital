// Importa o React para interpretar os componentes em JSX.
import React from 'react';
// Importa a função que monta o aplicativo no documento HTML.
import { createRoot } from 'react-dom/client';
// Importa rotas com hash, que funcionam em hospedagens estáticas.
import { HashRouter } from 'react-router-dom';
// Importa o componente que organiza a aplicação.
import App from './App.jsx';
// Carrega apenas o CSS exclusivo da MOSS CITY.
import './styles/city.css';
// Liga a aplicação ao elemento root e ativa verificações de desenvolvimento.
createRoot(document.getElementById('root')).render(<React.StrictMode><HashRouter><App /></HashRouter></React.StrictMode>);
