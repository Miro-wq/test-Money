import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../src/components/App/App';
import store from './redux/Store';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);
const basename = process.env.NODE_ENV === 'production' ? '/test-Money' : '/';

root.render(
  <Provider store={store}>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </Provider>
);
