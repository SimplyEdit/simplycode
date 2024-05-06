const { app, BrowserWindow } = require('electron')
const path = require('node:path')
const data = []

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
  
    win.loadFile('../www/index.html')
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

app.whenReady().then(() => {

    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// /*
// const http = require('node:http');
// const net = require('node:net');
// const { URL } = require('node:url');

// // still need to look into root/lib.config.php to move that content here.

// let request = http.request(options, (response) => {
//     let data = '<h1>Hello WOrld!</h1>';

//     // A chunk of data has been received
//     response.on('data', (chunk) => {
//         data += chunk;
//     });

//     // The whole response has been received
//     response.on('end', () => {
//         console.log(data);
//     });
// });

// /*
// let requestTarget = "";
// */

// let path = "/api/";

// /*
// let dirname = filesystem.dirname(path);
// let filename = filesystem.basename(path);
// */


// try {
//     const request = http.request();
//     const requestTarget = request.target.replace(/^\/api/, '');
//     const path = filesystem.path(requestTarget);
//     const dirname = filesystem.dirname(path);
//     const filename = filesystem.basename(path);

//     switch (request.method) {
//         case 'OPTIONS':
//             output('ok', 200);
//             break;
//         case 'GET':
//             if (filesystem.exists(`${dirname}/${filename}`)) {
//                 const result = readRecursive(path);
//                 output(result, 200);
//             } else {
//                 filenotfound(path);
//             }
//             break;
//         case 'POST':
//             if (filesystem.exists(path)) {
//                 if (filesystem.is_dir(path)) {
//                     let exists = true;
//                     let newId, newFilename;
//                     while (exists) {
//                         newId = tagId();
//                         newFilename = newId;
//                         exists = filesystem.exists(`${path}${newFilename}`);
//                     }
//                     filesystem.put(path, newFilename);
//                     output(newId, 200);
//                 }
//             }
//             break;
//         case 'PUT':
//             if (filesystem.put(dirname, filename)) {
//                 output('ok', 200);
//             } else {
//                 error(new Error('Unexpected result from write', 501));
//             }
//             break;
//         case 'DELETE':
//             if (filesystem.exists(path) || filesystem.exists(`${dirname}/${filename}`)) {
//                 deleteRecursive(path);
//                 output('deleted', 200);
//             } else {
//                 filenotfound(path);
//             }
//             break;
//     }
// } catch (e) {
//     error(e);
// }


// // Handle errors
// request.on('error', (error) => {
//     console.error(error);
// });

// // End the request
// request.end();

// */
// /*
// function output(data, status) {
//     http.response(status, data);
// }
// */
// function error(e) {
//     output("error: 501" + e);
// }

// function filenotfound(path) {
//     output("error: 404, message: 'File not found'" + path) ;
// }


