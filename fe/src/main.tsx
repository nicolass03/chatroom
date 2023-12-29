import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './apolloClient.ts'
// import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store.ts';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import Login from './components/Login/Login.tsx';
import { PersistGate } from 'redux-persist/integration/react';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <script src="http://localhost:8097"></script>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
      <ApolloProvider client={apolloClient}>
        <RouterProvider router={router} />
      </ApolloProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
