import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
    fallback?: string
    localStore: string
    inverted?: boolean
    children?: React.ReactNode
}

function Validate(props: Props) {
    const navigate = useNavigate()

    function flag() {
        return props.inverted ? localStorage.getItem(props.localStore) !== null : localStorage.getItem(props.localStore) === null;
    }

    React.useEffect(() => {
        if (flag()) {
            if (props.fallback)
                navigate(props.fallback)
        }
    }, []);

    const Render = () => {
        if (flag())
            return <>{props.children}</>;
        else
            return <></>;
    }

    return <><Render /></>;
}

export default Validate