import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Container } from "./styled/Container";
import { Icon } from "./styled/Icon";

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

export const Controll = styled.div`
    background-color: #00000000;
    border: none;
    color: grey;

    margin-left: 10px;

    &:hover {
        color: white
    }
`

const NavContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    width: min(100%, 650px);
    height: 80px;
`

const NavButton = styled.button`
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

interface Props {
    controll?: Controll[]
}

const ContainerList: React.FunctionComponent<Props> = (props) => {

    const navigate = useNavigate()

    return (
        <Parent>
            <Container>
                <Panel>
                    {props.children}
                </Panel>
            </Container>
            <NavContainer>
                {props.controll && props.controll.map(controll => {
                    return (
                        <NavButton key={controll.fallback} onClick={() => navigate(controll.fallback)}>
                            <Icon className={controll.boxicon} />
                            <Text>{controll.text}</Text>
                        </NavButton>
                    )
                })}
            </NavContainer>
        </Parent>
    );
}

export default ContainerList;