
document.addEventListener("DOMContentLoaded", function () {
  const inputUSDT = document.getElementById("usdtInput");
  const tokenOutput = document.getElementById("tokenOutput");

  const pricePerToken = 0.001;

  inputUSDT.addEventListener("input", () => {
    const usdtAmount = parseFloat(inputUSDT.value);
    if (!isNaN(usdtAmount)) {
      const tokens = usdtAmount / pricePerToken;
      tokenOutput.textContent = `Recibirás ${tokens.toLocaleString()} OBRAGOL tokens.`;
    } else {
      tokenOutput.textContent = "";
    }
  });
});
