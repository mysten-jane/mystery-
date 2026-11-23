
let unlocked = Number(localStorage.getItem("mysteryProgress")) || 1;

const cases = [
  {
    title: "EL ROBO DEL MUSEO",
    description: "Un valioso cuadro desapareció durante la noche. Hay tres sospechosos.",
    clues: [
      "El guardia asegura que no salió de la entrada.",
      "Una ventana estaba abierta.",
      "El jardinero tenía barro en sus zapatos."
    ],
    answers: ["El guardia", "El jardinero", "El director"],
    correct: 1
  },
  {
    title: "LA CARTA ANÓNIMA",
    description: "Una carta misteriosa apareció sobre el escritorio. ¿Quién la dejó?",
    clues: [
      "La carta tiene tinta azul.",
      "El profesor siempre usa tinta azul.",
      "Nadie vio entrar a personas desconocidas."
    ],
    answers: ["El profesor", "El vecino", "El repartidor"],
    correct: 0
  },
  {
    title: "EL RELOJ DETENIDO",
    description: "Un reloj dejó de funcionar justo cuando desapareció un documento.",
    clues: [
      "El reloj se detuvo a las 22:00.",
      "El documento estaba en una oficina cerrada.",
      "La secretaria tenía la llave."
    ],
    answers: ["El visitante", "La secretaria", "El fotógrafo"],
    correct: 1
  }
];

function startGame() {
  showLevels();
}

function showHome() {
  document.getElementById("home").classList.remove("hidden");
  document.getElementById("levels").classList.add("hidden");
  document.getElementById("game").classList.add("hidden");
}

function showLevels() {
  document.getElementById("home").classList.add("hidden");
  document.getElementById("levels").classList.remove("hidden");
  document.getElementById("game").classList.add("hidden");

  document.getElementById("progress").textContent =
    `Nivel ${unlocked} desbloqueado`;

  const grid = document.getElementById("levelGrid");
  grid.innerHTML = "";

  for (let i = 1; i <= 100; i++) {
    const btn = document.createElement("button");
    btn.className = "level";
    btn.textContent = i <= unlocked ? `CASO ${i}` : "BLOQUEADO";
    btn.disabled = i > unlocked;
    btn.onclick = () => openCase(i);
    grid.appendChild(btn);
  }
}

function openCase(number) {
  const current = cases[(number - 1) % cases.length];

  document.getElementById("home").classList.add("hidden");
  document.getElementById("levels").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");

  document.getElementById("levelNumber").textContent = `NIVEL ${number}`;
  document.getElementById("caseTitle").textContent = current.title;
  document.getElementById("caseDescription").textContent = current.description;
  document.getElementById("feedback").textContent = "";

  const clues = document.getElementById("clues");
  clues.innerHTML = "<h3>PISTAS</h3>";

  current.clues.forEach(clue => {
    const div = document.createElement("div");
    div.className = "clue";
    div.textContent = clue;
    clues.appendChild(div);
  });

  const answers = document.getElementById("answers");
  answers.innerHTML = "<h3>¿QUIÉN ES EL RESPONSABLE?</h3>";

  current.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.onclick = () => checkAnswer(index, current.correct, number);
    answers.appendChild(btn);
  });
}

function checkAnswer(selected, correct, number) {
  const feedback = document.getElementById("feedback");

  if (selected === correct) {
    feedback.textContent = "¡CORRECTO! CASO RESUELTO.";

    if (number === unlocked && unlocked < 100) {
      unlocked++;
      localStorage.setItem("mysteryProgress", unlocked);
    }

    setTimeout(showLevels, 1200);
  } else {
    feedback.textContent = "RESPUESTA INCORRECTA. VOLVÉ A INVESTIGAR.";
  }
}

showHome();
