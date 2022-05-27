import { SHA256 } from "crypto-js";
import { config } from "../config";

export function requestResetPassword(mail: string, success?: (message: string) => void) {
    fetch(config.host + '/api/reset/password', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'mail': mail
        })
    }).then(result => result.json()).then(data => {
        if (!data.message) return
        success && success(data.message)
    })
}

export function resetPassword(token: string, password: string, mail: string, success?: (message: string) => void, error?: (message: string) => void) {
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
    }).then(response => {
        return {
            json: response.json(),
            code: response.status
        }
    }).then((data: any) => {
        if (!data.json.message) return

        if (data.code === 200) {
            success && success(data.json.message)
            return
        }

        error && error(data.json.message)
    })
}