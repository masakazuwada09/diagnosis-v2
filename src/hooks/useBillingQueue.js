import React from 'react'
import useSWR from 'swr';
import Axios from '../libs/axios';

const useBillingQueue = () => {
    const {
		data: pending,
		// error,
		mutate: mutatePending,
	} = useSWR(
		"/v1/clinic/pending-billing",
		() =>
			Axios.get("/v1/clinic/pending-billing")
				.then((res) => {
					console.log("res.data clinic/pending-billing", res.data);
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

export default useBillingQueue
