#!/usr/bin/env node

const cp = require('child_process');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const projectName = process.argv[2];

console.log('Creating project...');

fse.copySync(__dirname + '/project-template', projectName, { overwrite: false, errorOnExist: true });

['package.json', 'package-lock.json'].forEach(function(fileName) {
    const filePath = path.join(projectName, fileName);
    const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    json.name = projectName;
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
});

process.chdir(projectName);
cp.execSync('npm ci', { stdio: 'inherit' });

console.log('Project created!');