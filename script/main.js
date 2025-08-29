// Counters
let coins = 100;
let copyCount = 0;
let heartCount = 0;

// DOM refs
const coinCountEl = document.getElementById("coinCount");
const copyCountEl = document.getElementById("copyCount");
const heartCountEl = document.getElementById("heartCount");
const historyList = document.getElementById("historyList");
const clearBtn = document.getElementById("clearHistory");
const cardsGrid = document.getElementById("cardsGrid");

// Format current local time
function nowTime() {
    return new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit' });
}

// Add one history row 
function addToHistory(name, number) {
    const li = document.createElement("li");
    li.className = "history-item";
    li.innerHTML = `
    <div>
      <div class="name">${name}</div>
      <div class="number">${number}</div>
    </div>
    <div class="time">${nowTime()}</div>
  `;
    historyList.prepend(li);
}

// Clipboard helper with fallback
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (e) {
        // Fallback: create temp input
        const tmp = document.createElement("textarea");
        tmp.value = text;
        tmp.style.position = "fixed";
        tmp.style.left = "-9999px";
        document.body.appendChild(tmp);
        tmp.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(tmp);
        return ok;
    }
}

// Event delegation
cardsGrid.addEventListener("click", async (e) => {
    const card = e.target.closest(".card");
    if (!card) return;

    // Heart
    if (e.target.closest(".heart-btn")) {
        heartCount++;
        heartCountEl.textContent = heartCount;
        return;
    }

    // Copy
    if (e.target.closest(".btn-copy")) {
        const number = card.dataset.number || card.querySelector(".number")?.textContent.trim();
        const ok = await copyToClipboard(number);
        if (ok) {
            copyCount++;
            copyCountEl.textContent = copyCount;
            alert(`Copied hotline: ${number}`);
        } else {
            alert("Failed to copy. Please copy manually.");
        }
        return;
    }

    // Call
    if (e.target.closest(".btn-call")) {
        const service = card.dataset.service || card.querySelector("h3")?.textContent.trim();
        const number = card.dataset.number || card.querySelector(".number")?.textContent.trim();

        const confirmMsg = `Do you really want to call?\n${service}: ${number}`;
        const proceed = confirm(confirmMsg);
        if (!proceed) return;

        if (coins < 20) {
            alert("Not enough coins to make a call! (Need 20)");
            return;
        }

        coins -= 20;
        coinCountEl.textContent = coins;
        addToHistory(service, number);
        alert(`Calling ${service} (${number})...`);
        return;
    }
});

// Clear history
clearBtn.addEventListener("click", () => {
    historyList.innerHTML = "";
});
