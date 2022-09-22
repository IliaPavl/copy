import React, { useEffect, useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { authRoutes, publicRoutes } from "../../routes";
import PageServise from '../../servise/funtionService/PageServise';
import RoleServise from '../../servise/funtionService/RoleServise';
import LocalServise from '../../servise/httpServise/LocalServise';

const AppRouter = () => {
    let [c, setC] = useState(false);
    let [page, setPage] = useState('');

    const findC = useMemo(() => {
        if(LocalServise.getUserName()!== "error")
        return RoleServise.cheakRole();
        else 
        return false;
    }, [])

    const findP = useMemo(() => {
        return LocalServise.getLastPage();
    }, [])

    useEffect(() => {
        setC(findC);
    }, [findC])

    useEffect(() => {
        setPage(findP);
    }, [findP])

    useEffect(() => {
        if(LocalServise.getUserName()!== "error")
        {
            if (page === '') {
            if (LocalServise.getAccesToken() !== null)
                setPage(LocalServise.getLastPage())
        }
        else {
            const url = PageServise.cheakUrl(c,page);
            PageServise.redirectLastPage(url);
        }}
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

export default React.memo(AppRouter);