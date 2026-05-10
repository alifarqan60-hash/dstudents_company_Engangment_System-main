const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.jsx')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('./src');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let updated = false;
    if (content.includes('font-poppins')) {
        content = content.replace(/font-poppins/g, 'font-sans');
        updated = true;
    }
    if (content.includes('font-abeezee')) {
        content = content.replace(/font-abeezee/g, 'font-sans');
        updated = true;
    }
    if (updated) {
        fs.writeFileSync(file, content);
        console.log('Updated ' + file);
    }
});
console.log('Done');
