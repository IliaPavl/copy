import React, { useEffect, useMemo, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import RoleServise from '../../servise/funtionService/RoleServise';
import LocalServise from '../../servise/httpServise/LocalServise';
import { LOGIN_ROUTE } from '../../utils/const';
import { authRoutes, publicRoutes } from "./routes";

const AppRouter = () => {
    let [c, setC] = useState(false);
    const navigate = useNavigate();
    const findC = useMemo(() => {
        if (LocalServise.getUserName() !== "error")
            return RoleServise.cheakRole();
        else
            return false;
    }, [])

    useEffect(() => {
        setC(findC);

    }, [findC,navigate])

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