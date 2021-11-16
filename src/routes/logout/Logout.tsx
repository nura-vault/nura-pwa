import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {

    const navigate = useNavigate();

    React.useEffect(() => {
        localStorage.removeItem('state');
        navigate('/login');
    }, []);

    return <></>;
}

export default Logout;