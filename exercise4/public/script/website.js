document.addEventListener('DOMContentLoaded', () => {
    const privacyLink = document.getElementById('loadPrivacy');
    if (privacyLink) {
        privacyLink.addEventListener('click', (e) => {
            e.preventDefault();
            fetch('/privacy.html')
                .then(res => res.text())
                .then(html => {
                    const main = document.querySelector('main');
                    if (main) main.innerHTML = html;
                })
                .catch(err => console.error('Failed to load privacy:', err));
        });
    }
});

function updateDate() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const formatted = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    document.getElementById('dateTime').textContent = formatted;
}

setInterval(updateDate, 1000);
updateDate();


