import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Container } from "./styled/Container";

const Parent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    align-content: center;

    min-height: 100vh;
`

const Panel = styled.div`
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

const Button = styled.button`
    background-color: #00000000;
    border: none;
    width: 100%;
    min-height: 50px;
    color: white;
    font-family: 'Montserrat', sans-serif;

    &:hover {
        border-top: 1px solid grey;
        border-bottom: 1px solid grey;
    }
`

const DeleteContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;

    width: 100%;

    margin-top: -50px;
`

const ControllContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    width: min(100%, 650px);
    height: 80px;
`

const ControllButton = styled.button`
    background-color: #00000000;
    border: none;

    color: grey;

    &:hover {
        color: white;
    }

    p {
        padding: 0;
        margin: 0;
    }
`

const Text = styled.p`
    margin-top: -10px;
`

interface Controll {
    fallback: string,
    boxicon: string,
    text: string
}

interface Password {
    identifier: string
    password: string
}

interface Props {
    children?: (password: Password) => React.ReactNode,
    passwords?: Password[]
    copy?: (password: string) => void
    empty?: React.ReactElement
    controll?: Controll[]
}

function PasswordList(props: Props) {

    const history = useHistory()

    function copyPassword(password: string) {
        props.copy && props.copy(password);
    }

    return (
        <Parent>
            <Container>
                <Panel>
                    {!props.passwords || props.passwords.length === 0 ? props.empty : null}
                    {props.passwords && props.passwords.map(password => {
                        return (
                            <Button key={password.identifier + password.password} onClick={() => copyPassword(password.password)}>
                                <div>
                                    <Text>
                                        {password.identifier} <br />
                                        *********
                                    </Text>
                                    <DeleteContainer>
                                        {props.children && props.children(password)}
                                    </DeleteContainer>
                                </div>
                            </Button>
                        )
                    })}
                </Panel>
            </Container>
            <ControllContainer>
                {props.controll && props.controll.map(controll => {
                    return (
                        <ControllButton key={controll.fallback} onClick={() => history.push(controll.fallback)}>
                            <i className={controll.boxicon} style={{
                                fontSize: '25px'
                            }} />
                            <Text>{controll.text}</Text>
                        </ControllButton>
                    )
                })}
            </ControllContainer>
        </Parent>
    );
}

export default PasswordList;