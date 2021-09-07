import React from "react";
import { useHistory } from "react-router-dom";

function Logout() {

    const history = useHistory();

    React.useEffect(() => {
        localStorage.removeItem('state');
        history.push('/login');
    }, []);

    return <></>;
}

export default Logout;