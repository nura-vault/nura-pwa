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
    
    const [passwordLength, setPasswordLength] = React.useState<number>(16);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const mail = useSelector(state => state.auth.mail);
    const token = useSelector(state => state.auth.accessToken);
    const masterToken = useSelector(state => state.auth.masterToken);

    function handleGenerate() {
        if (!password.current) return;

        password.current.value = generatePassword(passwordLength)
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

    function updatePasswordLength(event: React.ChangeEvent<HTMLInputElement>) {
        if (Number(event.target.value) <= 0) {
            Alert.error('Password length must be greater than 0', {
                position: 'bottom',
                effect: 'slide'
            })
            return
        }

        if (Number(event.target.value) > 32) {
            Alert.error('Password is too long', { 
                position: 'bottom',
                effect: 'slide'
            })
            return
        }

        if (Number(event.target.value) < 8) {
            Alert.warning('Password is insecure with a length of less than 8 characters', { 
                position: 'bottom',
                effect: 'slide'
            })
        }

        setPasswordLength(Number(event.target.value))
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

                        <Input type="number" name="points" value={passwordLength} onChange={updatePasswordLength} step="2" />

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