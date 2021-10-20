import React from 'react';
import { useHistory } from 'react-router-dom';
import Alert from 'react-s-alert';
import styled from 'styled-components';
import { getArchive, removePasswordFromArchive } from '../../endpoints/Archive';
import { addPasswordToVault, decryptPassword } from '../../endpoints/Vault';
import PasswordList from '../../components/PasswordList';
import { useDispatch, useSelector } from '../../store/store';
import { Password } from '../../store/vaultSlice';

const Delete = styled.div`
    background-color: #00000000;
    border: none;
    color: grey;

    margin-left: 10px;

    &:hover {
        color: white
    }
`

function Archive() {

    const history = useHistory();
    const dispatch = useDispatch();

    const mail = useSelector(state => state.auth.mail);
    const token = useSelector(state => state.auth.accessToken);
    const masterToken = useSelector(state => state.auth.masterToken);

    const archive = useSelector(state => state.archive);

    function removePassword(password: Password) {
        removePasswordFromArchive(dispatch, history, mail, token, password)

        Alert.error('Password deleted!', {
            position: 'bottom',
            effect: 'slide',
            timeout: 1500,
        });

    }

    function unarchivePassword(password: Password) {
        addPasswordToVault(dispatch, history, mail, token, masterToken, password);

        removePasswordFromArchive(dispatch, history, mail, token, password)

        Alert.info('Password unarchived', {
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
        if (archive.length > 0)
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
                <p> archive is empty </p>
            </div>
        );
    }

    React.useEffect(() => {
        getArchive(dispatch, history, mail, token);
    }, []);

    return (
        <PasswordList
            empty={<Empty />}
            passwords={archive}
            copy={password => copyPassword(password)}
            controll={
                [
                    {
                        fallback: '/audit',
                        boxicon: 'bx bx-detail',
                        text: 'Audit'
                    },
                    {
                        fallback: '/vault',
                        boxicon: 'bx bxs-carousel',
                        text: 'Vault'
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
                    unarchivePassword(password)
                }}>
                    <i className='bx bxs-archive-out'></i>
                </Delete>
                <Delete onClick={event => {
                    removePassword(password)
                }}>
                    <i className='bx bxs-trash'></i>
                </Delete>
            </>)}
        </PasswordList>
    );
}

export default Archive;