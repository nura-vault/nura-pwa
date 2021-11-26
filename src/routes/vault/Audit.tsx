import React from "react";
import styled from "styled-components";
import ContainerList from "../../components/ContainerList";
import { AuditLog, getAudit } from "../../endpoints/Audit";
import { useSelector } from "../../store/store";

const Container = styled.div`
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25),
        0 10px 10px rgba(0,0,0,0.22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;

    margin-top: 20px;
    height: calc(100vh - 100px);

    display: flex;
    justify-content: space-between;
`

const Parent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;

    min-height: 100vh;
`

const PanelParent = styled.div`
    width: 100%;
    padding: 0, 40px;
    max-height: 100%;
    overflow-y: scroll;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
`

const Panel = styled.div`
    padding: 0, 40px;
    max-height: 100%;
    overflow-y: scroll;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    user-select: text;
`

function Audit() {

    const mail = useSelector(state => state.auth.mail);
    const token = useSelector(state => state.auth.accessToken);

    const [audit, setAudit] = React.useState<AuditLog[]>();

    React.useEffect(() => {
        getAudit(mail, token, audits => {
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