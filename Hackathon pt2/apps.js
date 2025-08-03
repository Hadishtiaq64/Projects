 const menu = document.querySelector('#mobile-menu');
 const menuLinks = document.querySelector('.navbar__menu');

 menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
 });

 // User's medication list
let medications = [];

// Tab switching functionality
function showTab(tabName) {
  // Hide all tabs
  document.querySelectorAll(".tab-content").forEach((tab) => {
    tab.classList.add("hidden");
  });

  // Remove active class from all buttons
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Show selected tab and activate button
  document.getElementById(tabName + "-tab").classList.remove("hidden");
  event.target.classList.add("active");
}

// Simulate Google Gemini API call for symptom analysis
async function analyzeSymptoms() {
  const symptoms = document.getElementById("symptoms").value;
  const severity = document.getElementById("severity").value;
  const duration = document.getElementById("duration").value;

  if (!symptoms.trim()) {
    alert("Please describe your symptoms first.");
    return;
  }

  // Show loading
  document.getElementById("loading").style.display = "block";
  document.getElementById("results").classList.add("hidden");

  // Simulate API delay
  setTimeout(() => {
    // Hide loading
    document.getElementById("loading").style.display = "none";

    // Generate mock analysis based on symptoms
    const analysis = generateMockAnalysis(symptoms, severity, duration);
    displayAnalysis(analysis);

    document.getElementById("results").classList.remove("hidden");
  }, 2000);
}

function generateMockAnalysis(symptoms, severity, duration) {
  const symptomsLower = symptoms.toLowerCase();
  let analysis = {
    assessment: "",
    medications: [],
    procedures: [],
    needsHospital: false,
  };

  // Simple keyword-based analysis (in real implementation, this would use Gemini API)
  if (
    symptomsLower.includes("headache") ||
    symptomsLower.includes("head pain")
  ) {
    analysis.assessment =
      "Based on your symptoms, you may be experiencing a tension headache or migraine.";
    analysis.medications = [
      {
        name: "Ibuprofen (Advil)",
        dosage: "200-400mg every 4-6 hours",
        note: "Anti-inflammatory pain reliever",
      },
      {
        name: "Acetaminophen (Tylenol)",
        dosage: "500-1000mg every 4-6 hours",
        note: "Pain reliever and fever reducer",
      },
    ];
    analysis.procedures = [
      "Rest in a quiet, dark room",
      "Apply cold or warm compress to head/neck",
      "Stay hydrated",
      "Practice relaxation techniques",
    ];
  } else if (
    symptomsLower.includes("fever") ||
    symptomsLower.includes("temperature")
  ) {
    analysis.assessment =
      "You appear to have a fever, which may indicate an infection or illness.";
    analysis.medications = [
      {
        name: "Acetaminophen (Tylenol)",
        dosage: "500-1000mg every 4-6 hours",
        note: "Fever reducer and pain reliever",
      },
      {
        name: "Ibuprofen (Advil)",
        dosage: "200-400mg every 4-6 hours",
        note: "Anti-inflammatory and fever reducer",
      },
    ];
    analysis.procedures = [
      "Monitor temperature regularly",
      "Increase fluid intake",
      "Get plenty of rest",
      "Use cool cloths on forehead",
    ];

    if (severity === "severe" || symptomsLower.includes("high fever")) {
      analysis.needsHospital = true;
    }
  } else if (
    symptomsLower.includes("nausea") ||
    symptomsLower.includes("stomach")
  ) {
    analysis.assessment =
      "Your symptoms suggest possible digestive issues or stomach upset.";
    analysis.medications = [
      {
        name: "Pepto-Bismol",
        dosage: "Follow package directions",
        note: "For upset stomach and nausea",
      },
      {
        name: "Dramamine",
        dosage: "1-2 tablets every 4-6 hours",
        note: "For motion sickness and nausea",
      },
    ];
    analysis.procedures = [
      "Eat bland foods (BRAT diet)",
      "Stay hydrated with small sips",
      "Avoid dairy and fatty foods",
      "Rest and avoid sudden movements",
    ];
  } else {
    analysis.assessment =
      "Based on your symptoms, here are some general recommendations.";
    analysis.medications = [
      {
        name: "Acetaminophen (Tylenol)",
        dosage: "500mg every 4-6 hours",
        note: "General pain relief",
      },
    ];
    analysis.procedures = [
      "Get adequate rest",
      "Stay hydrated",
      "Monitor symptoms",
      "Consult a healthcare provider if symptoms worsen",
    ];
  }

  // Check for severe symptoms
  if (
    severity === "severe" ||
    symptomsLower.includes("chest pain") ||
    symptomsLower.includes("difficulty breathing") ||
    symptomsLower.includes("severe pain")
  ) {
    analysis.needsHospital = true;
  }

  return analysis;
}

