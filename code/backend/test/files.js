const fs = require('fs'); // import fs(file system) to do the following things

// reading files
/*fs.readFile('./docs/blog1.txt', (err, data) => {

    if(err){
        console.log(err);
    }

    console.log(data.toString());


});

console.log('last line');*/

    


// writing files
fs.writeFile('./docs/blog1.txt', 'hello, world', () => {
    console.log('file was written');
});

// directories

// deleting files