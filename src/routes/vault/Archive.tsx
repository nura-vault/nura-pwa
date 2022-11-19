import React from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-s-alert';
import PasswordList, { Controll } from '../../components/PasswordList';
import { getArchive, removePasswordFromArchive } from '../../endpoints/Archive';
import { addPasswordToVault, decryptPassword } from '../../endpoints/Vault';
import { useDispatch, useSelector } from '../../store/store';
import { Password } from '../../store/vaultSlice';



function Archive() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const mail = useSelector(state => state.auth.mail);
    const token = useSelector(state => state.auth.accessToken);
    const masterToken = useSelector(state => state.auth.masterToken);

    const archive = useSelector(state => state.archive);

    function removePassword(password: Password) {
        removePasswordFromArchive(dispatch, navigate, mail, token, password)

        Alert.error('Password deleted!', {
            position: 'bottom',
            effect: 'slide',
            timeout: 1500,
        });

    }

    function unarchivePassword(password: Password) {
        removePasswordFromArchive(dispatch, navigate, mail, token, password)

        addPasswordToVault(dispatch, navigate, mail, token, masterToken, {
            identifier: password.identifier,
            password: decryptPassword(password.password, masterToken),
            website: password.website,
            username: password.username
        });

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
        getArchive(dispatch, navigate, mail, token);
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
                <Controll onClick={() => {
                    unarchivePassword(password)
                }}>
                    <i className='bx bxs-archive-out'></i>
                </Controll>
                <Controll onClick={() => {
                    removePassword(password)
                }}>
                    <i className='bx bxs-trash'></i>
                </Controll>
            </>)}
        </PasswordList>
    );
}

export default Archive;