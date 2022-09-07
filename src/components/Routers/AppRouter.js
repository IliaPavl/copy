import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { authRoutes, publicRoutes } from "../../routes";
import PageServise from '../../servise/funtionService/PageServise';
import RoleServise from '../../servise/funtionService/RoleServise';
import LocalServise from '../../servise/httpServise/LocalServise';

const AppRouter = () => {
    const [c, setC] = useState(false);
    let [page, setPage] = useState('');

    useEffect(() => {
        if (LocalServise.getAccesToken() !== null)
            RoleServise.cheakRole().then(res => setC(res))
    }, [c])

    useEffect(() => {
        if (page === '') {
            if (LocalServise.getAccesToken() !== null)
                setPage(LocalServise.getLastPage())
        }
        else {
            const url = PageServise.cheakUrl(c);
            PageServise.redirectLastPage(url);
        }
    }, [])

    return (
        <Routes>
            {c && authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} exact />
            )}
            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component />} exact />
            )}
        </Routes>
    );
};

export default AppRouter;