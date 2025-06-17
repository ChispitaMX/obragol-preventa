function calcularTokens() {
    const cantidad = parseFloat(document.getElementById("usdtInput").value);
    const precioToken = 0.00005;
    const tokens = cantidad / precioToken;
    document.getElementById("resultado").innerText = "Recibirás " + tokens.toLocaleString() + " OBRAGOL tokens.";
}
