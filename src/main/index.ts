import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

// 协议名称
const PROTOCOL = 'testq'

// 存储主窗口引用
let mainWindow: BrowserWindow | null = null

function newBrowserWindow(): BrowserWindow {
  return new BrowserWindow({
    width: 500,
    height: 600,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      contextIsolation: true,
      devTools: false,
      nodeIntegration: true,
      preload: join(__dirname, '../preload/index.cjs'),
      sandbox: false
    }
  })
}

let printOption = null

function createWindow(): void {
  // Create the browser window.
  mainWindow = newBrowserWindow()
  mainWindow.maximize()

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    const newWindow = newBrowserWindow()
    newWindow.loadURL(mainWindow.webContents.getURL().split('index.html#')[0] + 'index.html#/reader?' + url.split('?')[1])
    newWindow.maximize()
    newWindow.on('ready-to-show', () => {
      newWindow.show()
    })
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// 处理协议URL
function handleProtocolUrl(url: string): void {
  console.log('接收到协议URL:', url)
  
  if (mainWindow) {
    // 如果窗口已存在，聚焦并显示
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
    
    // 可以在这里处理URL参数，比如导航到特定页面
    // 例如：mainWindow.webContents.send('protocol-url', url)
  } else {
    // 如果窗口不存在，创建新窗口
    createWindow()
  }
}

// 获取启动参数中的协议URL
function getProtocolUrlFromArgs(args: string[]): string | null {
  for (const arg of args) {
    if (arg.startsWith(`${PROTOCOL}://`)) {
      return arg
    }
  }
  return null
}

// 设置应用为协议的默认处理程序
if (!app.isDefaultProtocolClient(PROTOCOL)) {
  app.setAsDefaultProtocolClient(PROTOCOL)
}

app.commandLine.appendSwitch('lang', 'zh')

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.handle('getPrinters', async (event) => {
    let printers = await event.sender.getPrintersAsync()
    const regex = /pdf|xps|fax|onenote/i
    printers = printers.filter((p) => !regex.test(p.name))
    return printers
  })

  ipcMain.handle('getPrintOption', async (event) => {
    return new Promise((resolve) => {
      const printWindow = newBrowserWindow()
      printWindow.loadURL(event.sender.getURL().split('#/')[0] + '#/print')
      printWindow.on('ready-to-show', () => {
        printWindow.show()
      })
      printWindow.on('closed', () => {
        if (printOption === null) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
    })
  })

  ipcMain.on('printOption', (event, option) => {
    printOption = option
  })

  ipcMain.on('print', (event) => {
    if (printOption === null) {
      return
    }
    console.log(printOption)
    BrowserWindow.fromWebContents(event.sender).webContents.print(
      printOption,
      (success, errorType) => {
        if (!success) console.log(errorType)
        else console.log('成功发送打印任务')
      }
    )
    printOption = null
  })

  createWindow()

  // 检查启动参数中是否有协议URL
  const protocolUrl = getProtocolUrlFromArgs(process.argv)
  if (protocolUrl) {
    handleProtocolUrl(protocolUrl)
  }

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 处理应用已运行时通过协议启动的情况
app.on('second-instance', (event, commandLine, workingDirectory) => {
  // 检查命令行参数中是否有协议URL
  const protocolUrl = getProtocolUrlFromArgs(commandLine)
  if (protocolUrl) {
    handleProtocolUrl(protocolUrl)
  }
})

// macOS协议处理
app.on('open-url', (event, url) => {
  event.preventDefault()
  handleProtocolUrl(url)
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
