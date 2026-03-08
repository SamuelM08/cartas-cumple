const buscaUsuario = document.getElementById("buscaUsuario");
const buscaClave = document.getElementById("buscaClave");
const tbody = document.getElementById("tablaBody");
const contador = document.getElementById("contador");

function norm(s) {
  return (s || "").trim().toLowerCase();
}

function renderTabla() {
  const fUser = norm(buscaUsuario.value);
  const fKey = norm(buscaClave.value);

  tbody.innerHTML = "";
  let n = 0;

  const users = Object.entries(USERS_DB || {});
  for (const [user, rec] of users) {
    const carta = CARTAS_DB?.[rec.cardKey];
    if (!carta) continue;

    const matchUser = !fUser || user.includes(fUser);
    const matchKey = !fKey || rec.cardKey.toLowerCase().includes(fKey);
    if (!matchUser || !matchKey) continue;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${user}</td>
      <td>${carta.nombreClave}</td>
      <td>${carta.nombrePublico}</td>
      <td>${carta.fechaNacimiento}</td>
      <td>${carta.titulo}</td>
    `;
    tbody.appendChild(tr);
    n++;
  }

  contador.textContent = `${n} usuario(s) con carta`;
}

buscaUsuario.addEventListener("input", renderTabla);
buscaClave.addEventListener("input", renderTabla);

renderTabla();
