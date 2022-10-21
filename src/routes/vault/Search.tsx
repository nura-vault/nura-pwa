import React from "react";
import styled from "styled-components";
import Popup from "../../components/Popup";
import { Container } from "../../components/styled/Container";
import { decryptPassword } from "../../endpoints/Vault";
import { useSelector } from "../../store/store";
import Alert from 'react-s-alert';

const SearchBar = styled.input`
    height: 40px;
    font-size: 20px;

    background-color: transparent;
    color: grey;

    border-left: none;
    border-right: none;
    border-top: none;
    border-color: grey;

    outline: none;
`

const Button = styled.button`
    border: none;
    width: 100%;
    min-height: 50px;
    color: white;
    font-family: 'Montserrat', sans-serif;

    &:hover {
        background-color: #ffffff08 !important;
    }
`

const Text = styled.p`
    margin-top: 20px;
`

const Search: React.FunctionComponent<any> = (props) => {

    const [search, setSearch] = React.useState("")

    const masterToken = useSelector(state => state.auth.masterToken);

    const archive = useSelector(state => state.archive);
    const vault = useSelector(state => state.vault);

    const searchBox: React.RefObject<HTMLInputElement> = React.createRef()

    async function copyPassword(password: string) {
        const decrypted = decryptPassword(password, masterToken);

        if (decrypted.length <= 0) {
            Alert.warning('Password could not be decrypted', {
                position: 'bottom',
                effect: 'slide',
                timeout: 1500,
            });
            return;
        }

        await navigator.clipboard.writeText(decrypted);
        Alert.success('Password copied to clipboard', {
            position: 'bottom',
            effect: 'slide',
            timeout: 1500,
        });
    }

    return <Popup>
        <SearchBar type="text" ref={searchBox} onChange={e => setSearch(e.target.value.toLocaleLowerCase())} placeholder=">" autoFocus={true} />
        {search.length > 0 &&
            <Container>
                <div style={{
                    width: '100%',
                    overflowY: 'scroll'
                }}>
                    {
                        [...vault].concat(archive).filter(password => {
                            return password.identifier.toLowerCase().includes(search)
                                || password.website.toLowerCase().includes(search)
                        }).map(password => {
                            return <Button key={password.identifier + password.password} onClick={() => {copyPassword(password.password)}} style={{
                                backgroundColor: "#21212121"
                            }}>
                                <Text>
                                    {password.identifier} <br />
                                    {password.username}
                                </Text>
                            </Button>
                        })
                    }
                </div>
            </Container>
        }
    </Popup>
}

export default Search