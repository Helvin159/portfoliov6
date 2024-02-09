import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ScrollToTop from './utils/ScrollToTop';
import { BrowserRouter } from 'react-router-dom';
import { PortfolioProvider } from './contexts/PortfolioContext';
import { MobileMenueProvider } from './contexts/MobileMenuContext';
import { ProjectsProvider } from './contexts/ProjectsContext';
import { UserProvider } from './contexts/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<MobileMenueProvider>
			<BrowserRouter>
				<ScrollToTop>
					<UserProvider>
						<PortfolioProvider>
							<ProjectsProvider>
								<App />
							</ProjectsProvider>
						</PortfolioProvider>
					</UserProvider>
				</ScrollToTop>
			</BrowserRouter>
		</MobileMenueProvider>
	</React.StrictMode>
);
