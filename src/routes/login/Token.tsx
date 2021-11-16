import { SHA256 } from "crypto-js";
import React from "react";
import { useNavigate } from "react-router-dom";
import Alert from 'react-s-alert';
import styled from "styled-components";
import { Button, Container, Input, Parent } from "../../components/styled/Formular";
import { auth } from "../../store/authSlice";
import { useDispatch } from "../../store/store";

const LeftPanel = styled.div`
    width: 50%;
    padding: 40px;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: center;
`

const RightPanel = styled.div`
	width: 50%;
	min-height: 100%;
	overflow: hidden;

    padding: 40px;

    background: #FF416C;
    background: linear-gradient(to right, #FF4B2B, #FF416C);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
`

function Token() {

    const token: React.RefObject<HTMLInputElement> = React.createRef();

    const dispatch = useDispatch();
    const navigator = useNavigate();

    function submitToken() {
        if (!token.current)
            return;

        if (!token.current.value) {
            Alert.error('Token is required', {
                position: 'bottom',
                effect: 'slide',
                timeout: 1500
            });
            return;
        }

        dispatch(auth.setMasterToken(SHA256(token.current.value).toString()));
        navigator('/vault');
    }

    return (
        <Parent>
            <Container>
                <LeftPanel>
                    <h1>Enter Token:</h1>
                    <Input type="password" placeholder="token" ref={token} />
                    <Button onClick={submitToken}>Enter</Button>
                </LeftPanel>
                <RightPanel>
                    <h1>What is a master token?</h1>
                    <p> Your master token is the key to decrypt all your passwords. Make sure to <b>NOT</b>: </p>
                    <ul>
                        <li> re-use your login password </li>
                        <li> save your master token somewhere unsecure </li>
                        <li> share your master token with anyone else </li>
                    </ul>
                    <p>
                        The master token <b>cannot be restored</b>.
                        In case you lose or forget your master token,
                        there is no way of helping you in restoring your passwords.
                    </p>
                    <p> The master token can be whatever you want </p>
                </RightPanel>
            </Container>
        </Parent>
    );
}

export default Token;