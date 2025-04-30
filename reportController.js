const { poolPromise, sql } = require('../db');
const { v4: uuidv4 } = require('uuid');

// Submit a new report
/*exports.submitReport = async (req, res) => {
  const { appointment_id, tech_id, results } = req.body;

  if (!appointment_id || !tech_id || !Array.isArray(results)) {
    return res.status(400).json({ message: 'appointment_id, tech_id, and results are required' });
  }

  try {
    const pool = await poolPromise;

    const report_id = uuidv4();

    // Insert into Reports table
    await pool.request()
      .input('report_id', sql.UniqueIdentifier, report_id)
      .input('appointment_id', sql.UniqueIdentifier, appointment_id)
      .input('tech_id', sql.UniqueIdentifier, tech_id)
      .query(`
        INSERT INTO Reports (report_id, appointment_id, tech_id)
        VALUES (@report_id, @appointment_id, @tech_id)
      `);

    // Insert into Test_Results table
    for (const result of results) {
      await pool.request()
        .input('result_id', sql.UniqueIdentifier, uuidv4())
        .input('report_id', sql.UniqueIdentifier, report_id)
        .input('parameter', sql.VarChar(100), result.parameter)
        .input('value', sql.VarChar(100), result.value)
        .query(`
          INSERT INTO Test_Results (result_id, report_id, parameter, value)
          VALUES (@result_id, @report_id, @parameter, @value)
        `);
    }

    // Update appointment status to COMPLETED
    await pool.request()
      .input('appointment_id', sql.UniqueIdentifier, appointment_id)
      .query(`UPDATE Appointments SET status = 'COMPLETED' WHERE appointment_id = @appointment_id`);

    res.status(201).json({ message: 'Report submitted successfully', report_id });

  } catch (err) {
    console.error('Error submitting report:', err);
    res.status(500).json({ message: 'Server error while submitting report' });
  }
};*/

exports.submitReport = async (req, res) => {
  const { patient_id, tech_id, results } = req.body;

  // patient_id is accually appointment_id

  console.log(`In there with appointment id: ${patient_id}, tech_id: ${tech_id}, and result = `);
  if (!patient_id) {
    return res.status(400).json({ message: 'patient_id, and results are required' });
  }

  try {
    console.log(`progress 1`);
    const pool = await poolPromise;

    // Insert into Reports table
    const appointment_id = patient_id
        
      console.log(`appointment = ${appointment_id}`);

      const report_id = uuidv4();

      await pool.request()
      .input('report_id', sql.UniqueIdentifier, report_id)
      .input('appointment_id', sql.UniqueIdentifier, appointment_id)
      .input('tech_id', sql.UniqueIdentifier, tech_id)
      .query(`
        INSERT INTO Reports (report_id, appointment_id, tech_id)
        VALUES (@report_id, @appointment_id, @tech_id)
      `);    

      console.log(`report submitted`);

    // Insert into Test_Results table
    for (const result of results) {
      await pool.request()
        .input('result_id', sql.UniqueIdentifier, uuidv4())
        .input('report_id', sql.UniqueIdentifier, report_id)
        .input('parameter', sql.VarChar(100), result.parameter)
        .input('value', sql.VarChar(100), result.value)
        .query(`
          INSERT INTO Test_Results (result_id, report_id, parameter, value)
          VALUES (@result_id, @report_id, @parameter, @value)
        `);
    }

    // Update appointment status to COMPLETED
    await pool.request()
      .input('appointment_id', sql.UniqueIdentifier, appointment_id)
      .query(`UPDATE Appointments SET status = 'COMPLETED' WHERE appointment_id = @appointment_id`);

    res.status(201).json({ message: 'Report submitted successfully', report_id });

  } catch (err) {
    console.error('Error submitting report:', err);
    res.status(500).json({ message: 'Server error while submitting report' });
  }
};

