import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useNetworkStatus = () => {
	const [mounted, setMounted] = useState(0);
	const [isOnline, setOnline] = useState(true);

	const updateNetworkStatus = () => {
		if (!navigator.onLine) {
			toast.error("No internet connection!");
		} else {
			if (mounted) {
				toast.success("Internet connection restored!");
			}
		}
		setOnline(navigator.onLine);
	};

	//   sometimes, the load event does not trigger on some browsers, that is why manually calling updateNetworkStatus on initial mount
	useEffect(() => {
		let t = setTimeout(() => {
			setMounted(1);
			updateNetworkStatus();
		}, 1000);
		return () => {
			clearTimeout(t);
		};
	}, []);

	useEffect(() => {
		window.addEventListener("load", updateNetworkStatus);
		window.addEventListener("online", updateNetworkStatus);
		window.addEventListener("offline", updateNetworkStatus);

		return () => {
			window.removeEventListener("load", updateNetworkStatus);
			window.removeEventListener("online", updateNetworkStatus);
			window.removeEventListener("offline", updateNetworkStatus);
		};
	}, [navigator.onLine]);

	return { isOnline };
};

export default useNetworkStatus;
