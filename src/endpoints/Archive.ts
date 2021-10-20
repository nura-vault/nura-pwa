import { config } from "../config";
import { archive } from "../store/archiveSlice";
import { offline } from "../store/offlineSlice";
import { Dispatch } from "../store/store";
import CryptoJS from "crypto-js"
import { Password } from "../store/vaultSlice";

export function getArchive(dispatch: Dispatch, history: any, mail: string, token: string) {
    fetch(config.host + '/api/archive', {
        method: 'GET',
        headers: {
            'Authorization': CryptoJS.enc.Base64.stringify(
                CryptoJS.enc.Utf8.parse(`${mail}:${token}`)
            ),
        }
    }).then(result => result.json()).then(data => {
        dispatch(archive.clearPasswords());

        if (data.error) {
            history.push('/logout');
            return;
        }

        for (let entry of data.vault) {
            dispatch(archive.addPassword({
                identifier: entry.identifier,
                website: entry.website,
                username: entry.username,
                password: entry.password
            }));
        }
    })
}

export function addPasswordToArchive(dispatch: Dispatch, history: any, mail: string, token: string, password: Password) {
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
            'password': password.password
        })
    }

    fetch(config.host + '/api/archive', requestData).then(result => result.json()).then(data => {
        dispatch(archive.clearPasswords());

        if (data.error) {
            history.push('/logout');
            return;
        }

        for (let entry of data.vault) {
            dispatch(archive.addPassword({
                identifier: entry.identifier,
                website: entry.website,
                username: entry.username,
                password: entry.password
            }));
        }
    }).catch(() => {

        dispatch(offline.addRequest({
            host: config.host + '/api/archive',
            data: requestData
        }))

        dispatch(archive.addPassword({
            identifier: password.identifier,
            website: password.website,
            username: password.username,
            password: password.password
        }));
    })
}

export function removePasswordFromArchive(dispatch: Dispatch, history: any, mail: string, token: string, password: Password) {
    const requestData = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': CryptoJS.enc.Base64.stringify(
                CryptoJS.enc.Utf8.parse(`${mail}:${token}`)
            ),
        },
        body: JSON.stringify({
            'identifier': password.identifier,
            'password': password.password
        })
    }

    fetch(config.host + '/api/archive', requestData).then(result => result.json()).then(data => {

        if (data.error) {
            history.push('/logout');
            return;
        }

    }).catch(() => {

        dispatch(offline.addRequest({
            host: config.host + '/api/archive',
            data: requestData
        }))

    })

    dispatch(archive.removePassword(password));
}