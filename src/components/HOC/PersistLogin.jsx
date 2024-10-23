import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { saveAuthData } from '../../features/authData/authDataSlice';
import ReactLoading from "react-loading";
import { refresh } from "../../api/endpoints/auth";

export default function PersistLogin() {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function refreshToken() {
            try {
                const response = await refresh();
                dispatch(saveAuthData({
                    accessToken: response.data.accessToken,
                    userData: response.data.userData,
                    userRole: response.data.userRole,
                }));
                // eslint-disable-next-line no-unused-vars
            } catch (error) {
                /* */
            } finally {
                setLoading(false);
            }
        }
        refreshToken();
    }, [dispatch]);

    return loading ? (
        <div className="w-screen h-screen flex justify-center items-center">
            <ReactLoading type='balls' color="black" height={200} width={110} />
        </div>
    ) : (
        <Outlet />
    );
}
