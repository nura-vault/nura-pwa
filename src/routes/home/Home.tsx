import React from 'react';
import Validate from '../../components/Validate';

function Home() {

    return (<>
        <Validate
            localStore={"state"}
            fallback={"/vault"}
            inverted={true}
        />
        <Validate
            localStore={"state"}
            fallback={"/login"}
        />
    </>);
}

export default Home;