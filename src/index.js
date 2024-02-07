import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { PortfolioProvider } from './contexts/PortfolioContext';
import { MobileMenueProvider } from './contexts/MobileMenuContext';
import ScrollToTop from './utils/ScrollToTop';
import { ProjectsProvider } from './contexts/ProjectsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<MobileMenueProvider>
			<BrowserRouter>
				<ScrollToTop>
					<PortfolioProvider>
						<ProjectsProvider>
							<App />
						</ProjectsProvider>
					</PortfolioProvider>
				</ScrollToTop>
			</BrowserRouter>
		</MobileMenueProvider>
	</React.StrictMode>
);
