import React from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-s-alert';
import PasswordList, { Controll } from '../../components/PasswordList';
import { addPasswordToArchive } from '../../endpoints/Archive';
import { decryptPassword, getVault, removePasswordFromVault } from '../../endpoints/Vault';
import { useDispatch, useSelector } from '../../store/store';
import { Password } from '../../store/vaultSlice';



function Vault() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const mail = useSelector(state => state.auth.mail);
    const token = useSelector(state => state.auth.accessToken);
    const masterToken = useSelector(state => state.auth.masterToken);

    const vault = useSelector(state => state.vault);

    function archivePassword(password: Password) {
        removePasswordFromVault(dispatch, navigate, mail, token, password);

        addPasswordToArchive(dispatch, navigate, mail, token, password)

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
        getVault(dispatch, navigate, mail, token);
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
                <Controll onClick={() => {
                    archivePassword(password)
                }}>
                    <i className='bx bxs-archive-in' />
                </Controll>
            </>)}
        </PasswordList>
    );
}

export default Vault;