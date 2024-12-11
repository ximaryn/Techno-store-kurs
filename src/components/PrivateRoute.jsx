import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase"; // Подключаем ваш firebase.js

const PrivateRoute = ({ children }) => {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <p>Загрузка...</p>; // Показать что-то, пока данные загружаются
    }

    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
