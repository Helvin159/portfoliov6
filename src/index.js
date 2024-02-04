import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { MobileMenueProvider } from './contexts/MobileMenuContext';
import ScrollToTop from './utils/ScrollToTop';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<MobileMenueProvider>
			<BrowserRouter>
				<ScrollToTop>
					<App />
				</ScrollToTop>
			</BrowserRouter>
		</MobileMenueProvider>
	</React.StrictMode>
);
