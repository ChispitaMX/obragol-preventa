// Fecha objetivo del contador
const fechaObjetivo = new Date("2025-07-01T00:00:00").getTime();

const diasSpan = document.getElementById("dias");
const horasSpan = document.getElementById("horas");
const minutosSpan = document.getElementById("minutos");
const segundosSpan = document.getElementById("segundos");

setInterval(() => {
  const ahora = new Date().getTime();
  const tiempoRestante = fechaObjetivo - ahora;

  const dias = Math.floor(tiempoRestante / (1000 * 60 * 60 * 24));
  const horas = Math.floor((tiempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);

  diasSpan.textContent = dias;
  horasSpan.textContent = horas;
  minutosSpan.textContent = minutos;
  segundosSpan.textContent = segundos;
}, 1000);

// Conectar wallet
let provider = null;
const connectButton = document.getElementById("connectWallet");

connectButton.addEventListener("click", async () => {
  if (window.solana && window.solana.isPhantom) {
    try {
      const resp = await window.solana.connect();
      provider = window.solana;
      alert("Wallet conectada: " + resp.publicKey.toString());
    } catch (err) {
      console.error("Error al conectar wallet:", err);
    }
  } else {
    alert("Phantom Wallet no detectada. Por favor instálala.");
  }
});

// Comprar token
const buyButton = document.getElementById("buyToken");
buyButton.addEventListener("click", async () => {
  if (!provider) {
    alert("Conecta primero tu wallet.");
    return;
  }

  const usdtAmount = document.getElementById("usdtAmount").value;
  if (!usdtAmount || isNaN(usdtAmount) || usdtAmount <= 0) {
    alert("Ingresa una cantidad válida de USDT.");
    return;
  }

  const receiverAddress = "8W2ogqdvFSvDfQitX2JyyiCX6hqehZWvrpWTkkYCHGPm"; // Wallet Solflare

  try {
    const transaction = new solanaWeb3.Transaction().add(
      solanaWeb3.SystemProgram.transfer({
        fromPubkey: provider.publicKey,
        toPubkey: new solanaWeb3.PublicKey(receiverAddress),
        lamports: usdtAmount * 1_000_000, // Simulación en lamports, ajustar según implementación real de USDT
      })
    );

    let { blockhash } = await provider.connection.getRecentBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = provider.publicKey;

    const signed = await provider.signTransaction(transaction);
    const signature = await provider.connection.sendRawTransaction(signed.serialize());

    alert("Compra realizada. Tx ID: " + signature);
  } catch (err) {
    console.error("Error al realizar la transacción:", err);
    alert("Fallo la transacción.");
  }
});