// Get all reports for a patient (grouped nicely)
exports.getPatientReports = async (req, res) => {
  const patient_id = req.params.id;

  // patient id is appointment_id
  try {
    const pool = await poolPromise;

    const result = await pool.request()
      .input('patient_id', sql.UniqueIdentifier, patient_id)
      .query(`
        SELECT 
          R.report_id,
          A.timeslot,
          T.test_name,
          Tech.name AS technician,
          R.generated_at,
          TR.parameter,
          TR.value
        FROM Reports R
        JOIN Appointments A ON R.appointment_id = A.appointment_id
        JOIN Tests T ON A.test_id = t.test_id
        JOIN Technicians Tech ON R.tech_id = Tech.tech_id
        JOIN Test_Results TR ON R.report_id = TR.report_id
        WHERE A.appointment_id = @patient_id
        ORDER BY R.generated_at DESC
      `);

    const reports = {};

    result.recordset.forEach(row => {
      if (!reports[row.report_id]) {
        reports[row.report_id] = {
          report_id: row.report_id,
          timeslot: row.timeslot,
          test_name: row.test_name,
          technician: row.technician,
          generated_at: row.generated_at,
          results: []
        };
      }
      reports[row.report_id].results.push({
        parameter: row.parameter,
        value: row.value
      });
    });

    res.json(Object.values(reports));
  } catch (err) {
    console.error('Error fetching reports:', err);
    res.status(500).json({ message: 'Error fetching reports' });
  }
};

// Fetch all appointments that are still booked (not completed)
exports.getBookedAppointments = async (req, res) => {
  console.log('in there appointments');
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT a.appointment_id, p.name, t.test_name, a.status, a.timeslot
      FROM Appointments a
      JOIN Tests t ON a.test_id = t.test_id
	    join Patients as p on p.patient_id = a.patient_id
      WHERE a.status = 'BOOKED'
    `);
    
    console.log(result.recordset);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching booked appointments:', err);
    res.status(500).json({ message: 'Error fetching booked appointments' });
  }
};

// Fetch all test parameters for a given test
exports.getTestParameters = async (req, res) => {
  const { test_type } = req.params;

  console.log(`in there with testtype ${test_type}`);

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('test_name', sql.VarChar, test_type)
      .query('SELECT parameter_name FROM TestParameters as tp join Tests as t on t.test_id = tp.test_id where t.test_name = @test_name');

    console.log(result.recordset);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching test parameters:', err);
    res.status(500).json({ message: 'Error fetching test parameters' });
  }
};

// Fetch basic appointment summary for a patient
exports.getPatientAppointmentsSummary = async (req, res) => {
  const { patient_id } = req.body;
  console.log(`patientid recieved = ${patient_id}`);
  try {
    const pool = await poolPromise;

    const result = await pool.request()
      .input('patient_id', sql.UniqueIdentifier, patient_id)
      .query(`
        SELECT appointment_id, test_name, timeslot, status
        FROM Appointments AS a
        JOIN Tests AS t ON a.test_id = t.test_id
        WHERE a.patient_id = @patient_id
      `);

    res.json(result.recordset);
  } catch (err) {
    console.error('Error fetching patient appointments summary:', err);
    res.status(500).send('Error fetching appointments');
  }
};

// Fetch detailed report when a test is selected
exports.getPatientReportDetails = async (req, res) => {
  const { appointment_id } = req.body;

  console.log(`in there with appointment_id: ${appointment_id}`);
  try {
    const pool = await poolPromise;

    const result = await pool.request()
      .input('appointment_id', sql.UniqueIdentifier, appointment_id)
      .query(`
        SELECT 
          TR.parameter,
          TR.value,
          timeslot
        FROM Reports R
        JOIN Appointments A ON R.appointment_id = A.appointment_id
        JOIN Tests T ON A.test_id = T.test_id
        JOIN Technicians Tech ON R.tech_id = Tech.tech_id
        JOIN Test_Results TR ON R.report_id = TR.report_id
        WHERE A.appointment_id = @appointment_id
      `);

    console.log(result.recordset);
    res.status(200).json({ data: result.recordset });

  } catch (err) {
    console.error('Error fetching report details:', err);
    res.status(500).send('Error fetching report details');
  }
};
