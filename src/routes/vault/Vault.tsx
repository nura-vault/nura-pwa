import React from 'react';
import { useHistory } from 'react-router-dom';
import Alert from 'react-s-alert';
import styled from 'styled-components';
import { addPasswordToArchive } from '../../api/Archive';
import { decryptPassword, getVault, removePasswordFromVault } from '../../api/Vault';
import PasswordList from '../../components/PasswordList';
import { useDispatch, useSelector } from '../../store/store';

const Delete = styled.div`
    background-color: #00000000;
    border: none;
    color: grey;

    &:hover {
        color: white
    }
`

function Vault() {

    const history = useHistory();
    const dispatch = useDispatch();

    const mail = useSelector(state => state.auth.mail);
    const token = useSelector(state => state.auth.accessToken);
    const masterToken = useSelector(state => state.auth.masterToken);

    const vault = useSelector(state => state.vault);

    function archivePassword(identifier: string, password: string) {
        removePasswordFromVault(dispatch, history, mail, token, {
            identifier: identifier,
            password: password,
        });

        addPasswordToArchive(dispatch, history, mail, token, {
            identifier: identifier,
            password: password,
        })

        Alert.info('Password archived!', {
            position: 'bottom',
            effect: 'slide',
            timeout: 1500,
        });
    }

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

    const Empty = () => {
        if (vault.length > 0)
            return null;

        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                width: '100%',
                height: '100%',
                color: 'grey'
            }}>
                <i className="bx bxs-data bx-flashing" style={{
                    fontSize: '30px',
                }} />
                <p> vault is empty</p>
            </div>
        );
    }

    React.useEffect(() => {
        getVault(dispatch, history, mail, token);
    }, []);

    return (
        <PasswordList
            empty={<Empty />}
            passwords={vault}
            copy={password => copyPassword(password)}
            controll={
                [
                    {
                        fallback: '/audit',
                        boxicon: 'bx bx-detail',
                        text: 'Audit'
                    },
                    {
                        fallback: '/vault/archive',
                        boxicon: 'bx bxs-archive',
                        text: 'Archive'
                    },
                    {
                        fallback: '/vault/create',
                        boxicon: 'bx bxs-plus-circle',
                        text: 'Add'
                    },
                    {
                        fallback: '/',
                        boxicon: 'bx bxs-home',
                        text: 'Home'
                    },
                    {
                        fallback: '/logout',
                        boxicon: 'bx bx-log-in-circle',
                        text: 'Logout'
                    },
                ]
            }
        >
            {(password) => (<>
                <Delete onClick={event => {
                    archivePassword(password.identifier, password.password)
                }}>
                    <i className='bx bxs-archive-in'></i>
                </Delete>
            </>)}
        </PasswordList>
    );
}

export default Vault;