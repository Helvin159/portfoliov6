import { Route, Routes } from 'react-router';
import { useContext } from 'react';
import { UserContext } from './contexts/UserContext';
import Outlet from './Routes/Outlet';
import Home from './Routes/Home';
import About from './Routes/About';
import Featured from './Routes/Featured';
import Contact from './Routes/Contact';
import ProjectDetail from './Routes/ProjectDetail';
import AddNewProject from './Routes/AddNewProject';

import './css/style.css';

const App = () => {
	const user = useContext(UserContext);

	return (
		<Routes>
			<Route path='/' element={<Outlet />}>
				<Route index element={<Home />} />
				<Route path='about' element={<About />} />
				<Route path='featured' element={<Featured />} />
				<Route path='featured/:projectId' element={<ProjectDetail />} />
				<Route path='contact' element={<Contact />} />

				{user.isAdmin !== false && (
					<Route path='new-project' element={<AddNewProject />} />
				)}
			</Route>
		</Routes>
	);
};

export default App;
