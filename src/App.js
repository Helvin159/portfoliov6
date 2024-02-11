import { useContext } from 'react';
import { Route, Routes } from 'react-router';
import { UserContext } from './contexts/UserContext';
import Outlet from './Routes/Outlet';

// Main pages
import Home from './Routes/Home';
import About from './Routes/About';
import Contact from './Routes/Contact';
import Featured from './Routes/Featured';
import ProjectDetail from './Routes/ProjectDetail';

// Profile & Nested pages
import Profile from './components/Profile';
import AddNewProject from './Routes/AddNewProject';

// Compiled SCSS
import './css/style.css';

const App = () => {
	const { isAdmin } = useContext(UserContext);

	return (
		<Routes>
			<Route path='/' element={<Outlet />}>
				<Route index element={<Home />} />
				<Route path='about' element={<About />} />
				<Route path='featured' element={<Featured />} />
				<Route path='featured/:projectId' element={<ProjectDetail />} />
				<Route path='contact' element={<Contact />} />

				<Route path='profile' element={<Profile />}>
					{isAdmin !== false && (
						<Route path='new-project' element={<AddNewProject />} />
					)}
				</Route>
			</Route>
		</Routes>
	);
};

export default App;
