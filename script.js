
document.getElementById("usdtInput").addEventListener("input", function () {
    const usdt = parseFloat(this.value) || 0;
    const tokens = usdt * 10000;
    document.getElementById("tokenOutput").textContent = `You will receive ${tokens.toLocaleString()} OBRAGOL tokens`;
});

document.getElementById("connectWallet").addEventListener("click", function () {
    alert("Wallet connection simulated.");
});

document.getElementById("buyToken").addEventListener("click", function () {
    alert("Transaction simulated: USDT sent. You will receive your OBRAGOL after presale ends.");
});
