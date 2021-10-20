import { AES } from "crypto-js";
import { config } from "../config";
import { offline } from "../store/offlineSlice";
import { Dispatch } from "../store/store";
import { Password, vault } from "../store/vaultSlice";
import CryptoJS from "crypto-js"

export function getVault(dispatch: Dispatch, history: any, mail: string, token: string) {
    fetch(config.host + '/api/vault', {
        method: 'GET',
        headers: {
            'Authorization': CryptoJS.enc.Base64.stringify(
                CryptoJS.enc.Utf8.parse(`${mail}:${token}`)
            ),
        }
    }).then(result => result.json()).then(data => {
        dispatch(vault.clearPasswords());

        if (data.error) {
            history.push('/logout');
            return;
        }

        for (let entry of data.vault) {
            dispatch(vault.addPassword({
                identifier: entry.identifier,
                website: entry.website,
                username: entry.username,
                password: entry.password
            }));
        }
    }).catch(() => {
        history.push("/logout")
    })
}

export function addPasswordToVault(dispatch: Dispatch, history: any, mail: string, token: string, masterToken: string, password: Password) {
    const requestData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': CryptoJS.enc.Base64.stringify(
                CryptoJS.enc.Utf8.parse(`${mail}:${token}`)
            ),
        },
        body: JSON.stringify({
            'identifier': password.identifier,
            'website': password.website,
            'username': password.username,
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
                website: entry.website,
                username: entry.username,
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
            website: password.website,
            username: password.username,
            password: AES.encrypt(password.password, masterToken).toString()
        }));
    })
}

export function removePasswordFromVault(dispatch: Dispatch, history: any, mail: string, token: string, password: Password) {
    const requestData = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': CryptoJS.enc.Base64.stringify(
                CryptoJS.enc.Utf8.parse(`${mail}:${token}`)
            ),
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