# 🧪 Medilab – Web-Based Medical Laboratory Management System

Medilab is a full-stack web application built to streamline and digitize diagnostic lab operations. It handles everything from patient registration and inventory-aware appointment booking to technician test result entry and patient report access. Designed with modularity, efficiency, and real-world workflows in mind, this system is ideal for small to mid-sized medical labs.

---

## 🚀 Features

### 🧍 Patient Management
- Register patients via an intuitive web form.
- Automatically schedule appointments if the required test kits are available.

### 📦 Inventory-Aware Scheduling
- Checks inventory in real-time (`available_kits`) before booking an appointment.
- Prevents overbooking and ensures kits are only assigned when available.

### 👨‍🔬 Technician Workflow
- Secure technician login.
- Appointments are shown by oldest-first policy.
- Only relevant test fields (e.g., COVID, Sugar) are enabled for input.
- Automatically stores `NULL` for tests not requested.

### 📄 Report Generation
- Test results are entered into `Reports` and `Test_Results` tables.
- Patients can check their report online.
- Displays a friendly message if the report is not yet completed.

---

## 🛠️ Tech Stack

| Layer       | Technology                  |
|-------------|-----------------------------|
| Frontend    | HTML5, CSS3, JavaScript     |
| Backend     | Node.js, Express.js         |
| Database    | SQL Server (via msnodesqlv8)|
| Validation  | express-validator           |

---

## 🗂️ Project Structure

