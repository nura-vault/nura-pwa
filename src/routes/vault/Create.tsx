import React from "react"
import styled from "styled-components"
import Alert from 'react-s-alert';
import { generatePassword } from "../../endpoints/Password"
import { addPasswordToVault } from "../../endpoints/Vault"
import { Button, Input } from "../../components/styled/Formular"
import { useDispatch, useSelector } from "../../store/store"
import { useNavigate } from "react-router";

const Container = styled.div`
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25),
        0 10px 10px rgba(0,0,0,0.22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;

    margin-top: 20px;
    height: calc(100vh - 100px);

    display: flex;
    justify-content: space-between;
`

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