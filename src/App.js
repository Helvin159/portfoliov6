import { Route, Routes } from 'react-router';
import Outlet from './Routes/Outlet';
import Home from './Routes/Home';
import About from './Routes/About';
import Featured from './Routes/Featured';
import Contact from './Routes/Contact';

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
