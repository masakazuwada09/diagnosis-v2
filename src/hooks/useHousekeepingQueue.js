import useSWR from "swr";
import Axios from "../libs/axios";

const useHousekeepingQueue = () => {
    const {
		data: pending,
		// error,
		mutate: mutatePending,
	} = useSWR(
		"/v1/clinic/pending-housekeeping",
		() =>
			Axios.get("/v1/clinic/pending-housekeeping")
				.then((res) => {
					console.log("res.data clinic/pending-housekeeping", res.data);
					return res.data;
				})
				.catch((error) => {
					if (error.response.status !== 409) throw error;

					// mutate("/v1/profile/rhu-patient-queue");
				}),
		{
			revalidateIfStale: true,
			revalidateOnFocus: true,
		}
	);

  return {
		pending,
		mutatePending,
	};
}

export default useHousekeepingQueue
