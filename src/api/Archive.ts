import { config } from "../config";
import { archive } from "../store/archiveSlice";
import { offline } from "../store/offlineSlice";
import { Dispatch } from "../store/store";

interface Password {
    identifier: string;
    password: string;
}

export function getArchive(dispatch: Dispatch, history: any, mail: string, token: string) {
    fetch(config.host + '/api/archive', {
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
        dispatch(archive.clearPasswords());

        if (data.error) {
            history.push('/logout');
            return;
        }

        for (let entry of data.vault) {
            dispatch(archive.addPassword({
                identifier: entry.identifier,
                password: entry.password
            }));
        }
    })
}

export function addPasswordToArchive(dispatch: Dispatch, history: any, mail: string, token: string, password: Password) {

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
            'password': password.password,
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
            password: password.password
        }));
    })
}

export function removePasswordFromArchive(dispatch: Dispatch, history: any, mail: string, token: string, password: Password) {

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