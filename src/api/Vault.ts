import { AES } from "crypto-js";
import { config } from "../config";
import { offline } from "../store/offlineSlice";
import { Dispatch } from "../store/store";
import { vault } from "../store/vaultSlice";

interface Password {
    identifier: string;
    password: string;
}

export function getVault(dispatch: Dispatch, history: any, mail: string, token: string) {
    fetch(config.host + '/api/vault', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            'mail': mail,
            'token': token,
        })
    }).then(result => result.json()).then(data => {
        dispatch(vault.clearPasswords());

        if (data.error) {
            history.push('/logout');
            return;
        }

        for (let entry of data.vault) {
            dispatch(vault.addPassword({
                identifier: entry.identifier,
                password: entry.password
            }));
        }
    })
}

export function addPasswordToVault(dispatch: Dispatch, history: any, mail: string, token: string, masterToken: string, password: Password) {

    const requestData = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            'mail': mail,
            'token': token,
            'identifier': password.identifier,
            'password': AES.encrypt(password.password, masterToken).toString()
        })
    }

    fetch(config.host + '/api/vault', requestData).then(result => result.json()).then(data => {
        dispatch(vault.clearPasswords());

        if (data.error) {
            history.push('/logout');
            return;
        }

        for (let entry of data.vault) {
            dispatch(vault.addPassword({
                identifier: entry.identifier,
                password: entry.password
            }));
        }
    }).catch(() => {

        dispatch(offline.addRequest({
            host: config.host + '/api/vault',
            data: requestData
        }))

        dispatch(vault.addPassword({
            identifier: password.identifier,
            password: AES.encrypt(password.password, masterToken).toString()
        }));
    })
}

export function removePasswordFromVault(dispatch: Dispatch, history: any, mail: string, token: string, password: Password) {

    const requestData = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            'mail': mail,
            'token': token,
            'identifier': password.identifier,
            'password': password.password
        })
    }

    fetch(config.host + '/api/vault', requestData).then(result => result.json()).then(data => {

        if (data.error) {
            history.push('/logout');
            return;
        }

    }).catch(() => {

        dispatch(offline.addRequest({
            host: config.host + '/api/vault',
            data: requestData
        }))

    })

    dispatch(vault.removePassword(password));
}

export function decryptPassword(password: string, masterToken: string): string {
    return hex_to_ascii(AES.decrypt(password, masterToken).toString());
}

function hex_to_ascii(str1: string) {
    var hex = str1.toString();
    var output = '';
    for (var n = 0; n < hex.length; n += 2)
        output += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    return output;
}