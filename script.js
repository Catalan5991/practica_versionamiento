const medicineForm = document.getElementById("medicineForm");
const medicineList = document.getElementById("medicineList");
const totalMedicamentos = document.getElementById("totalMedicamentos");
const tomados = document.getElementById("tomados");
const pendientes = document.getElementById("pendientes");

let medicines = [
  {
    id: 1,
    nombre: "Metformina",
    dosis: "850 mg",
    hora: "08:00",
    frecuencia: "Cada 24 horas",
    estado: "Pendiente"
  },
  {
    id: 2,
    nombre: "Losartán",
    dosis: "50 mg",
    hora: "20:00",
    frecuencia: "Cada 24 horas",
    estado: "Pendiente"
  }
];

function renderMedicines() {
  medicineList.innerHTML = "";

  if (medicines.length === 0) {
    medicineList.innerHTML = `
      <div class="empty-message">
        No hay medicamentos registrados.
      </div>
    `;
    updateSummary();
    return;
  }

  medicines.forEach((medicine) => {
    const card = document.createElement("article");
    card.className = "medicine-card";

    if (medicine.estado === "Tomado") {
      card.classList.add("taken");
    }

    if (medicine.estado === "Omitido") {
      card.classList.add("omitted");
    }

    card.innerHTML = `
      <div class="medicine-info">
        <h3>${medicine.nombre}</h3>
        <p><strong>Dosis:</strong> ${medicine.dosis}</p>
        <p><strong>Hora:</strong> ${medicine.hora}</p>
        <p><strong>Frecuencia:</strong> ${medicine.frecuencia}</p>
        <span class="status ${getStatusClass(medicine.estado)}">${medicine.estado}</span>
      </div>

      <div class="card-actions">
        <button class="btn-success" onclick="changeStatus(${medicine.id}, 'Tomado')">Marcar tomado</button>
        <button class="btn-warning" onclick="changeStatus(${medicine.id}, 'Omitido')">Marcar omitido</button>
        <button class="btn-danger" onclick="deleteMedicine(${medicine.id})">Eliminar</button>
      </div>
    `;

    medicineList.appendChild(card);
  });

  updateSummary();
}

function getStatusClass(status) {
  if (status === "Tomado") {
    return "taken";
  }

  if (status === "Omitido") {
    return "omitted";
  }

  return "pending";
}

function updateSummary() {
  const total = medicines.length;
  const taken = medicines.filter((medicine) => medicine.estado === "Tomado").length;
  const pending = medicines.filter((medicine) => medicine.estado === "Pendiente").length;

  totalMedicamentos.textContent = total;
  tomados.textContent = taken;
  pendientes.textContent = pending;
}

function changeStatus(id, newStatus) {
  medicines = medicines.map((medicine) => {
    if (medicine.id === id) {
      return {
        ...medicine,
        estado: newStatus
      };
    }

    return medicine;
  });

  renderMedicines();
}

function deleteMedicine(id) {
  medicines = medicines.filter((medicine) => medicine.id !== id);
  renderMedicines();
}

medicineForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const dosis = document.getElementById("dosis").value.trim();
  const hora = document.getElementById("hora").value;
  const frecuencia = document.getElementById("frecuencia").value;

  const newMedicine = {
    id: Date.now(),
    nombre,
    dosis,
    hora,
    frecuencia,
    estado: "Pendiente"
  };

  medicines.push(newMedicine);

  medicineForm.reset();
  renderMedicines();
});

renderMedicines();
