import React from "react";
import { offline } from "../store/offlineSlice";
import { useDispatch, useSelector } from "../store/store";

interface Props {
    action?: () => void;
}

const Connected: React.FunctionComponent<Props> = (props) => {

    const requests = useSelector(state => state.offline)
    const dispatch = useDispatch()

    React.useEffect(() => {
        if (!navigator.onLine)
            return;

        var error = false;
        requests.map(entry => fetch(entry.host, entry.data).catch(() => error = true))
        !error && dispatch(offline.clearRequests())

        props.action && props.action();
    }, []);

    if (navigator.onLine)
        return <> {props.children} </>;

    return null;
}

export default Connected;