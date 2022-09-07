import TitleBar from 'frameless-titlebar';
import isElectron from 'is-electron';
import React from 'react';

const Titlebar: React.FunctionComponent<any> = (props) => {

    if (!isElectron())
        return null;

    return <>
        <div style={{
            position: 'fixed',
            top: 0,
            zIndex: 999,
            width: '100%',
        }}>
            <TitleBar
                title="Vault"
                disableMaximize={true}
                onClose={() => {
                    sessionStorage.setItem('electron', 'close');
                }}
                onMinimize={() => {
                    sessionStorage.setItem('electron', 'minimize');
                    setTimeout(() => {
                        sessionStorage.removeItem('electron');
                    }, 1000);
                }}
                iconSrc="logo.png"
            />
        </div>
    </>
}

export default Titlebar