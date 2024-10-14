const gameArea = document.getElementById('gameArea');
const startButton = document.getElementById('startButton');
const worldSizeInput = document.getElementById('worldSize');
const sandOption = document.getElementById('sandOption');
const stoneOption = document.getElementById('stoneOption');
const grassOption = document.getElementById('grassOption');

let selectedTool = null;
let selectedBlockType = null;
let inventory = { sand: 0, stone: 0, grass: 0 };
function createWorld(size) {
    gameArea.innerHTML = '';
    gameArea.style.gridTemplateColumns = `repeat(${size}, 30px)`;
    gameArea.style.gridTemplateRows = `repeat(${size}, 30px)`;

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            if (i >= size - 2) {
                tile.classList.add('stone'); 
            } else if (i >= size - 6) {
                tile.classList.add('sand'); 
            } else if (i >= size - 8) {
                tile.classList.add('grass'); 
            }

            tile.addEventListener('click', () => interactWithTile(tile));
            gameArea.appendChild(tile);
        }
    }
}


document.getElementById('axe').addEventListener('click', () => selectTool('axe'));
document.getElementById('pickaxe').addEventListener('click', () => selectTool('pickaxe'));
document.getElementById('shovel').addEventListener('click', () => selectTool('shovel'));

function selectTool(tool) {
    selectedTool = tool;
    selectedBlockType = null; 
    console.log(`Selected tool: ${selectedTool}`);
}

sandOption.addEventListener('click', () => selectBlock('sand'));
stoneOption.addEventListener('click', () => selectBlock('stone'));
grassOption.addEventListener('click', () => selectBlock('grass'));

function selectBlock(type) {
    if (inventory[type] > 0) {
        selectedBlockType = type;
        selectedTool = null; 
        console.log(`Selected block for placement: ${selectedBlockType}`);
    }
}

function interactWithTile(tile) {
    if (selectedTool && selectedTool === 'axe' && tile.classList.contains('stone')) {
        tile.classList.remove('stone');
        updateInventory('stone');
    } else if (selectedTool && selectedTool === 'pickaxe' && tile.classList.contains('grass')) {
        tile.classList.remove('grass');
        updateInventory('grass');
    } else if (selectedTool && selectedTool === 'shovel' && tile.classList.contains('sand')) {
        tile.classList.remove('sand');
        updateInventory('sand');
    } else if (selectedBlockType && !tile.classList.contains('stone') && !tile.classList.contains('sand') && !tile.classList.contains('grass')) {
        
        tile.classList.add(selectedBlockType);
        inventory[selectedBlockType]--;
        updateInventoryDisplay(selectedBlockType);

        
        if (inventory[selectedBlockType] === 0) {
            selectedBlockType = null;
        }
    }
}


function updateInventory(type) {
    inventory[type]++;
    updateInventoryDisplay(type);
}


function updateInventoryDisplay(type) {
    const optionElement = document.getElementById(`${type}Option`);
    optionElement.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} Blocks: ${inventory[type]}`;

    if (!optionElement.querySelector('img')) {
        const img = document.createElement('img');
        img.src = `./images/${type}.jpg`; 
        img.style.width = '20px';
        img.style.height = '20px';
        img.style.marginRight = '5px';
        optionElement.prepend(img);
    }
}


startButton.addEventListener('click', () => {
    const size = parseInt(worldSizeInput.value, 10);
    createWorld(size);
});