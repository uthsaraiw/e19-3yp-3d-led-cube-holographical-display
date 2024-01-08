const http = require('http');
const fs = require('fs');
const _ = require('lodash');

// method to create the server
// const server = http.createServer();

const server = http.createServer((req, res) => {
    //console.log(req.url, req.method);

    // set header content type
    //res.setHeader('Content-Type', 'text/plain');// get plain line
    // res.write('Hello, sap');
    
    // these are use when we add the html part also to this file, but we can create separate html file and do the same thing
    /*res.setHeader('Content-Type', 'text/html');
    res.write('<head><link rel="styleseet" href="a"></head>');
    res.write('<p>Hello, sap</p>');
    res.write('<p>Hello again, sap</p>');
    res.end();*/

    // lodash
    // get a random number
    const num = _.random(0, 20);
    console.log(num);

    const greet = _.once(() => {
        console.log('Hello');
    });
    
    greet();
    greet();


    res.setHeader('Content-Type', 'text/html');

    let path = './views/';
    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        // redirect this to about.html
        case '/about-blah':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;    



    }

    // send an html file
    // before the switch put fs.readFile('./views/index.html', (err, data)
    fs.readFile(path, (err, data) =>{
        if (err) {
            console.log(err);
            res.end();
        }else{
            //res.write(data);
            //res.statusCode = 200;
            res.end(data);

        }
    })


}); 

server.listen(3000, 'localhost', function () {
        console.log('listening for requests on port 3000');
    });