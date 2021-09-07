import React from 'react';
import { useHistory } from 'react-router-dom';

interface Props {
    fallback: string
    localStore: string
    inverted?: boolean
}

function Validate(props: Props) {
    const history = useHistory()

    React.useEffect(() => {
        if (props.inverted ? localStorage.getItem(props.localStore) !== null : localStorage.getItem(props.localStore) === null) {
            history.push(props.fallback)
        }
    }, []);

    return <></>;
}

export default Validate