import React from "react";
import styled from "styled-components";
import ContainerList from "../../components/ContainerList";
import { AuditLog, getAudit } from "../../endpoints/Audit";
import { useSelector } from "../../store/store";

function Audit() {

    const mail = useSelector(state => state.auth.mail);
    const token = useSelector(state => state.auth.accessToken);

    const [audit, setAudit] = React.useState<AuditLog[]>();

    React.useEffect(() => {
        getAudit(mail, token, audits => {
            console.log(audits);
            setAudit(audits);
        })
    }, [])

    return (<>
        <ContainerList
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
            <table>
                <tr>
                    <td> Type </td>
                    <td> Token </td>
                    <td> Device </td>
                </tr>
                {audit?.flatMap(audit => audit.accessToken).map(token => {
                    return audit.filter(audit => audit.accessToken === token).map(audit => {
                        return (
                            <tr>
                                <td> {audit.action} </td>
                                <td> {token} </td>
                                <td> {audit.agent} </td>
                            </tr>
                        )
                    })
                })}
            </table>
        </ContainerList>
    </>)
}

export default Audit