const server_url = "placeholder for server adress"


function copyToClipboard() {
    navigator.clipboard.writeText(server_url).then(() => {
        const notification = document.getElementById('copy-notification');
        notification.style.opacity = '1';
        setTimeout(() => {
            notification.style.opacity = '0';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

async function fetchPlayerCount() {
    const apiUrl = `https://api.mcsrvstat.us/3/${server_url}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.online) {
            document.getElementById('player-count-box').textContent = `${data.players.online} players online`;
        } else {
            document.getElementById('player-count-box').textContent = 'Server Offline';
        }
    } catch (error) {
        console.error('Error fetching player count:', error);
        document.getElementById('player-count-box').textContent = 'Error';
    }
}

console.log("Hi, Im Justablock... Also why are you looking here in console?")

fetchPlayerCount();