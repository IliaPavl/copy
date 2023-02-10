import React, { useEffect, useMemo, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import RoleServise from '../../servise/funtionService/RoleServise';
import LocalServise from '../../servise/httpServise/LocalServise';
import { HOME_PAGE, LOGIN_ROUTE } from '../../utils/const';
import { authRoutes, noVladelRoutes, publicRoutes } from "./routes";

const AppRouter = () => {
    let [c, setC] = useState(false);
    const navigate = useNavigate();
    const findC = useMemo(() => {
        if (LocalServise.getUserName() !== "error")
            return RoleServise.cheakRole();
        else
            return false;
    }, [])

    let [isData, setIsData] = useState();
    useEffect(() => {
        if (LocalServise.getUserName() !== "error")
            setC(RoleServise.cheakRole());
        else
            setC(false);

        if (c === false) {
            if (LocalServise.getLastPage() !== null) {
                let routeValu = "/" + LocalServise.getLastPage().split('/')[3];
                let routeValu2 = routeValu + "/:searchValue"
                let v;
                for (let i = 0; i < noVladelRoutes.length; i++) {
                    if (routeValu === noVladelRoutes[i].path || routeValu2 === noVladelRoutes[i].path) {
                        v = true;
                        break;
                    }
                    else
                        v = false;
                }
                setIsData(v);
            } else {
                setIsData(false);
                navigate(LOGIN_ROUTE)
            }

        }
    }, [findC, navigate])

    useEffect(() => {
        if (isData !== null)
            if (isData !== undefined)
                if (isData === false) {
                    if (LocalServise.getUserName() !== "error")
                        navigate(HOME_PAGE)
                    else
                        navigate(LOGIN_ROUTE)
                    setIsData(true);
                }
    }, [isData])

    return (
        <Routes>
            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} exact />
            )}
            {c && authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} exact />
            )}
        </Routes>
    );
};

export default React.memo(AppRouter);