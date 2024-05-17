const { app, BrowserWindow, net, protocol, session } = require('electron')
const path = require('node:path')
const url = require('url')
const data = []
const fs = require('fs')

// https://github.com/sindresorhus/electron-main-fetch


const createWindow = () => {
    const win = new BrowserWindow({
      width: 1024,
      height: 786,
      webPreferences: {
        preload: path.join(__dirname, '../../electron-app/preload.js'),
        webSecurity: false,
        allowRunningInsecureContent : true
      }
    })
  
    win.loadURL('simplycode://index.html')
    //win.loadFile('../www/index.html')
}

function readRecursive(path) {
    let dirname = filesystem.dirname(path);
    let filename = filesystem.basename(path);
    if (filesystem.is_dir(path)) {
        const files = filesystem.scandir(path);
        const result = [];
        files.forEach((file) => {
            if (file !== '.' && file !== '..') {
                let data = {};
                if (filesystem.exists(`${path}/${file}/meta`)) {
                    data = JSON.parse(filesystem.read(`${path}/${file}/meta`, 'meta'));
                }
                if (filesystem.exists(`${path}/${file}/meta.json`)) {
                    data = JSON.parse(filesystem.read(`${path}/${file}/meta.json`, 'meta.json'));
                }
                data.id = file;
                data['ctime'] = filesystem.ctime(path, file);
                data['ctime-human'] = new Date(data['ctime']).toISOString();
                data['contents'] = readRecursive(`${path}/${file}`);
                result.push(data);
            }
        });
        return result;
    } else {
        return filesystem.read(dirname, filename);
    }
}

function deleteRecursive(path) {
    const dirname = filesystem.dirname(path);
    const filename = filesystem.basename(path);
    if (filesystem.is_dir(path)) {
        const files = filesystem.scandir(path);
        files.forEach((file) => {
            if (file !== '.' && file !== '..') {
                deleteRecursive(`${path}/${file}`);
            }
        });
        filesystem.delete(dirname, filename);
    } else {
        filesystem.delete(dirname, filename);
    }
}

function guid() {
     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function tagId() {
    const random1 = Math.floor(Math.random() * 1000);
    const random2 = Math.floor(Math.random() * 1000);

    const formattedString = `${String(random1).padStart(3, '0')}-${String(random2).padStart(3, '0')}`;

    return formattedString;
}

app.commandLine.appendSwitch('disable-site-isolation-trials');

protocol.registerSchemesAsPrivileged([
    {
      scheme: 'simplycode',
      privileges: {
        standard: true,
        secure: true,
        supportFetchAPI: true
      }
    }
])

app.whenReady().then(() => {

    protocol.handle('simplycode', (request) => {
        //console.log(request)
        //console.log(path)
       
       

        switch (request.method){
            case 'PUT':
                console.log('found a put')
                let componentName = request.url                
                if(componentName.endsWith('\/')){
                    componentName = componentName.substring(0, (componentName.length - 11))
                }
                componentName = componentName.split('\/').pop()

                try {
                    fs.mkdir(('../www/api/components/' + componentName), { recursive: true }, (err) => {
                        if (err) throw err;
                      });
                }catch(e) { 
                    alert('Failed to save the file !'); 
                }
                
                let pathname = '../www/api/components/' + componentName + '/meta.json';
                //let contents = '{ "formatted" : "json" }'; // request.body
                //fs.writeFileSync(pathname, "a string here?!");
                fs.writeFileSync(pathname, "a string here?!", (err) => {
                    if (err) throw err;
                });
            break
            case 'GET':
            default:
                let path = request.url.replace(/^simplycode:\/\/index.html/, '')
                if (!path || path === "/") {
                    path = '/index.html'
                }
                const filestuff = fs.readFileSync('../www' + path)
                return new Response(filestuff, {
                    // headers: { 'content-type': 'text/html' }
                })
            break    
        }

      
    })

    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
    

})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
