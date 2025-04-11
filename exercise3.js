const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

function isValidPhone(phone) {
    const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
    return phonePattern.test(phone);
}

http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    if (pathname === '/') {
        // Serve the HTML form
        fs.readFile(path.join(__dirname, 'exercise3.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("Error loading form");
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (pathname === '/validate') {
        const { name, phone } = query;

        res.writeHead(200, { 'Content-Type': 'text/html' });

        if (!isValidPhone(phone)) {
            res.end(`<h3>Hi ${name}, the phone number you entered <b>(${phone})</b> is <span style="color:red;">invalid</span>.</h3>`);
        } else {
            res.end(`<h3>Hi ${name}, the phone number <b>(${phone})</b> is <span style="color:green;">valid</span>!</h3>`);
        }
    } else {
        res.writeHead(404);
        res.end("Page not found");
    }
}).listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
