import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Home.css";

function Home() {

    const navigate = useNavigate();

    React.useEffect(() => {
        navigate("/vault")
    }, [])

    return <></>
}

export default Home;
