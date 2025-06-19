
import { Connection, PublicKey, Transaction, SystemProgram } from "@solana/web3.js";

const connectBtn = document.getElementById('connectWallet');
const buyBtn = document.getElementById('buyToken');

let wallet = null;

connectBtn.addEventListener('click', async () => {
  if ('solana' in window) {
    const provider = window.solana;
    try {
      const res = await provider.connect();
      wallet = provider;
      alert('OBRAGOL Token is requesting permission to connect!');
    } catch (err) {
      console.error('Connection error', err);
    }
  } else {
    alert('Solana wallet not found. Install Phantom or Solflare.');
  }
});

buyBtn.addEventListener('click', async () => {
  if (!wallet || !wallet.publicKey) {
    alert('Connect wallet first!');
    return;
  }

  const connection = new Connection("https://api.mainnet-beta.solana.com");
  const recipient = new PublicKey("8W2ogqdvFSvDfQitX2JyyiCX6hqehZWvrpWTkkYCHGPm"); // Preventa wallet
  const sender = wallet.publicKey;

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: sender,
      toPubkey: recipient,
      lamports: 1000000 // 1 USDT in lamports assuming 6 decimals
    })
  );

  try {
    const { blockhash } = await connection.getRecentBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = sender;

    const signed = await wallet.signTransaction(transaction);
    const signature = await connection.sendRawTransaction(signed.serialize());
    await connection.confirmTransaction(signature);

    alert("Thanks for supporting OBRAGOL! Transaction submitted.");
  } catch (err) {
    console.error("Transaction failed", err);
    alert("Transaction failed. Try again.");
  }
});
