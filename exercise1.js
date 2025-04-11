const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// A) findSummation
function findSummation(N = 1) {
    N = parseInt(N);

    if (isNaN(N) || N < 1 || !Number.isInteger(N)) {
        return false;
    }

    if (N === 1) {
        return 1;
    }

    return N + findSummation(N - 1);
}

// B) uppercaseFirstandLast
function uppercaseFirstandLast(str) {
    if (typeof str !== 'string') return '';
    return str.split(' ').map(word => {
        if (word.length === 1) return word.toUpperCase();
        return word[0].toUpperCase() + word.slice(1, -1) + word[word.length - 1].toUpperCase();
    }).join(' ');
}

// C) findAverageAndMedian
function findAverageAndMedian(arr) {
    arr = arr.map(Number).filter(n => !isNaN(n));
    if (arr.length === 0) return false;
    const average = arr.reduce((a, b) => a + b, 0) / arr.length;
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 === 0 ?
        (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
    return {average, median};
}

// D) find4Digits
function find4Digits(str) {
    const nums = str.split(' ');
    for (let num of nums) {
        if (/^\d{4}$/.test(num)) return num;
    }
    return false;
}

// Start server
http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;



    if (pathname === '/findSummation') {
        const result = findSummation(query.N);
        res.end(`Result: ${result}`);
    } else if (pathname === '/uppercaseFirstandLast') {
        const result = uppercaseFirstandLast(query.str);
        res.end(`Result: ${result}`);
    } else if (pathname === '/findAverageAndMedian') {
        const result = findAverageAndMedian(query.arr?.split(','));
        res.end(`Result: ${JSON.stringify(result)}`);
    } else if (pathname === '/find4Digits') {
        const result = find4Digits(query.str);
        res.end(`Result: ${result}`);
    } else if (pathname === '/') {
        fs.readFile(path.join(__dirname, 'exercise1.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("Error loading HTML file");
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
        });
    } else {
        res.writeHead(404);
        res.end(`404 - Page not found`);
    }
}).listen(3000);

console.log("Server running at http://localhost:3000");
