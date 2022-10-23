import React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Search from "../routes/vault/Search";
import { Password } from "../store/vaultSlice";
import { Container } from "./styled/Container";
import { Icon } from "./styled/Icon";

const Parent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    align-content: center;

    height: 100vh;
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

const RightPanel = styled.div`
	width: 50%;
	overflow: hidden;

    padding: 40px;

    background: #FF416C;
    background: linear-gradient(to right, #FF4B2B, #FF416C);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;

    animation: fadeIn 0.5s;

    @keyframes fadeIn {
        0% {
            transform: translate(50%, 0);
        }
        100% {
            transform: translate(0, 0);
        }
    }

    display: flex;
    flex-direction: column;
`

const Button = styled.button`
    background-color: #00000000;
    border: none;
    width: 100%;
    min-height: 50px;
    color: white;
    font-family: 'Montserrat', sans-serif;

    &:hover {
        background-color: #ffffff08 !important;
    }
`

const IconContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Favicon = styled.img`
    border-radius: 50%;
    animation: show 2s;

    @keyframes show {
        0%, 80% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`

const ControllContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
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
    // margin-top: -10px;
`

const SelectableText = styled.div`
    user-select: text;
`

const Link = styled.a`
    color: white;
`

interface Controll {
    fallback: string,
    boxicon: string,
    text: string
}

interface Props {
    children?: (password: Password) => React.ReactNode,
    passwords?: Password[]
    copy?: (password: string) => void
    empty?: React.ReactElement
    controll?: Controll[]
}


function useWindowSize() {
    const [size, setSize] = React.useState([0, 0]);
    React.useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

function PasswordList(props: Props) {

    const information: React.RefObject<HTMLDivElement> = React.createRef();

    const [selected, setSelected] = React.useState<Password>()
    const [width, height] = useWindowSize();
    const [searching, setSearching] = React.useState(false)

    useHotkeys('ctrl+space', () => {
        setSearching(true)
    })

    useHotkeys('enter,escape', () => {
        setSearching(false)
    })

    const navigate = useNavigate()

    function copyPassword(password: string) {
        props.copy && props.copy(password);
    }

    function selectPassword(password: Password) {
        if (!information.current) {
            copyPassword(password.password);
            return
        }

        if (selected?.identifier === password.identifier && selected.password === password.password) {
            copyPassword(password.password);
            return;
        }

        setSelected(password);
    }

    function selectDefault() {
        if (!props.passwords || props.passwords.length === 0 || !information.current) {
            setSelected(undefined);
            return;
        }

        const firstPassword = props.passwords[0];
        setSelected(firstPassword);
    }

    React.useEffect(() => {
        selectDefault();
    }, [width, height]);

    React.useEffect(() => {
        props.passwords?.forEach(password => {
            fetch(`https://grepcon.micartey.dev/api/v1/favicon?url=${password.website}&fallback=/transparent.png`, {
                method: 'GET',
            })
                .then(response => response.text())
                .then(response => {
                    const element = document.getElementById(password.identifier + password.password) as any
                    element.src = response
                })
        })
    }, [])

    const SearchPopup = () => {
        if (searching)
            return <Search />
        return null;
    }

    const InformationPanel = () => {
        if (width < 600 || props.passwords?.length === 0) return null;

        return (
            <RightPanel ref={information}>
                <SelectableText>
                    <h2 style={{
                        margin: 0,
                        padding: 0
                    }}> {selected?.username} </h2> <br />
                    <p style={{
                        margin: 0,
                        padding: 0,
                        fontSize: '10px'
                    }}> Website: </p>
                    <Link href={selected?.website} target="_blank"> {selected?.website} </Link> <br />
                    <p style={{
                        margin: 0,
                        padding: 0,
                        fontSize: '15px',
                        position: "absolute",
                        bottom: '10px'
                    }}> Click again to copy password! </p>
                </SelectableText>
            </RightPanel>
        );
    }

    return (<>
        <SearchPopup />
        <Parent>
            <Container>
                <Panel>
                    {!props.passwords || props.passwords.length === 0 ? props.empty : null}
                    {props.passwords && props.passwords.map(password => {
                        return (
                            <Button key={password.identifier + password.password} type="button" onClick={() => selectPassword(password)} style={{
                                backgroundColor: selected?.identifier === password.identifier && selected.password === password.password ?
                                    "#ffffff21" :
                                    "#00000000",
                            }}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    maxHeight: '100%'
                                }}>
                                    <IconContainer>
                                        <Favicon
                                            id={password.identifier + password.password}
                                            src={'/transparent.png'}
                                            height="30px"
                                            width="30px"
                                        />
                                    </IconContainer>
                                    <Text>
                                        {password.identifier} <br />
                                        *********
                                    </Text>
                                    <ControllContainer onClick={event => {
                                        if (event.target === event.currentTarget)
                                            return;

                                        event.stopPropagation();

                                        if (selected?.identifier === password.identifier && selected.password === password.password)
                                            selectDefault();
                                    }}>
                                        {props.children && props.children(password)}
                                    </ControllContainer>
                                </div>
                            </Button>
                        )
                    })}
                </Panel>
                <InformationPanel />
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
    </>);
}

export default PasswordList;