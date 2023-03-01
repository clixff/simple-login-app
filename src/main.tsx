import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import LandingPage from './pages/landing';
import LoginPage from './pages/login';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './styles/index.css';

/**
 * Use HashRouter instead of BrowserRouter because of GitHub Pages
 */
const router = createHashRouter([ {
		path: '/',
		element: <App />,
		children:
		[
			{
				path: `/`,
				element: <LandingPage />
			},
			{
				path: `/login`,
				element: <LoginPage />
			}
		],
	}
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
)
  