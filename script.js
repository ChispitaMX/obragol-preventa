function calcularTokens() {
    const cantidad = parseFloat(document.getElementById("usdt").value);
    const precioToken = 0.0001;
    if (!isNaN(cantidad)) {
        const tokens = cantidad / precioToken;
        document.getElementById("resultado").innerText = `Recibirás ${tokens.toLocaleString()} OBRAGOL tokens.`;
    } else {
        document.getElementById("resultado").innerText = "";
    }
}
