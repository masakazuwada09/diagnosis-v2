import React from "react";
import { lineWobble } from 'ldrs'





// Default values shown







const LoadingScreen = () => {
	lineWobble.register()




	return (
		<div className="absolute top-0 left-0 w-full h-full rounded-2xl bg-gray-100 backdrop-blur flex items-center justify-center bg-opacity-50">
		
<l-line-wobble
  size="80"
  stroke="5"
  bg-opacity="0.1"
  speed="1.75" 
  color="gray" 
></l-line-wobble>

		</div>
	);
};

export default LoadingScreen;
