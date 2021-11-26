import { config } from "../config";
import CryptoJS from "crypto-js"


export interface AuditLog {
    action: string
    accessToken: string
    agent: string
    timestamp: number
}

export function getAudit(mail: string, token: string, success: (audits: AuditLog[]) => void) {
    fetch(config.host + '/api/audit', {
        method: 'GET',
        headers: {
            'Authorization': CryptoJS.enc.Base64.stringify(
                CryptoJS.enc.Utf8.parse(`${mail}:${token}`)
            ),
        }
    }).then(result => result.json()).then(data => {

        success(data.audit as AuditLog[])

    })
}