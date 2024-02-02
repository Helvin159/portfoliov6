import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { MobileMenueProvider } from './contexts/MobileMenuContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<MobileMenueProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</MobileMenueProvider>
	</React.StrictMode>
);
