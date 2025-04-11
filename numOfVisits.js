//TO REDO


const http = require('http');

// Helper: parse cookies into an object
function parseCookies(cookieHeader) {
    const cookies = {};
    if (!cookieHeader) return cookies;
    cookieHeader.split(';').forEach(cookie => {
        const [name, ...rest] = cookie.trim().split('=');
        cookies[name] = decodeURIComponent(rest.join('='));
    });
    return cookies;
}
function formatDateForDisplay(dateString) {
    const date = new Date(dateString);
    const parts = date.toString().split(' '); // ['Thu', 'Apr', '10', '17:16:18', 'GMT-0400', '(Eastern', 'Daylight', 'Time)']

    const weekday = parts[0];  // Thu
    const month = parts[1];    // Apr
    const day = parts[2];      // 10
    const time = parts[3];     // 17:16:18
    const year = date.getFullYear(); // 2025

    // Try to extract abbreviation like 'EST' or 'EDT' from full string
    const full = date.toString();
    const match = full.match(/\(([^)]+)\)/); // Matches (Eastern Daylight Time)
    let zone = 'GMT'; // Fallback
    if (match) {
        const words = match[1].split(' ');
        zone = words.map(w => w[0]).join(''); // e.g., Eastern Daylight Time → EDT
    }

    return `Last time you visited my webpage on: ${weekday} ${month} ${day} ${time} ${zone} ${year}`;
}




const server = http.createServer((req, res) => {
    const cookies = parseCookies(req.headers.cookie);

    // Read existing cookie values
    let visits = parseInt(cookies.visits) || 0;
    let lastVisit = cookies.lastVisit || null;

    visits++; // Increment visit count

    // Get current time
    const now = new Date();
    const nowFormatted = now.toString();

    // Set updated cookies
    res.setHeader('Set-Cookie', [
        `visits=${visits}; Path=/; HttpOnly`,
        `lastVisit=${encodeURIComponent(nowFormatted)}; Path=/; HttpOnly`
    ]);

    // Prepare response
    res.writeHead(200, { 'Content-Type': 'text/html' });

    if (visits === 1) {
        res.end(`
            <h2>Welcome to my webpage!</h2>
            <p>It is your first time that you are here.</p>
        `);
    } else {
        res.end(`
            <h2>Hello, this is the ${visits} time that you are visiting my webpage.</h2>
            <p>${formatDateForDisplay(lastVisit)}</p>
        `);
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
