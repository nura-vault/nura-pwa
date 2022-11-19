import React from "react";
import styled from "styled-components";
import ContainerList from "../../components/ContainerList";
import { AuditLog, getAudit } from "../../endpoints/Audit";
import { useSelector } from "../../store/store";

const Windows = styled.div`
    background: url(./devices.png) no-repeat;
    min-height: 72px;
    min-width: 72px;

    background-position: 0px -1480px;
`

const Mac = styled.div`
    background: url(./devices.png) no-repeat;
    min-height: 72px;
    min-width: 72px;

    background-position: 0px -520px;
`

const Andorid = styled.div`
    background: url(./devices.png) no-repeat;
    min-height: 72px;
    min-width: 72px;

    background-position: 0px -75px;
`

const Other = styled.div`
    background: url(./devices.png) no-repeat;
    min-height: 72px;
    min-width: 72px;

    background-position: 0px -890px;
`

function Audit() {

    const mail = useSelector(state => state.auth.mail);
    const token = useSelector(state => state.auth.accessToken);

    const [audit, setAudit] = React.useState<AuditLog[]>();

    React.useEffect(() => {
        getAudit(mail, token, audits => {
            setAudit(audits.reverse());
        })
    }, [])

    const Device = (device: string) => {
        if (device.includes("Android") || device.includes("iPhone") || device.includes("Mobile"))
            return <Andorid />
        if (device.includes("Windows"))
            return <Windows />
        if (device.includes("Mac"))
            return <Mac />
        return <Other />
    }

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

            {audit?.flatMap(audit => audit.accessToken).map(token => {
                return (<>
                    <h3>{token}</h3>
                    <table>
                        {audit.filter(audit => audit.accessToken === token).filter(audit => true).map(audit => {
                            return (
                                <tr>
                                    <td>
                                        <div>
                                            {Device(audit.agent)}
                                        </div>
                                    </td>
                                    <td>
                                        {audit.agent.match(/\((.*?)\)/)?.[1]} <br />
                                        {/\w+\s(\w+\/\w+)/g.exec(audit.agent)?.[1]}
                                    </td>
                                    <td> {new Date(audit.timestamp).toLocaleString()} </td>
                                    <td> {audit.message} </td>
                                </tr>
                            )
                        })}
                    </table>
                </>)
            })}

        </ContainerList>
    </>)
}

export default Audit