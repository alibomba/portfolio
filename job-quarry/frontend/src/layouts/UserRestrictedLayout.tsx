import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Navigate } from "react-router-dom";

import DefaultLayout from "./DefaultLayout";
import Loading from "../components/loading/Loading";

const UserRestrictedLayout = () => {
    const { isAuthorized, isLoading, isCompany } = useSelector((state: RootState) => state.auth);

    if (isLoading) {
        return <Loading />
    }

    if (!isLoading && (!isAuthorized || isCompany)) {
        return <Navigate to='/logowanie' />
    }

    return (
        <DefaultLayout />
    )
}

export default UserRestrictedLayout
