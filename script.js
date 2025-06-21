// Fecha objetivo del contador
const targetDate = new Date("2025-07-01T00:00:00").getTime();
const daysSpan = document.getElementById("dias");
const hoursSpan = document.getElementById("horas");
const minutesSpan = document.getElementById("minutos");
const secondsSpan = document.getElementById("segundos");

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  daysSpan.textContent = String(days).padStart(2, '0');
  hoursSpan.textContent = String(hours).padStart(2, '0');
  minutesSpan.textContent = String(minutes).padStart(2, '0');
  secondsSpan.textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Dirección de recepción (Solflare)
const recipientAddress = "8W2ogqdvFSvDfQitX2JyyiCX6hqehZWvrpWTkkYCHGPm";

// ID del token USDT SPL en Solana (stablecoin real)
const usdtMintAddress = "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB";

let provider = null;

document.getElementById("connectWallet").addEventListener("click", async () => {
  if ("solana" in window) {
    provider = window.solana;
    try {
      await provider.connect();
      alert("Wallet conectada exitosamente: " + provider.publicKey.toString());
    } catch (err) {
      console.error(err);
      alert("Error al conectar wallet.");
    }
  } else {
    alert("Phantom o Solflare no detectado. Instálalo para continuar.");
  }
});

document.getElementById("buyToken").addEventListener("click", async () => {
  const amountInput = document.getElementById("usdtAmount");
  const amount = parseFloat(amountInput.value);

  if (!provider || !provider.publicKey) {
    alert("Primero conecta tu wallet.");
    return;
  }

  if (!amount || amount <= 0) {
    alert("Ingresa un monto válido de USDT.");
    return;
  }

  try {
    const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("mainnet-beta"), "confirmed");
    const senderPublicKey = provider.publicKey;
    const recipientPublicKey = new solanaWeb3.PublicKey(recipientAddress);
    const usdtMint = new solanaWeb3.PublicKey(usdtMintAddress);

    const senderTokenAccounts = await connection.getTokenAccountsByOwner(senderPublicKey, {
      mint: usdtMint
    });

    if (senderTokenAccounts.value.length === 0) {
      alert("No se encontró una cuenta de USDT en tu wallet.");
      return;
    }

    const senderTokenAccount = senderTokenAccounts.value[0].pubkey;

    // Verificar o crear la cuenta asociada del receptor
    const recipientTokenAccount = await splToken.getOrCreateAssociatedTokenAccount(
      connection,
      provider,
      usdtMint,
      recipientPublicKey
    );

    const tx = new solanaWeb3.Transaction().add(
      splToken.createTransferInstruction(
        senderTokenAccount,
        recipientTokenAccount.address,
        senderPublicKey,
        amount * 10 ** 6, // USDT tiene 6 decimales
        [],
        splToken.TOKEN_PROGRAM_ID
      )
    );

    const signature = await provider.signAndSendTransaction(tx);
    await connection.confirmTransaction(signature, "confirmed");

    alert("¡Compra realizada! TX ID: " + signature);
  } catch (error) {
    console.error(error);
    alert("Fallo la transacción.");
  }
});
