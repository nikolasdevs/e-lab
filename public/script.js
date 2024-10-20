// //import { API_CLASS_ENDPOINT, API_MEDICINE_ENDPOINT } from "./config.js";
// const apiClassEndpoint = process.env.API_CLASS_ENDPOINT;
// const apiMedicineEndpoint = process.env.API_MEDICINE_ENDPOINT;
// document.addEventListener("DOMContentLoaded", () => {
//   const openIcon = document.getElementById("menuIcon");
//   const menu = document.getElementById("menu");
//   const mediaQuery = window.matchMedia("(max-width: 680px)");

//   const table = document.getElementById("medicineTable");
//   // const table = document
//   //   .getElementById("medicineTable")
//   //   .getElementsByTagName("tbody")[0];
//   table.innerHTML = "";
//   const medicineForm = document.getElementById("medicineForm");

//   const searchClassInput = document.getElementById("searchClassInput");
//   const searchClassList = document.getElementById("searchClassList");
//   const searchMedicineList = document.getElementById("searchMedicineList");
//   const medicineNameInput = document.getElementById("medicineNameInput");
//   const strengthInput = document.getElementById("strength");
//   const intervalInput = document.getElementById("interval");
//   const durationInput = document.getElementById("duration");
//   const instructionInput = document.getElementById("instruction");
//   const medicineLoading = document.getElementById("medicineLoading");

//   let medicines = [];

//   async function fetchMedicineClass() {
//     try {
//       const response = await fetch(apiClassEndpoint);
//       if (!response.ok) {
//         throw new Error(
//           `Error fetching data: ${response.status} ${response.statusText}`
//         );
//       }
//       const data = await response.json();
//       medicineClassDropdown(data);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   /* ====================== Populate Search Medicine Class Input List ====================== */

//   function medicineClassDropdown(medicineClass) {
//     medicineClass.forEach((classes) => {
//       const listItem = document.createElement("li");
//       listItem.value = classes.id;

//       listItem.textContent = classes.name;
//       listItem.style.cursor = "pointer";
//       listItem.style.paddingInline = "0.5rem";
//       listItem.style.paddingBlock = "0.6rem";

//       listItem.addEventListener("click", () => {
//         searchClassInput.value = classes.name;
//         searchClassInput.dataset.classId = classes.id;
//         searchClassList.style.display = "none";

//         searchMedicineList.style.display = "block";

//         fetchMedicineName(classes.id).then(() => {
//           if (
//             searchMedicineList.children.length > 0 &&
//             searchMedicineList.children[0].textContent !==
//               "No medicines available for this class."
//           ) {
//             medicineNameInput.focus();
//           }
//         });
//       });

//       searchClassList.appendChild(listItem);
//     });
//   }

//   /* ====================== Fetch Medicine Names By Class Id ====================== */

//   async function fetchMedicineName(classId) {
//     try {
//       medicineLoading.style.display = "block";

//       searchMedicineList.style.display = "block";

//       const response = await fetch(`${apiMedicineEndpoint}/${classId}`);
//       if (!response.ok) {
//         throw new Error(
//           `Error fetching medicines: ${response.status} ${response.statusText}`
//         );
//       }
//       const mData = await response.json();

//       medicineNameDropdown(mData);
//     } catch (error) {
//       console.error("Failed to fetch medicines:", error);
//       alert("Failed to fetch medicines. Please try again later.");
//       searchMedicineList.innerHTML = "";
//       searchMedicineList.style.display = "none";
//     } finally {
//       medicineLoading.style.display = "none";
//     }
//   }

//   /* ====================== Populate Search Medicine Input List By Class Id ====================== */

//   function medicineNameDropdown(medicineNames) {
//     searchMedicineList.innerHTML = "";
//     medicineNames.forEach((medicine) => {
//       const listItem = document.createElement("li");
//       listItem.value = medicine.id;
//       listItem.textContent = medicine.medicine_name;
//       listItem.style.cursor = "pointer";
//       listItem.style.paddingInline = "0.5rem";
//       listItem.style.paddingBlock = "0.6rem";

//       listItem.addEventListener("click", () => {
//         medicineNameInput.value = medicine.medicine_name;
//         medicineNameInput.dataset.medicineId = medicine.id;
//         searchMedicineList.style.display = "none";
//       });

