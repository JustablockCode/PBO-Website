const server_url = "placeholder for server address";

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

document.addEventListener("DOMContentLoaded", function() {
    fetch('items.json')
        .then(response => response.json())
        .then(data => displayItems(data))
        .catch(error => console.error('Error loading items:', error));
});

function displayItems(items) {
    const shopSection = document.querySelector('.shop');
    
    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('shop-item');
        
        const icon = document.createElement('img');
        icon.src = item.icon;
        icon.alt = item.name;
        itemDiv.appendChild(icon);
        
        const name = document.createElement('h2');
        name.textContent = item.name;
        itemDiv.appendChild(name);
        
        const price = document.createElement('p');
        price.textContent = `Price: $${item.price}`;
        itemDiv.appendChild(price);
        
        const buyButton = document.createElement('button');
        buyButton.textContent = 'Buy';
        buyButton.onclick = () => alert(`Umm we dont have buy function for now so umm you purchased ${item.name} for... wait how much...? OH YEAH! It cost $${item.price}(damn inflation is tripping now)`);
        itemDiv.appendChild(buyButton);
        
        shopSection.appendChild(itemDiv);
    });
}

console.log("Hi, Im Justablock... Also why are you looking here in console?");

fetchPlayerCount();