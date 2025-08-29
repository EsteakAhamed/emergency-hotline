let coins = 1000;
let copyCount = 0;
let heartCount = 0;

const coinCountEl = document.getElementById("coinCount");
const copyCountEl = document.getElementById("copyCount");
const heartCountEl = document.getElementById("heartCount");
const historyList = document.getElementById("historyList");
const clearBtn = document.getElementById("clearHistory");
const cardsGrid = document.getElementById("cardsGrid");

function nowTime() {
    return new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit' });
}

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

function copyToClipboard(text, callback) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
            callback(true);
        }).catch(function () {
            const tmp = document.createElement("textarea");
            tmp.value = text;
            tmp.style.position = "fixed";
            tmp.style.left = "-9999px";
            document.body.appendChild(tmp);
            tmp.select();
            const ok = document.execCommand("copy");
            document.body.removeChild(tmp);
            callback(ok);
        });
    } else {
        const tmp = document.createElement("textarea");
        tmp.value = text;
        tmp.style.position = "fixed";
        tmp.style.left = "-9999px";
        document.body.appendChild(tmp);
        tmp.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(tmp);
        callback(ok);
    }
}

cardsGrid.addEventListener("click", function (e) {
    const card = e.target.closest(".card");
    if (!card) return;

    if (e.target.closest(".heart-btn")) {
        heartCount++;
        heartCountEl.textContent = heartCount;
        return;
    }

    if (e.target.closest(".btn-copy")) {
        const number = card.dataset.number || card.querySelector(".number")?.textContent.trim();
        copyToClipboard(number, function (ok) {
            if (ok) {
                copyCount++;
                copyCountEl.textContent = copyCount;
                alert("Copied hotline: " + number);
            } else {
                alert("Failed to copy. Please copy manually.");
            }
        });
        return;
    }

    if (e.target.closest(".btn-call")) {
        const service = card.dataset.service || card.querySelector("h3")?.textContent.trim();
        const number = card.dataset.number || card.querySelector(".number")?.textContent.trim();
        const confirmMsg = "Do you really want to call?\n" + service + ": " + number;
        const proceed = confirm(confirmMsg);
        if (!proceed) return;
        if (coins < 20) {
            alert("Not enough coins to make a call! (Need 20)");
            return;
        }
        coins -= 20;
        coinCountEl.textContent = coins;
        addToHistory(service, number);
        alert("Calling " + service + " (" + number + ")...");
        return;
    }
});

clearBtn.addEventListener("click", function () {
    historyList.innerHTML = "";
});
