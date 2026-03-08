const cont = document.getElementById("contenido");

function normUser(s) {
  return (s || "").trim().toLowerCase();
}

function setTheme(theme) {
  document.body.classList.remove("theme-eduar");
  if (theme === "eduar") document.body.classList.add("theme-eduar");
}

function renderNotFound() {
  cont.innerHTML = `
    <h1>No se pudo abrir la carta</h1>
    <h2>Acceso inválido</h2>
    <p class="cuerpo"></p>
  `;
  cont.querySelector(".cuerpo").textContent =
`Vuelve al inicio e ingresa con tus credenciales.`;
}

function renderCarta(carta) {
  cont.innerHTML = `
    <h1></h1>
    <h2></h2>
    <p class="cuerpo"></p>
    <p class="cuerpo cuerpo--final"></p>
  `;
  cont.querySelector("h1").textContent = carta.titulo;
  cont.querySelector("h2").textContent =
    `${carta.nombrePublico} — ${carta.fechaNacimiento}`;
  cont.querySelectorAll(".cuerpo")[0].textContent = carta.cuerpo;

  // Texto final completo
  cont.querySelector(".cuerpo--final").textContent =
`Gracias por todo lo que me has enseñado. Sé que no soy el mejor hermano del mundo, pero lo intento.
Me siento orgulloso de lo que eres y de lo que vas a ser, porque sé cuánto has sufrido y lo mucho
que te has esforzado para estar donde estás.

Te quiero mucho, coso. Nunca pares, por más que te digan. Eres el mejor, ahora y siempre.

Con cariño,
tu hermano menor.`;
}

/**
 * Lista de fotos por usuario, cada foto con su mensaje.
 */
function renderFotos(user) {
  const container = document.getElementById("fotosLista");
  if (!container) return;

  let fotos = [];

  if (user === "eduar") {
    fotos = [
      {
        src: "../assets/img/con mami.jpg",
        alt: "Con mami",
        texto:
"Mi mami me contó que este fue un paseo en un barco llamado Alcatraz. Que nos divertimos un montón ese día, después de que yo pusiera cara (como casi siempre)."
      },
      {
        src: "../assets/img/con papi.jpg",
        alt: "Con papi",
        texto:
"Un paseo cualquiera por las murallas que se volvió importante e histórico para mí, porque es de las pocas fotos en las que estamos pequeños y bien con mi papá."
      },
      {
        src: "../assets/img/damn.jpg",
        alt: "Paseo por pueblitos",
        texto:
"Uno de esos paseos por pueblitos. Hasta donde recuerdo, tú no soltabas una rama ese día, cuando nos bajamos en la finca de esa pareja a orilla del río."
      },
      {
        src: "../assets/img/confirmación.jpg",
        alt: "Confirmación",
        texto:
"Mi confirmación. Gracias por acompañarme, coso maluco. Te quiero mucho y siempre me ha hecho bien que estés ahí en mis momentos importantes."
      },
      {
        src: "../assets/img/grado samuel.jpg",
        alt: "Grado de Samuel",
        texto:
"De este momento casi no tengo palabras. Aunque mi papá no estaba, ahí estabas tú: insistiendo, jodiéndome y fregándome la vida solo para verme ser mejor persona y mejor en todo. Nada de eso habría sido posible sin ti, coso maluco. Te quiero mucho."
      }
    ];
  } else {
    fotos = [];
  }

  if (!fotos.length) {
    container.innerHTML = `<p class="fineprint">Aún no te he puesto fotos aquí.</p>`;
    return;
  }

  container.innerHTML = "";
  fotos.forEach((f) => {
    const figure = document.createElement("figure");
    figure.className = "photoBlock";
    figure.innerHTML = `
      <div class="photoBlock__imgWrap">
        <img src="${f.src}" alt="${f.alt || ""}">
      </div>
      <figcaption class="photoBlock__caption">${f.texto || ""}</figcaption>
    `;
    container.appendChild(figure);
  });
}

document.getElementById("logout")?.addEventListener("click", () => {
  sessionStorage.removeItem("loggedUser");
  window.location.href = "../index.html";
});

const qs = new URLSearchParams(location.search);
const u = normUser(qs.get("u"));
const logged = normUser(sessionStorage.getItem("loggedUser"));

if (!u || !logged || u !== logged) {
  renderNotFound();
} else {
  const rec = USERS_DB?.[u];
  const carta = rec ? CARTAS_DB?.[rec.cardKey] : null;
  if (!rec || !carta) {
    renderNotFound();
  } else {
    setTheme(rec.theme || "default");
    renderCarta(carta);
    renderFotos(u);
  }
}
