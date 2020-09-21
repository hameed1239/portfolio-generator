const fs = require('fs');
const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            if (err) {
                console.log('This is the write file err');
                reject(err);
            }
            resolve({
                ok: true,
                message: 'File created!'
            });
        });
     });
};

const copyFile = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile('./src/css/style.css','./dist/style.css', err => {
            if (err) {
                console.log('This is the copy file err');
                reject(err);
            }
            resolve({
                ok: true,
                message: 'File copied!'
            });
        });
    });
};

module.exports = {writeFile,copyFile};