var { app, BrowserWindow, Tray, Menu } = require('electron')

const home = 'https://nura.micartey.dev'

const appIcon = __dirname + '/favicon.ico';
let tray;

const handleReady = () => {
  createWindow().then(window => {
    setInterval(() => {
      if (!window || !window.webContents)
        return;

      window.webContents
        .executeJavaScript('({...sessionStorage});', true)
        .then(sessionStorage => {

          if (!sessionStorage)
            return;

          const action = JSON.parse(JSON.stringify(sessionStorage))

          if (!action.electron)
            return;

          switch (action.electron) {
            case 'close':
              app.quit();
              break;
            case 'minimize':
              window.hide();
              break;
          }
        })
    }, 100)
  })
}

app.on('ready', handleReady)

const createWindow = async () => {
  let window = new BrowserWindow({
    backgroundColor: '#00000000',
    autoHideMenuBar: true,
    width: 950,
    height: 600,
    frame: false,
  })

  tray = new Tray(appIcon)
  tray.setContextMenu(Menu.buildFromTemplate([
    {
      label: 'Home', click: function () {
        window.loadURL(home)
        window.show()
      }
    },
    {
      label: 'Vault', click: function () {
        window.loadURL(home + '/vault')
        window.show()
      }
    },
    {
      label: 'Quit', click: function () {
        app.quit()
      }
    }
  ]))

  // window.removeMenu()
  window.setMenuBarVisibility(false)
  window.setFullScreenable(false)
  window.setIcon(appIcon)
  window.setResizable(false)
  await window.loadURL(home + '/vault')
  return window
}