# 🧪 Medilab: Web-Based Lab Test Management System

![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)  
![SQL Server](https://img.shields.io/badge/Database-SQL--Server-blue.svg)  
![JavaScript](https://img.shields.io/badge/Language-JavaScript-yellow.svg)  
![License](https://img.shields.io/badge/License-MIT-brightgreen.svg)  
![Status](https://img.shields.io/badge/Status-Active-success.svg)

---

## 📑 Table of Contents

- [🚀 Features](#-features)
- [🔍 Detailed Analysis](#-detailed-analysis)
  - [Patient Registration Form](#patient-registration-form)
  - [Patient Report Display](#patient-report-display)
  - [Technician Login Portal](#technician-login-portal)
  - [Technician Workflow](#technician-workflow)
- [🛠️ Future Enhancements](#️-future-enhancements)
- [📥 Project Download](#-project-download)

---

## 🚀 Features

- ✅ **Automatic Appointment Booking**: The system automatically books appointments based on the availability of test kits.
- ✅ **Dynamic Form Inputs**: The patient registration form dynamically disables irrelevant input fields based on selected tests.
- ✅ **Technician Workflow**: Technicians can log in to access assigned appointments and enter test results, which are then stored in the database.
- ✅ **Patient Report**: Reports are displayed to the patient only when they are marked as "Completed" by the technician.
- ✅ **SQL Server Backend**: A fully integrated SQL Server database stores all patient, appointment, test, and technician-related data.

---

## 🔍 Detailed Analysis

### Patient Registration Form

The **Patient Registration Form** allows patients to sign up by entering their personal details, including name, age, contact information, and the tests they require. The form is designed to dynamically adjust based on the tests selected by the patient. For example, if a patient selects a COVID test, input fields related to COVID symptoms or travel history might become available. Once the form is submitted:

- A new record is created in the **Patients** table in the database.
- An appointment is automatically booked for the patient if there are available test kits for the selected tests.
- The patient's status is initially set as "Pending" in the appointment table.
  
This form enhances the user experience by guiding patients through the registration process based on their needs.

---

### Patient Report Display

After a patient has completed their tests and the technician has entered the test results, the **Patient Report Display** shows the patient's test results. The report is accessible from a separate page (`result.html`) and only becomes available if the appointment status is marked as **Completed**.

- If the test is complete, the form displays the test results, including the test name, result values, and a status of whether the patient passed or failed the test.
- If the appointment is still in progress, a message is shown, informing the patient that the report is not ready yet.

This feature ensures that patients only receive completed and accurate test results.

---

### Technician Login Portal

The **Technician Login Portal** allows technicians to log into the system using their credentials. After a successful login, they are redirected to a page where they can view a list of pending appointments.

- Technicians can access details for each appointment, including the patient's information and the specific tests requested.
- The system disables form fields for tests that are not included in the current appointment, preventing the technician from entering irrelevant data.
  
This portal is key for ensuring technicians only interact with the data they are assigned to, improving workflow efficiency and accuracy.

---

### Technician Workflow

Once logged in, the **Technician Workflow** comes into play. Technicians can select an appointment, review the patient's information, and input test results into a form.

- Only the relevant tests for the current appointment are shown, based on the patient's request.
- After entering the results, the technician can submit them to the database, updating the **Test Results** table.
- Once all required tests have been completed, the **Appointment Status** is marked as "Completed," making the patient's report available for display.

This ensures that test results are properly logged and tracked, and patients receive their reports only after all necessary tests have been processed.

---

## 🛠️ Future Enhancements

- 🧑‍💼 **Admin Panel**: Add an admin dashboard to manage inventory, users, and appointments.
- ✉️ **SMS/Email Notifications**: Implement notifications for appointment confirmation and report readiness.
- 🔐 **Role-Based Access Control**: Implement role-based access for Admin, Technician, and Patient.
- 📱 **Responsive UI**: Improve the frontend to be fully responsive and accessible on mobile and tablet devices.
- 📊 **Advanced Data Analytics**: Add an analytics dashboard to visualize lab test statistics, trends, and other key data.

---

## 📥 Project Download

To download and run this project:

1. [Download the ZIP file](ahmadZeeshan292/-Medical-Lab-Testing-Management-System-Web-Application/blob/main/db-project_v4.zip) containing the full project.
2. **Extract the contents** of the ZIP file to a directory of your choice.
3. Follow the **Setup Instructions** to install dependencies and configure your database connection.


 
