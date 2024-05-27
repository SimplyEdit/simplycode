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

function readRecursive(componentPath) { 
    if(componentPath.endsWith('\/')){
        componentPath = componentPath.substring(0, (componentPath.length - 1))
    }
    const pathicles = componentPath.split('\/');
    const componentName = pathicles.pop();
    const componentDirectory = pathicles.join('/');

    var target = '../www' + componentDirectory + '\/' + componentName;

    if (fs.lstatSync(target).isDirectory()) {
        const files = fs.readdirSync(target);
        const result = [];
        files.forEach((file) => {
            if (file !== '.' && file !== '..' && !file.startsWith('.')) {
                let data = {};
                if (fs.existsSync(target + '/meta')) {
                    data = JSON.parse(fs.readFileSync(target + '/meta', 'utf8'));
                }
                if (fs.existsSync(target + '/meta.json')) {
                    data = JSON.parse(fs.readFileSync(target + '/meta.json', 'utf8'));
                }
                data.id = file;
                data['ctime'] = fs.lstatSync(target + '\/' + file).ctime;
                data['ctime-human'] = new Date(data['ctime']).toISOString();
                data['contents'] = readRecursive(componentPath + '\/' + file);
                result.push(data);
            }
        });
        return result;
    } else {
        return fs.readFileSync(target, 'utf8');
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

async function createComponentDirectory(componentPath){
    fs.mkdirSync(('../www/' + componentPath), { recursive: true }, (err) => {
        if (err) throw err
        console.log("making a component directory failed")
    })
     
}

async function createComponentFile(componentPath, filecontent){
    filecontent.text()
    .then(function(filecontent) {
        fs.writeFileSync(('../www/' + componentPath), filecontent, (err) => {
            if (err) throw err
         console.log(" making a component file failed")
        })
    })
}

app.whenReady().then(() => {

    protocol.handle('simplycode', (request) => {
        let componentPath = new URL(request.url).pathname
        console.log(componentPath)   
        if(componentPath.endsWith('\/')){
            componentPath = componentPath.substring(0, (componentPath.length - 1))
        }
        const pathicles = componentPath.split('\/');
        const componentName = pathicles.pop();
        const componentDirectory = pathicles.join('/');

        switch (request.method){
            case 'OPTIONS':
                return new Response('"ok"', { status: 200})
            break
            case 'DELETE':
                if(fs.existsSync('../www' + componentPath)){
                    fs.rmSync(('../www' + componentPath), { recursive: true, force: true })
                    return new Response('"deleted"', { status: 200})
                } else {
                    console.log("delete failed: file or folder not found")
                }         
            break        
            case 'PUT':
                return createComponentDirectory(componentDirectory)
                    .then(createComponentFile(componentDirectory + "/" + componentName, request))
                    .then(function() { return new Response('"ok"', { status: 200})})
                    .catch(function(){ return new Response('"something went wrong"', { status : 500 })}) // @TODO : return the error code 
            break
            case 'GET':
            default:
                if(componentPath.endsWith('\/')){
                    componentPath = componentPath.substring(0, (componentPath.length - 1))
                }

                if(componentPath.startsWith('/api/')){
                    const filestuff = readRecursive(componentPath)
                    console.log('asking if api folder')
                    console.log(filestuff)
                    return new Response(JSON.stringify(filestuff), {})
                }

                if (!componentPath || componentPath === "/") {
                    const filestuff = fs.readFileSync('../www/index.html')
                    return new Response(filestuff, {
                        // headers: { 'content-type': 'text/html' }
                    })
                } else {
                    var target = '../www/' + componentDirectory + '\/' + componentName;
                    if (fs.lstatSync(target).isDirectory()) {
                        // Do the recursive read thing;
                    } else {
                        const filestuff = fs.readFileSync('../www/' + componentDirectory + '\/' + componentName)
                        return new Response(filestuff, {
                            // headers: { 'content-type': 'text/html' }
                        })
                    }
                }
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
