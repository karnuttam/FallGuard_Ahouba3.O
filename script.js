// 1. Accessibility: Text-to-Speech Engine
const speak = (text) => {
  const msg = new SpeechSynthesisUtterance(text);
  msg.rate = 0.9; // Slightly slower for clarity
  window.speechSynthesis.speak(msg);
};

// 2. Fall Simulation Logic
let isFallDetected = false;
let countdown;

function simulateFall() {
  if (isFallDetected) return;

  isFallDetected = true;
  const statusBox = document.getElementById("status-box");

  // Visual and Audio Alert
  statusBox.classList.replace("bg-green-100", "bg-red-500");
  statusBox.classList.add("animate-bounce", "text-white");
  speak("Warning. A fall has been detected. Starting emergency countdown.");

  // Start 10-second grace period
  let secondsLeft = 10;
  const timerDisplay = document.getElementById("timer");

  countdown = setInterval(() => {
    secondsLeft--;
    timerDisplay.innerText = `Sending SOS in: ${secondsLeft}s`;

    if (secondsLeft <= 0) {
      clearInterval(countdown);
      triggerSOS();
    }
  }, 1000);
}

function cancelSOS() {
  clearInterval(countdown);
  isFallDetected = false;
  const statusBox = document.getElementById("status-box");

  statusBox.classList.replace("bg-red-500", "bg-green-100");
  statusBox.classList.remove("animate-bounce", "text-white");
  document.getElementById("timer").innerText = "System Active";
  speak("Emergency cancelled. System monitoring resumed.");
}

function triggerSOS() {
  speak("SOS Alert sent to your emergency contacts with your GPS location.");
  alert("🚀 DATA SENT: {Lat: 26.14, Long: 91.73, Status: FALL_CONFIRMED}");
}

// 3. Contact Management (Local Storage)
function saveContact() {
  const name = document.getElementById("contactName").value;
  const phone = document.getElementById("contactPhone").value;
  if (name && phone) {
    localStorage.setItem("emergencyContact", JSON.stringify({ name, phone }));
    alert(`Contact Saved: ${name}`);
  }
}
