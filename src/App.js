import { Route, Routes } from 'react-router';
import Outlet from './Routes/Outlet';

// Main pages
import Home from './Routes/Home';
import About from './Routes/About';
import Contact from './Routes/Contact';
import Featured from './Routes/Featured';
import ProjectDetail from './Routes/ProjectDetail';

// Profile & Nested pages
import Profile from './Routes/Profile';
import AddNewProject from './Routes/AddNewProject';

// Compiled SCSS
import './css/style.css';
import Hero from './components/Hero';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Outlet />}>
				<Route index element={<Home />} />
				<Route path='about' element={<About />} />
				<Route path='featured' element={<Featured />} />
				<Route path='featured/:projectId' element={<ProjectDetail />} />
				<Route path='contact' element={<Contact />} />

				<Route path='profile' element={<Profile />} />
				<Route path='profile/new-project' element={<AddNewProject />} />
				<Route
					path='profile/update-bio'
					element={<Hero text={'Coming soon'} />}
				/>
				<Route
					path='profile/edit-projects'
					element={<Hero text={'Coming soon'} />}
				/>
				<Route
					path='profile/edit-projects/:projectId'
					element={<Hero text={'Coming soon'} />}
				/>
			</Route>
		</Routes>
	);
};

export default App;
