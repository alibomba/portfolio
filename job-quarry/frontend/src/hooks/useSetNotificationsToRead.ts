import { useDispatch } from "react-redux";
import { setIsSomethingNew } from "../state/notificationSlice";
import { AppDispatch } from "../state/store";
import { useMutation } from "@apollo/client";
import { SET_NOTIFICATIONS_TO_READ } from "../graphql/mutations";
import { GET_MY_NOTIFICATIONS } from "../graphql/queries";

function useSetNotificationsToRead() {
    const dispatch = useDispatch<AppDispatch>();
    const [notificationsMutation] = useMutation(SET_NOTIFICATIONS_TO_READ, { refetchQueries: [{ query: GET_MY_NOTIFICATIONS }] });

    return async function () {
        dispatch(setIsSomethingNew(false));
        await notificationsMutation();
    }
}

export default useSetNotificationsToRead;