import React from "react";
import { useContext } from "react";
import HeroSection from "./components/HeroSection";
import { AppContext, useProductContext } from "./context/productcontext";

const About = () => {
	const { featureProducts, products } = useProductContext();
	const data = {
		name: "Prince Commerce",
	};
	return <HeroSection myData={data} />;
};

export default About;
