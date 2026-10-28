const {app,BrowserWindow}=require('electron');
app.whenReady().then(()=>{const win=new BrowserWindow({width:1200,height:850,webPreferences:{contextIsolation:true,nodeIntegration:false}});win.loadFile(require('path').join(__dirname,'../dist/index.html'));});
app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit()});
