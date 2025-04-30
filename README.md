# 🧪 Medilab – Web-Based Medical Laboratory Management System

![GitHub repo size](https://img.shields.io/github/repo-size/yourusername/medilab)
![GitHub last commit](https://img.shields.io/github/last-commit/yourusername/medilab)
![Issues](https://img.shields.io/github/issues/yourusername/medilab)
![Forks](https://img.shields.io/github/forks/yourusername/medilab?style=social)
![Stars](https://img.shields.io/github/stars/yourusername/medilab?style=social)

> 💡 A complete, end-to-end solution for managing patient registration, appointment scheduling, technician test entry, and report generation for medical labs.

---

## 📌 Table of Contents

- [🚀 Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🗂️ Project Structure](#️-project-structure)
- [⚙️ Setup Instructions](#️-setup-instructions)
- [✅ Future Enhancements](#-future-enhancements)
- [📄 License](#-license)
- [🙋‍♂️ Author](#-author)

---

## 🚀 Features

### 🧍 Patient Management
- Register patients via an intuitive web form.
- Automatically schedules appointments if required test kits are available.

### 📦 Inventory-Aware Scheduling
- Checks real-time kit availability before confirming appointments.
- Prevents overbooking and preserves resources.

### 👨‍🔬 Technician Workflow
- Secure technician login.
- Appointments appear in order of oldest first.
- Input fields for test parameters are dynamically enabled based on appointment type.
- Stores `NULL` for unrequested tests to ensure clean database structure.

### 📄 Report Generation
- Patients can check their test results via a report interface.
- Shows a user-friendly message if the report is still pending.

---

## 🛠️ Tech Stack

| Layer         | Technology                      |
|---------------|----------------------------------|
| Frontend      | HTML5, CSS3, JavaScript          |
| Backend       | Node.js, Express.js              |
| Database      | Microsoft SQL Server (msnodesqlv8) |
| Validation    | express-validator                |

---

## 🗂️ Project Structure

