import { SHA256 } from "crypto-js";
import { config } from "../config";

export function requestResetPassword(mail: string, success?: () => void) {
    fetch(config.host + '/api/reset/password', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'mail': mail
        })
    }).then(result => result.json()).then(data => {
        // if (data.message) {
        //     error && error(data.message)
        //     return
        // }

        success && success()
    })
}

export function resetPassword(token: string, password: string, mail: string, success?: () => void, error?: (message: string) => void) {
    fetch(config.host + '/api/reset/password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'token': token,
            'mail': mail,
            'password': SHA256(password).toString()
        })
    }).then(result => result.json()).then(data => {
        if (data.message) {
            error && error(data.message)
            return
        }

        success && success()
    })
}