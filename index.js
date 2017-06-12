var findInFiles = require('find-in-files');
var cmd = require('node-cmd');
var shell = require('shelljs');
const rootPath = '../azure-rest-api-specs/';

findInFiles.find("x-ms-examples", rootPath, '.json$')
    .then(function (results) {
        for (var result in results) {
            var res = results[result];
            var subPath = result.replace(rootPath, '').replace('.json', '');
            
            var outPutPath = './oav-output/' + subPath;
            shell.mkdir('-p', outPutPath);
            
            var command = 'oav generate-wireformat -d ' + outPutPath + ' ' + result;

            cmd.run(command);
        }
    });