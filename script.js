const passwordInput = document.getElementById("password");
const meterBar = document.getElementById("meter-bar");
const strengthText = document.getElementById("strength-text");
const message = document.getElementById("message");
const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copy");

function checkStrength(password) {
  let score = 0;
  if (password.length >= 8) score += 25;
  if (/[a-z]/.test(password)) score += 15;
  if (/[A-Z]/.test(password)) score += 20;
  if (/[0-9]/.test(password)) score += 20;
  if (/[^A-Za-z0-9]/.test(password)) score += 20;

  return Math.min(score, 100);
}

function updateStrength() {
  const pwd = passwordInput.value;
  const score = checkStrength(pwd);

  meterBar.style.width = score + "%";

  if (score < 30) {
    meterBar.style.background = "#ef4444"; // red
    strengthText.textContent = "Weak";
    message.textContent =
      "Your password is too weak. Try adding more characters or using a stronger password.";
  } else if (score < 70) {
    meterBar.style.background = "#f59e0b"; // orange
    strengthText.textContent = "Medium";
    message.textContent =
      "Your password is okay, but adding more variety will make it stronger.";
  } else {
    meterBar.style.background = "#22c55e"; // green
    strengthText.textContent = "Strong";
    message.textContent = "Your password is strong!";
  }

  copyBtn.disabled = !pwd;
}

passwordInput.addEventListener("input", updateStrength);

generateBtn.addEventListener("click", () => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  let pwd = "";
  for (let i = 0; i < 12; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  passwordInput.value = pwd;
  updateStrength();
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(passwordInput.value).then(() => {
    copyBtn.textContent = "Copied!";
    setTimeout(() => (copyBtn.textContent = "Copy"), 1500);
  });
});