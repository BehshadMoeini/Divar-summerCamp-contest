const N = 4;
const M = 4;

const maxLength = (N - 1) * M + (M - 1) * N;

let turn = "R";
let selectedLines = [];

const hoverClasses = { R: "hover-red", B: "hover-blue" };
const bgClasses = { R: "bg-red", B: "bg-blue" };

let blueScore = 0;
let redScore = 0;

const playersTurnText = (turn) =>
  `It's ${turn === "R" ? "Red" : "Blue"}'s turn`;

const isLineSelected = (line) =>
  line.classList.contains(bgClasses.R) || line.classList.contains(bgClasses.B);

const createGameGrid = () => {
  const gameGridContainer = document.getElementsByClassName(
    "game-grid-container"
  )[0];

  const rows = Array(N)
    .fill(0)
    .map((_, i) => i);
  const cols = Array(M)
    .fill(0)
    .map((_, i) => i);

  rows.forEach((row) => {
    cols.forEach((col) => {
      const dot = document.createElement("div");
      dot.setAttribute("class", "dot");

      const hLine = document.createElement("div");
      hLine.setAttribute("class", `line-horizontal ${hoverClasses[turn]}`);
      hLine.setAttribute("id", `h-${row}-${col}`);
      hLine.addEventListener("click", handleLineClick);

      gameGridContainer.appendChild(dot);
      if (col < M - 1) gameGridContainer.appendChild(hLine);
    });

    if (row < N - 1) {
      cols.forEach((col) => {
        const vLine = document.createElement("div");
        vLine.setAttribute("class", `line-vertical ${hoverClasses[turn]}`);
        vLine.setAttribute("id", `v-${row}-${col}`);
        vLine.addEventListener("click", handleLineClick);

        const box = document.createElement("div");
        box.setAttribute("class", "box");
        box.setAttribute("id", `box-${row}-${col}`);

        gameGridContainer.appendChild(vLine);
        if (col < M - 1) gameGridContainer.appendChild(box);
      });
    }
  });

  document.getElementById("game-status").innerHTML = playersTurnText(turn);
};

const changeTurn = () => {
  const nextTurn = turn === "R" ? "B" : "R";

  document.querySelector("#game-status").innerHTML = `It's ${
    turn === "R" ? "Blue" : "Red"
  }'s turn`;

  const lines = document.querySelectorAll(".line-vertical, .line-horizontal");

  lines.forEach((l) => {
    //if line was not already selected, change it's hover color according to the next turn
    if (!isLineSelected(l)) {
      l.classList.replace(hoverClasses[turn], hoverClasses[nextTurn]);
    }
  });
  turn = nextTurn;
};

const handleLineClick = (e) => {
  const lineId = e.target.id;

  const lineIdSplit = lineId.split("-");
  let turnChange = true;

  if (lineIdSplit[0] === "v") {
    if (
      selectedLines.indexOf(`v-${lineIdSplit[1]}-${lineIdSplit[2] - 1}`) !==
        -1 &&
      selectedLines.indexOf(`h-${lineIdSplit[1]}-${lineIdSplit[2] - 1}`) !==
        -1 &&
      selectedLines.indexOf(
        `h-${+lineIdSplit[1] + 1}-${lineIdSplit[2] - 1}`
      ) !== -1
    ) {
      document
        .querySelector(`#box-${lineIdSplit[1]}-${lineIdSplit[2] - 1}`)
        .classList.add(turn === "R" ? "bg-red" : "bg-blue");

      turnChange = false;

      if (turn === "R") redScore += 1;
      else blueScore += 1;
    }

    if (
      selectedLines.indexOf(`v-${lineIdSplit[1]}-${+lineIdSplit[2] + 1}`) !==
        -1 &&
      selectedLines.indexOf(`h-${lineIdSplit[1]}-${lineIdSplit[2]}`) !== -1 &&
      selectedLines.indexOf(`h-${+lineIdSplit[1] + 1}-${lineIdSplit[2]}`) !== -1
    ) {
      document
        .querySelector(`#box-${lineIdSplit[1]}-${lineIdSplit[2]}`)
        .classList.add(turn === "R" ? "bg-red" : "bg-blue");

      turnChange = false;

      if (turn === "R") redScore += 1;
      else blueScore += 1;
    }
  } else {
    if (
      selectedLines.indexOf(`h-${lineIdSplit[1] - 1}-${lineIdSplit[2]}`) !==
        -1 &&
      selectedLines.indexOf(`v-${lineIdSplit[1] - 1}-${lineIdSplit[2]}`) !==
        -1 &&
      selectedLines.indexOf(
        `v-${+lineIdSplit[1] - 1}-${+lineIdSplit[2] + 1}`
      ) !== -1
    ) {
      document
        .querySelector(`#box-${lineIdSplit[1] - 1}-${lineIdSplit[2]}`)
        .classList.add(turn === "R" ? "bg-red" : "bg-blue");

      turnChange = false;

      if (turn === "R") redScore += 1;
      else blueScore += 1;
    }

    if (
      selectedLines.indexOf(`h-${+lineIdSplit[1] + 1}-${+lineIdSplit[2]}`) !==
        -1 &&
      selectedLines.indexOf(`v-${lineIdSplit[1]}-${lineIdSplit[2]}`) !== -1 &&
      selectedLines.indexOf(`v-${+lineIdSplit[1]}-${+lineIdSplit[2] + 1}`) !==
        -1
    ) {
      document
        .querySelector(`#box-${lineIdSplit[1]}-${lineIdSplit[2]}`)
        .classList.add(turn === "R" ? "bg-red" : "bg-blue");

      turnChange = false;

      if (turn === "R") redScore += 1;
      else blueScore += 1;
    }
  }

  const selectedLine = document.getElementById(lineId);

  if (isLineSelected(selectedLine)) {
    //if line was already selected, return
    return;
  }

  selectedLines = [...selectedLines, lineId];

  if (selectedLines.length === maxLength) {
    document.querySelector("#game-status").innerHTML = `won ${
      redScore > blueScore ? "Red" : "Blue"
    }`;
  }

  colorLine(selectedLine);
  if (turnChange) changeTurn();
};

const colorLine = (selectedLine) => {
  selectedLine.classList.remove(hoverClasses[turn]);
  selectedLine.classList.add(bgClasses[turn]);
};

createGameGrid();