//       searchMedicineList.appendChild(listItem);
//     });
//   }

//   // const tHeadId = tableHead.insertCell();
//   // tHeadId.textContent = "ID";
//   /* ====================== Create Table ====================== */

//   function populateMedicineTable(medicines) {
//     table.innerHTML = "";
//     const thead = table.createTHead();
//     const headRow = thead.insertRow();

//     const headIdCell = headRow.insertCell(0);
//     headIdCell.textContent = "S/N";

//     const headNameCell = headRow.insertCell(1);
//     headNameCell.textContent = "Medicine Class";

//     const headMedicineNameCell = headRow.insertCell(2);
//     headMedicineNameCell.textContent = "Medicine Name";

//     const headStrengthCell = headRow.insertCell(3);
//     headStrengthCell.textContent = "Strength";

//     const headIntervalDurationCell = headRow.insertCell(4);
//     headIntervalDurationCell.textContent = "Interval / Duration";

//     const headInstructionCell = headRow.insertCell(5);
//     headInstructionCell.textContent = "Instruction";

//     const headActionCell = headRow.insertCell(6);
//     headActionCell.textContent = "Action";

//     const tbody = table.createTBody();

//     medicines.forEach((medicine, index) => {
//       const row = tbody.insertRow();

//       const idCell = row.insertCell(0);
//       idCell.textContent = index + 1;
//       const nameCell = row.insertCell(1);
//       nameCell.textContent = medicine.class_name;
//       const medicineNameCell = row.insertCell(2);
//       medicineNameCell.textContent = medicine.medicine_name;
//       const strengthCell = row.insertCell(3);
//       strengthCell.textContent = medicine.strength;
//       const intervalDurationCell = row.insertCell(4);
//       intervalDurationCell.textContent = `${medicine.interval}/${medicine.duration}`;
//       const instructionCell = row.insertCell(5);
//       instructionCell.textContent = medicine.instruction;
//       const actionCell = row.insertCell(6);

//       const removeBtn = document.createElement("button");
//       removeBtn.textContent = "Remove";
//       removeBtn.classList.add("btn", "btn-remove");
//       removeBtn.dataset.index = index;
//       actionCell.appendChild(removeBtn);
//     });
//   }

//   /* ====================== Add Medicine Function ====================== */

//   function addMedicine(event) {
//     try {
//       event.preventDefault();

//       const classId = searchClassInput.dataset.classId;
//       const medicineClassName = searchClassInput.value.trim();
//       const medicineId = medicineNameInput.dataset.medicineId;
//       const medicineName = medicineNameInput.value.trim();
//       const strength = strengthInput.value.trim();
//       const interval = intervalInput.value.trim();
//       const duration = durationInput.value.trim();
//       const instruction = instructionInput.value.trim();

//       //Validation;
//       if (
//         !medicineClassName ||
//         !medicineName ||
//         !strength ||
//         !interval ||
//         !duration ||
//         !instruction
//       ) {
//         alert("Please fill in all fields.");
//         return;
//       } else {
//         const newMedicine = {
//           class_id: classId,
//           class_name: medicineClassName,
//           medicine_id: medicineId,
//           medicine_name: medicineName,
//           strength: strength,
//           interval: interval,
//           duration: duration,
//           instruction: instruction,
//         };

//         // Add to medicines array
//         medicines.push(newMedicine);

//         localStorage.setItem("medicines", JSON.stringify(medicines));

//         // Update the table
//         populateMedicineTable(medicines);

//         alert("Medicine added successfully!");
//       }
//       // Clear input fields
//       searchClassInput.value = "";
//       searchClassInput.dataset.classId = "";
//       medicineNameInput.value = "";
//       medicineNameInput.dataset.medicineId = "";
//       strengthInput.value = "";
//       intervalInput.value = "";
//       durationInput.value = "";
//       instructionInput.value = "";
//     } catch (error) {
//       console.error("Failed to add medicine:", error);
//     }
//   }

//   medicineForm.addEventListener("submit", addMedicine);

//   /* ====================== Remove Medicine Function ====================== */

//   function removeMedicine(index) {
//     if (confirm("Are you sure you want to remove this medicine?")) {
//       medicines.splice(index, 1);

//       localStorage.setItem("medicines", JSON.stringify(medicines));

