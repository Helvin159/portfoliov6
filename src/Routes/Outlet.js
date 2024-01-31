import React from 'react';
import { Outlet as Layout } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Outlet = () => {
	return (
		<>
			<Header />
			<main>
				<Layout />
			</main>
			<Footer />
		</>
	);
};

export default Outlet;
