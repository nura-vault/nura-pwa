import React from "react";
import styled from "styled-components";

const SetupParent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: fixed;
    color: grey;
    height: fit-content;
    max-height: 500px;
    width: 700px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 20px;
    border-radius: 10px;
    z-index: 2;
`

const SetupBackground = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(20px);
    width: 200vw;
    height: 200vh;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
`

const Popup: React.FunctionComponent = (props) => {

    return (<>
        <SetupBackground />
        <SetupParent>
            {props.children}
        </SetupParent>
    </>);
}

export default Popup;