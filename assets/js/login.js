const lampBtn = document.getElementById("lampToggle");
const form = document.getElementById("loginForm");
const userEl = document.getElementById("user");
const passEl = document.getElementById("pass");
const errorEl = document.getElementById("error");
const togglePass = document.getElementById("togglePass");

function normUser(s) {
  return (s || "").trim().toLowerCase();
}

function toHex(buffer) {
  return [...new Uint8Array(buffer)]
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sha256Hex(text) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return toHex(hash);
}

// Helper para que tú generes hashes desde la consola del navegador
window.hashPass = sha256Hex;

function setLamp(on) {
  document.body.classList.toggle("lamp-on", on);
  document.body.classList.toggle("lamp-off", !on);
  lampBtn.setAttribute("aria-pressed", on ? "true" : "false");
  if (on) setTimeout(() => userEl?.focus(), 180);
}

lampBtn.addEventListener("click", () => {
  const isOn = document.body.classList.contains("lamp-on");
  setLamp(!isOn);
});

togglePass.addEventListener("click", () => {
  const isPass = passEl.type === "password";
  passEl.type = isPass ? "text" : "password";
  togglePass.textContent = isPass ? "Ocultar" : "Ver";
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorEl.textContent = "";

  if (!document.body.classList.contains("lamp-on")) {
    errorEl.textContent = "Enciende la lámpara para continuar.";
    return;
  }

  const u = normUser(userEl.value);
  const p = passEl.value || "";

  const rec = (typeof USERS_DB !== "undefined") ? USERS_DB[u] : null;
  if (!rec) {
    errorEl.textContent = "Credenciales incorrectas.";
    return;
  }

  const ph = await sha256Hex(p);
  if (ph !== rec.passHash) {
    errorEl.textContent = "Credenciales incorrectas.";
    return;
  }

  sessionStorage.setItem("loggedUser", u);
  window.location.href = "pages/carta.html?u=" + encodeURIComponent(u);
});
