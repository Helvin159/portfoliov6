import { Route, Routes } from 'react-router';
import Outlet from './routes/Outlet';
import Home from './routes/Home';
import About from './routes/About';
import Featured from './routes/Featured';
import Contact from './routes/Contact';

import './css/style.css';

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Outlet />}>
				<Route index element={<Home />} />
				<Route path='about' element={<About />} />
				<Route path='featured' element={<Featured />} />
				<Route path='contact' element={<Contact />} />
			</Route>
		</Routes>
	);
};

export default App;
