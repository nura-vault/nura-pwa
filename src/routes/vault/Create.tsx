import React from "react";
import { useNavigate } from "react-router";
import Alert from 'react-s-alert';
import styled from "styled-components";
import { Container } from "../../components/styled/Container";
import { Button, Input } from "../../components/styled/Formular";
import { generatePassword } from "../../utils/Password";
import { addPasswordToVault } from "../../endpoints/Vault";
import { useDispatch, useSelector } from "../../store/store";

const Parent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;

    min-height: 100vh;
`

const PanelParent = styled.div`
    width: 100%;
    padding: 0, 40px;
    max-height: 100%;
    overflow-y: scroll;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
`

const Panel = styled.div`
    padding: 0, 40px;
    max-height: 100%;
    overflow-y: scroll;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
`


function Create() {

    const identifier: React.RefObject<HTMLInputElement> = React.createRef();
    const website: React.RefObject<HTMLInputElement> = React.createRef();
    const username: React.RefObject<HTMLInputElement> = React.createRef();
    const password: React.RefObject<HTMLInputElement> = React.createRef();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const mail = useSelector(state => state.auth.mail);
    const token = useSelector(state => state.auth.accessToken);
    const masterToken = useSelector(state => state.auth.masterToken);

    function handleGenerate() {
        if (!password.current) return;

        password.current.value = generatePassword(16)
    }

    function handleCreate() {
        if (!identifier.current || !password.current || !username.current || !website.current) return;

        if (identifier.current.value === "" || password.current.value === "") {
            Alert.error('Please fill in all fields', {
                position: 'bottom',
                effect: 'slide'
            });
            return
        }

        addPasswordToVault(dispatch, navigate, mail, token, masterToken, {
            identifier: identifier.current.value,
            website: website.current.value,
            username: username.current.value,
            password: password.current.value,
        })

        navigate("/vault")
    }

    function handleAbort() {
        navigate("/vault")
    }

    return (<>
        <Parent>
            <Container>
                <PanelParent>
                    <Panel>
                        <h1>Create</h1>

                        <Input type="text" placeholder="identifier" ref={identifier} />
                        <Input type="text" placeholder="website" ref={website} />
                        <Input type="text" placeholder="username" ref={username} />
                        <Input type="password" placeholder="password" ref={password} />

                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "space-between",
                        }}>
                            <Button onClick={handleCreate}>Create</Button>
                            <Button onClick={handleGenerate}><i className='bx bx-dialpad-alt' /></Button>
                            <Button onClick={handleAbort}>Abort</Button>
                        </div>

                    </Panel>
                </PanelParent>
            </Container>
        </Parent>
    </>)
}

export default Create