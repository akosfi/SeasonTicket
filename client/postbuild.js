const ncp = require('ncp').ncp;
const rimraf = require('rimraf');


const source = './build';
const destination = '../server/wwwroot';
ncp.limit = 16;
 


rimraf(destination, function (err) { 
    if(err) return console.log(err);
    ncp(source, destination, function (err) {
        if (err) {
          return console.error(err);
        }
        console.log('Successfully copied files from ' + source + ' to: ' + destination + ' !');
    });
});


