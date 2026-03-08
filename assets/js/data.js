// ===== Cartas =====

const CARTAS_DB = {
  "eduar|07/03/2002": {
    nombreClave: "eduar",
    nombrePublico: "Eduar",
    fechaNacimiento: "07/03/2002",
    titulo: "Feliz cumpleaños, hermano",
    cuerpo:
`Feliz cumpleaños, hermano. 24 años ya… quién diría.

A veces peleamos y casi nunca te hago caso, pero igual quiero que
sepas que te quiero mucho y que me siento orgulloso de ti. No
cualquiera aguanta todo lo que has pasado para estar a nada de
terminar medicina.

Ojalá sigas creciendo como esos cactus que te gustan: fuertes,
aguantando todo, pero vivos siempre.

Ya casi eres médico, y sé que vas a ser un gran anestesiólogo.

Feliz vuelta al sol.`
  }

  // Aquí agregas más cartas:
  // "clave|DD/MM/AAAA": { nombreClave, nombrePublico, fechaNacimiento, titulo, cuerpo }
};

// ===== Usuarios =====
// passHash = SHA-256(contraseña) en hex (generado con window.hashPass)

const USERS_DB = {
  // Usuario para Eduar:
  // user: "eduar"
  // pass: "cactus24"  (ejemplo; cámbialo si quieres)
  "eduar": {
    passHash: "cb906642bfb2591b40ae2a0795894d80750bce86e9642ecb4bfc8338fcf827ff",
    cardKey: "eduar|07/03/2002",
    theme: "eduar"        // aplica tema verde especial
  }

  // Más usuarios:
  // "angie": {
  //   passHash: "<hash sha-256>",
  //   cardKey: "angie|15/09/2004",
  //   theme: "default"
  // }
};
