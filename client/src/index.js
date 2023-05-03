import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// import { applyMiddleware, compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
// import reduxThunk from 'redux-thunk';
import './index.css';
import App from './App';

//reducers:
import auth from './reducers/auth';
import profile from './reducers/profile';
import posts from './reducers/posts';
import navbar from './reducers/navbar';
// import reducers from './reducers';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;  - happens auto in react 18

const store = configureStore({
  reducer: {
    auth,
    navbar,
    profile,
    posts
  }
  // composeEnhancers(applyMiddleware(reduxThunk)) - happens auto in react 18
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
