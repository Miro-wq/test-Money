import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../src/components/App/App';
import store from './redux/Store';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);
const basename =
  process.env.NODE_ENV === 'production' ? '/team1_MoneyGuard' : '/';

root.render(
  <Provider store={store}>
    <HashRouter basename={basename}>
      <App />
    </HashRouter>
  </Provider>
);
