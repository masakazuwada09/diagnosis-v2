/* eslint-disable react/prop-types */
import useSWR from 'swr';
import Axios from '../libs/axios';

const fetcher = (url, params) => Axios.get(url, { params }).then(res => res.data);

const useSurgeryQueue = () => {
    const getSurgeryQueue = (status) => {
        return useSWR(
            ['/v1/anesthesia/get-surgery-queue', status],
            ([url, status]) => fetcher(url, { status }),
            {
                revalidateIfStale: false,
                revalidateOnFocus: true,
                dedupingInterval: 3000,
            }
        );
    };

    // const { data: waitingRoom, mutate: mutateWaitingRoom } = getAnesthesiaQueue("For Operation");
    const { data: surgeryRoom, mutate: mutateSurgeryRoom } = getSurgeryQueue("Surgery Room");
    const { data: resu, mutate: mutateResu } = getSurgeryQueue("RESU");
    const { data: done, mutate: mutateDone } = getSurgeryQueue("DONE");

    return {
        // waitingRoom,
        // mutateWaitingRoom,
        surgeryRoom,
        mutateSurgeryRoom,
        resu,
        mutateResu,
        done,
        mutateDone,
    };
};

export default useSurgeryQueue;
