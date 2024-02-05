import { Route, Routes } from 'react-router';
import Outlet from './Routes/Outlet';
import Home from './Routes/Home';
import About from './Routes/About';
import Featured from './Routes/Featured';
import Contact from './Routes/Contact';

import './css/style.css';
import ProjectDetail from './Routes/ProjectDetail';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Outlet />}>
				<Route index element={<Home />} />
				<Route path='about' element={<About />} />
				<Route path='featured' element={<Featured />} />
				<Route path='featured/:projectId' element={<ProjectDetail />} />
				<Route path='contact' element={<Contact />} />
			</Route>
		</Routes>
	);
};

export default App;
