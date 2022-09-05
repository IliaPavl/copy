import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { authRoutes, publicRoutes } from "../../routes";
import UserServise from '../../servise/funtionService/UserServise';
import UserHttpServise from '../../servise/httpServise/UserHttpServise';
import { toast } from 'react-toastify';
import LocalServise from '../../servise/httpServise/LocalServise';

const AppRouter = () => {
    const [c, setC] = useState(false);

    useEffect(() => {
        if (LocalServise.getAccesToken() !== null)
        UserHttpServise.userRole().then((respons) => {
            let k= UserServise.setRRoleUser(respons);
            for(let i=0;i<k.length;k++)
            if(k[i].item === "Руководитель")
            setC(true)
        }).catch((error) => {
            let message = error.request.responseText.split('"');
            toast.error(message[3]);
        })

    },[])

    useEffect(() => {

    }, [c])


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