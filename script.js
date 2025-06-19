
async function purchase() {
    const amount = document.getElementById('usdtAmount').value;
    if (!window.solana || !window.solana.isPhantom) {
        alert('Please install Phantom Wallet to proceed.');
        return;
    }
    try {
        const resp = await window.solana.connect();
        const recipient = "8W2ogqdvFSvDfQitX2JyyiCX6hqehZWvrpWTkkYCHGPm";
        const lamports = parseFloat(amount) * 1e6;
        const transaction = new solanaWeb3.Transaction().add(
            solanaWeb3.SystemProgram.transfer({
                fromPubkey: resp.publicKey,
                toPubkey: new solanaWeb3.PublicKey(recipient),
                lamports: lamports
            })
        );
        const { signature } = await window.solana.signAndSendTransaction(transaction);
        alert("Transaction sent! Signature: " + signature);
    } catch (err) {
        console.error(err);
        alert("Transaction failed.");
    }
}

document.getElementById("connectButton").addEventListener("click", async () => {
    try {
        const resp = await window.solana.connect();
        alert("Connected: " + resp.publicKey.toString());
    } catch (err) {
        console.error("Connection error:", err);
    }
});
