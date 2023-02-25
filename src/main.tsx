import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import './styles/index.css'
import { LandingPage } from './pages/landing'
import LoginPage from './pages/login'
import { AppBasePath } from './misc/misc'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children:
		[
			{
				path: `${AppBasePath}`,
				element: <LandingPage />
			},
			{
				path: `${AppBasePath}login`,
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
  