//       populateMedicineTable(medicines);

//       // alert("Medicine removed successfully!");
//     }
//   }

//   /* ====================== Load Medicines from localStorage ====================== */

//   function loadMedicinesFromStorage() {
//     const storedMedicines = localStorage.getItem("medicines");
//     if (storedMedicines) {
//       medicines = JSON.parse(storedMedicines);
//       populateMedicineTable(medicines);
//     } else {
//       medicines = [];
//       table.innerHTML = "";
//     }
//   }

//   /* ====================== DROPDOWN LIST CLASS ====================== */

//   function debounce(func, delay) {
//     let debounceTimer;
//     return function () {
//       const context = this;
//       const args = arguments;
//       clearTimeout(debounceTimer);
//       debounceTimer = setTimeout(() => func.apply(context, args), delay);
//     };
//   }

//   function dropDownClassList() {
//     searchClassInput.addEventListener("focus", () => {
//       searchClassList.style.display = "block";
//     });

//     searchClassInput.addEventListener("click", () => {
//       searchClassList.style.display = "block";
//     });

//     searchClassInput.addEventListener(
//       "input",
//       debounce(() => {
//         const searchValue = searchClassInput.value.toLowerCase();
//         const searchClassListItems = searchClassList.children;

//         Array.from(searchClassListItems).forEach((item) => {
//           if (item.textContent.toLowerCase().includes(searchValue)) {
//             item.style.display = "block";
//           } else {
//             item.style.display = "none";
//           }
//         });

//         searchClassList.style.display = searchValue ? "block" : "none";
//       }, 100)
//     );

//     document.addEventListener("click", (event) => {
//       if (
//         !searchClassList.contains(event.target) &&
//         event.target !== searchClassInput
//       ) {
//         searchClassList.style.display = "none";
//       }
//     });
//   }

//   dropDownClassList();

//   function dropDownMedicineList() {
//     // Show the list when the input is focused or clicked
//     medicineNameInput.addEventListener("focus", () => {
//       searchMedicineList.style.display = "block";
//     });

//     medicineNameInput.addEventListener("click", () => {
//       searchMedicineList.style.display = "block";
//     });

//     medicineNameInput.addEventListener(
//       "input",
//       debounce(() => {
//         const searchValue = medicineNameInput.value.toLowerCase();
//         const searchMedicineListItems = searchMedicineList.children;

//         Array.from(searchMedicineListItems).forEach((item) => {
//           if (item.textContent.toLowerCase().includes(searchValue)) {
//             item.style.display = "block";
//           } else {
//             item.style.display = "none";
//           }
//         });

//         searchMedicineList.style.display = searchValue ? "block" : "none";
//       }, 300)
//     );

//     document.addEventListener("click", (event) => {
//       if (
//         !searchMedicineList.contains(event.target) &&
//         event.target !== medicineNameInput
//       ) {
//         searchMedicineList.style.display = "none";
//       }
//     });
//   }
//   dropDownMedicineList();

//   // Remove button click
//   table.addEventListener("click", (event) => {
//     if (event.target.classList.contains("btn-remove")) {
//       const index = parseInt(event.target.dataset.index, 10);
//       removeMedicine(index);
//     }
//   });

//   loadMedicinesFromStorage();

//   function asyncOperation() {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         openIcon.addEventListener("click", function () {
//           if (mediaQuery.matches) {
//             if (menu.classList.contains("open")) {
//               openIcon.classList.remove("open");
//               menu.classList.remove("open");
//               menu.classList.add("close");

//               menu.addEventListener(
//                 "animationend",
//                 function () {
//                   if (menu.classList.contains("close")) {
//                     menu.style.display = "none";
//                     menu.classList.remove("close");
//                   }
//                 },
//                 { once: true }
//               );
//             } else {
//               menuIcon.classList.add("open");
//               menu.style.display = "block";
//               menu.classList.add("open");
//             }
//           }
//         });

//         resolve();
//       }, 1000);
//     });
//   }

//   asyncOperation()
//     .then((result) => console.log(result))
//     .catch((error) => console.error(error));

//   /* ====================== Initialize Application ====================== */
//   // Load medicines from localStorage on page load
//   loadMedicinesFromStorage();

//   // Populate the Medicine Name dropdown from API
//   fetchMedicineClass();
// });