function displayAnalysis(analysis) {
  // Display assessment
  document.getElementById("analysis-content").innerHTML = `
    <p><strong>Assessment:</strong> ${analysis.assessment}</p>
    <p><em>This is an AI-generated assessment and should not replace professional medical advice.</em></p>
  `;

  // Display medications
  const otcList = document.getElementById("otc-list");
  otcList.innerHTML = "";
  analysis.medications.forEach((med) => {
    otcList.innerHTML += `
      <div class="med-item">
        <h4>${med.name}</h4>
        <p><strong>Dosage:</strong> ${med.dosage}</p>
        <p><strong>Note:</strong> ${med.note}</p>
      </div>
    `;
  });

  // Display procedures
  const procedureList = document.getElementById("procedure-list");
  procedureList.innerHTML = "";
  analysis.procedures.forEach((procedure) => {
    procedureList.innerHTML += `
      <div class="procedure-item">
        <i class="fa-solid fa-check"></i> ${procedure}
      </div>
    `;
  });

  // Show hospital finder if needed
  if (analysis.needsHospital) {
    document
      .getElementById("hospital-section")
      .classList.remove("hidden");
  } else {
    document.getElementById("hospital-section").classList.add("hidden");
  }
}

function findNearbyHospitals() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      showHospitals,
      handleLocationError
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showHospitals(position) {
  // In a real implementation, this would use Google Maps API or similar
  const hospitalList = document.getElementById("hospital-list");
  hospitalList.innerHTML = `
    <div style="margin-top: 20px; background: rgba(255,255,255,0.9); color: #333; padding: 20px; border-radius: 10px;">
      <h4>Nearby Hospitals (Mock Data)</h4>
      <div style="margin: 10px 0;">
        <strong>General Hospital</strong><br>
        123 Main St, Your City<br>
        Distance: 2.3 miles<br>
        Phone: (555) 123-4567
      </div>
      <div style="margin: 10px 0;">
        <strong>Emergency Medical Center</strong><br>
        456 Health Ave, Your City<br>
        Distance: 3.1 miles<br>
        Phone: (555) 987-6543
      </div>
      <p><em>In a real emergency, call 911 immediately.</em></p>
    </div>
  `;
}

function handleLocationError(error) {
  alert(
    "Unable to retrieve your location. Please enter your location manually or call 911 for emergencies."
  );
}

function addMedication() {
  const name = document.getElementById("med-name").value;
  const dosage = document.getElementById("med-dosage").value;
  const frequency = document.getElementById("med-frequency").value;
  const time = document.getElementById("med-time").value;

  if (!name || !dosage) {
    alert("Please fill in medication name and dosage.");
    return;
  }

  const medication = {
    id: Date.now(),
    name: name,
    dosage: dosage,
    frequency: frequency,
    time: time,
    nextDose: calculateNextDose(time, frequency),
  };

  medications.push(medication);
  updateMedicationSchedule();

  // Clear form
  document.getElementById("med-name").value = "";
  document.getElementById("med-dosage").value = "";
  document.getElementById("med-time").value = "08:00";

  alert("Medication added successfully!");
}

function calculateNextDose(startTime, frequency) {
  const now = new Date();
  const today = new Date();
  const [hours, minutes] = startTime.split(":");
  today.setHours(parseInt(hours), parseInt(minutes), 0, 0);

  let nextDose = new Date(today);

  // If the time has passed today, move to next dose
  if (nextDose <= now) {
    switch (frequency) {
      case "once":
        nextDose.setDate(nextDose.getDate() + 1);
        break;
      case "twice":
        nextDose.setHours(nextDose.getHours() + 12);
        break;
      case "thrice":
        nextDose.setHours(nextDose.getHours() + 8);
        break;
      case "four":
        nextDose.setHours(nextDose.getHours() + 6);
        break;
      default:
        nextDose.setDate(nextDose.getDate() + 1);
    }
  }

  return nextDose;
}

function updateMedicationSchedule() {
  const scheduleDiv = document.getElementById("med-schedule");

  if (medications.length === 0) {
    scheduleDiv.innerHTML = `
      <div class="med-card">
        <h4>No medications added yet</h4>
        <p>Add medications in the Medication Tracker tab to see your schedule here.</p>
      </div>
    `;
    return;
  }

  scheduleDiv.innerHTML = "";
  medications.forEach((med) => {
    const nextDoseString = med.nextDose.toLocaleString();
    scheduleDiv.innerHTML += `
      <div class="med-card">
        <h4>${med.name}</h4>
        <p><strong>Dosage:</strong> ${med.dosage}</p>
        <p><strong>Frequency:</strong> ${
          med.frequency.charAt(0).toUpperCase() + med.frequency.slice(1)
        } daily</p>
        <p class="next-dose"><strong>Next Dose:</strong> ${nextDoseString}</p>
        <button class="btn-primary" onclick="removeMedication(${
          med.id
        })" style="background: #ff6b6b; padding: 8px 16px; font-size: 14px;">
          Remove
        </button>
      </div>
    `;
  });
}

function removeMedication(id) {
  medications = medications.filter((med) => med.id !== id);
  updateMedicationSchedule();
}

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  updateMedicationSchedule();
});