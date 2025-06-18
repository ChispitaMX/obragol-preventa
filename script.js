
document.getElementById('usdtInput').addEventListener('input', function () {
    const usdt = parseFloat(this.value);
    const tokens = usdt / 0.001;
    document.getElementById('tokenOutput').innerText = `Recibirás ${tokens.toLocaleString()} OBRAGOL tokens.`;
});

document.getElementById('connectButton').addEventListener('click', async () => {
    if (window.solana && window.solana.isPhantom) {
        try {
            const resp = await window.solana.connect();
            document.getElementById('status').innerText = 'OBRAGOL Token está solicitando autorización para conectarse';
        } catch (err) {
            console.error('Conexión rechazada', err);
        }
    } else {
        alert("Phantom Wallet no está instalada.");
    }
});
