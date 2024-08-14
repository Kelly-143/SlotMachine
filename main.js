// Define the sound effect and confetti
const winSound = new Audio('assets/WowEffect.mp3'); // Adjust the path if needed
const confetti = window.confetti;

const slotSymbols = [
  ['🍒', '🍋', '🔔', '⭐️', '7️⃣', 'BAR'],
  ['🍒', '🍋', '🔔', '⭐️', '7️⃣', 'BAR'],
  ['🍒', '🍋', '🔔', '⭐️', '7️⃣', 'BAR']
];

function createSymbolElement(symbol) {
  const div = document.createElement('div');
  div.classList.add('symbol');
  div.textContent = symbol;
  return div;
}

let spinCount = 0;
let spun = false;

document.getElementById('spin-button').addEventListener('click', () => {
  spin();
});

function spin() {
  spinCount++;
  if (spun) {
    reset();
  }
  
  const slots = document.querySelectorAll('.slot');
  let completedSlots = 0;

  slots.forEach((slot, index) => {
    const symbols = slot.querySelector('.symbols');
    const symbolHeight = symbols.querySelector('.symbol')?.clientHeight;
    const symbolCount = symbols.childElementCount;

    symbols.innerHTML = '';

    // Add symbols to the slot
    slotSymbols[index].forEach(symbol => {
      symbols.appendChild(createSymbolElement(symbol));
    });

    // Randomize the spin
    const totalDistance = symbolCount * symbolHeight;
    const randomOffset = -Math.floor(Math.random() * (symbolCount - 1) + 1) * symbolHeight;
    symbols.style.top = `${randomOffset}px`;

    symbols.addEventListener('transitionend', () => {
      completedSlots++;
      if (completedSlots === slots.length) {
        logDisplayedSymbols();
      }
    }, { once: true });
  });

  spun = true;
}

function reset() {
  const slots = document.querySelectorAll('.slot');

  slots.forEach(slot => {
    const symbols = slot.querySelector('.symbols');
    symbols.style.transition = 'none';
    symbols.style.top = '0';
    symbols.offsetHeight; // Trigger a reflow
    symbols.style.transition = ''; // Reset transition
  });

  document.getElementById('result').textContent = '';
  document.getElementById('popup-container').classList.add('hidden');
}

function logDisplayedSymbols() {
  const slots = document.querySelectorAll('.slot');
  const displayedSymbols = [];

  slots.forEach((slot, index) => {
    const symbols = slot.querySelector('.symbols');
    const symbolHeight = symbols.querySelector('.symbol')?.clientHeight;
    const totalSymbols = symbols.childElementCount;
    const offset = Math.abs(parseInt(symbols.style.top, 10)) % (totalSymbols * symbolHeight);
    const symbolIndex = Math.floor(offset / symbolHeight) % slotSymbols[index].length;
    const displayedSymbol = slotSymbols[index][symbolIndex];
    displayedSymbols.push(displayedSymbol);
  });

  console.log(displayedSymbols);
  checkWin(displayedSymbols);
}

function checkWin(symbols) {
  const [symbol1, symbol2, symbol3] = symbols;
  const resultElement = document.getElementById('result');
  if (symbol1 === symbol2 && symbol2 === symbol3) {
    resultElement.textContent = 'You Win!';
    winSound.play(); // Play win sound

    // Confetti effect
    confetti({
      particleCount: 250,
      spread: 75,
      origin: { y: 0.5 }
    });

    // Hide the slot machine and show the popup button
    setTimeout(() => {
      document.querySelector('.slot-machine').style.display = 'none';
      document.getElementById('popup-container').classList.remove('hidden');
    }, 1000);
  } else {
    resultElement.textContent = 'Try Again!';
  }
}

document.getElementById('continue-button').addEventListener('click', () => {
  window.location.href = 'blank-page.html'; // Redirect to the blank page
});