// encrypt.js

// ---------------------------
// Config / Mappings
// ---------------------------
const ORIGIN_CODES = {
  supervisor: "S-",
  gen_secretary: "G-",
  finance_director: "F-"
};

const DOC_TYPES = {
  internal_regulation: "IR",
  nda: "ND",
  termination: "TR",
  partnership_contract: "PC",
  license_agreement: "LA",
  employment_contract: "EC",
  funding_proposal: "FP",
  official_announcement: "OA",
  meeting_pv: "MP",
  task: "TA",
  decision: "DC",
  permission: "PR"
};

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// ---------------------------
// Base26 helpers
// ---------------------------
function toBase26(n) {
  return LETTERS[Math.floor(n / 26)] + LETTERS[n % 26];
}

// ---------------------------
// Day encoding
// ---------------------------
function encodeDay(day) {
  return toBase26(day - 1);
}

// ---------------------------
// Crypting code
// ---------------------------
function generateCryptingCode() {
  const now = new Date();

  const dayCode = encodeDay(now.getDate());
  const monthCode = LETTERS[now.getMonth()]; // JS months are 0-based
  const hourCode = toBase26(now.getHours());
  const minCode = toBase26(now.getMinutes());
  const secCode = toBase26(now.getSeconds());
  const ampm = now.getHours() < 12 ? "X" : "P";
  const year = String(now.getFullYear()).slice(-2);

  return `${dayCode}${monthCode}${hourCode}${minCode}${secCode}${ampm}${year}`;
}

// ---------------------------
// Full encrypt function
// ---------------------------
function generateReference(origin, docType, release = "first", replacementIndex = 0) {
  const originCode = ORIGIN_CODES[origin.toLowerCase()] || "U-";
  const docCode = DOC_TYPES[docType.toLowerCase()] || "XX";
  const releaseCode =
    release === "first" ? "-Ft-" : `-R${replacementIndex}-`;
  const cryptCode = generateCryptingCode();

  return `${originCode}${docCode}${releaseCode}${cryptCode}`;
}

// ---------------------------
// Example usage
// ---------------------------
const ref = generateReference("supervisor", "task", "first");
console.log("Encrypted Reference:", ref);


function generateReadableDate() {
  const now = new Date();

  const day = now.getDate();
  const year = now.getFullYear();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const monthName = months[now.getMonth()];

  return `${day} ${monthName} ${year}`;
}

let teamData = {};

  async function loadTeams() {
    const response = await fetch("data.json");
    teamData = await response.json();

    const teamSelect = document.getElementById("teamSelect");

    Object.keys(teamData).forEach(team => {
      const option = document.createElement("option");
      option.value = team;
      option.textContent = team;
      teamSelect.appendChild(option);
    });
  }

  loadTeams();

window.generateReference = generateReference;
window.generateReadableDate = generateReadableDate;
