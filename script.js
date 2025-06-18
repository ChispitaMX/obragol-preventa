
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("usdtInput");
    const output = document.getElementById("tokenOutput");
    const connectBtn = document.getElementById("connectBtn");
    const walletStatus = document.getElementById("walletStatus");

    const precioPorToken = 0.001;

    input.addEventListener("input", () => {
        const usdt = parseFloat(input.value);
        if (!isNaN(usdt) && usdt > 0) {
            const tokens = usdt / precioPorToken;
            output.textContent = `Recibirás ${tokens.toLocaleString()} OBRAGOL tokens.`;
        } else {
            output.textContent = "";
        }
    });

    connectBtn.addEventListener("click", async () => {
        try {
            const provider = window.phantom?.solana;
            if (provider && provider.isPhantom) {
                const resp = await provider.connect();
                walletStatus.textContent = "OBRAGOL Token está solicitando autorización para conectarse";
            } else {
                walletStatus.textContent = "Solflare no está disponible. Instala la wallet Phantom.";
            }
        } catch (err) {
            walletStatus.textContent = "Conexión rechazada.";
        }
    });
});
