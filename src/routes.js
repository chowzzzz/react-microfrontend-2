import React from "react";

const AboutPage = React.lazy(() => import("./pages/AboutPage"));

const routes = [
	{
		path: "/about",
		component: AboutPage
	}
];

export default routes;
