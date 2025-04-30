const { poolPromise, sql } = require('../db');
const { v4: uuidv4 } = require('uuid');
/*
exports.bookAppointment = async (req, res) => {
  const { patient_id, test_id, timeslot } = req.body;

  if (!patient_id || !test_id || !timeslot)
    return res.status(400).json({ message: 'patient_id, test_id and timeslot are required' });

  try {
    const pool = await poolPromise;

    // 1. Check if the test exists
    const testCheck = await pool.request()
      .input('test_id', sql.UniqueIdentifier, test_id)
      .query('SELECT * FROM Tests WHERE test_id = @test_id');
    
    if (!testCheck.recordset.length)
      return res.status(404).json({ message: 'Test not found' });
    // 2. check if patient has an appointment already
    const has_appointment = await pool.request()
      .input('patient_id', sql.UniqueIdentifier, patient_id)
      .input('test_id', sql.UniqueIdentifier, test_id)
      .query('Select Status from Appointments where patient_id = @patient_id and test_id = @test_id');
    if (has_appointment.recordset.length > 0){
      return res.status(400).json({message : 'You already have an appointment for the selected test'});
    }

    // 3. Check inventory for available kits
    const inventory = await pool.request()
      .input('test_id', sql.UniqueIdentifier, test_id)
      .query('SELECT available_kits FROM Inventory WHERE test_id = @test_id');

    const available = inventory.recordset[0]?.available_kits || 0;

    if (available < 1) {
      return res.status(400).json({ message: 'Test kit not available' });
    }

    // 4. Reduce inventory
    await pool.request()
      .input('test_id', sql.UniqueIdentifier, test_id)
      .query('UPDATE Inventory SET available_kits = available_kits - 1 WHERE test_id = @test_id');

    
    // 5. Book the appointment
    const appointmentId = uuidv4();
    await pool.request()
      .input('appointment_id', sql.UniqueIdentifier, appointmentId)
      .input('patient_id',     sql.UniqueIdentifier, patient_id)
      .input('test_id',        sql.UniqueIdentifier, test_id)
      .input('timeslot',       sql.DateTime, timeslot)
      .input('status',         sql.VarChar(20), 'BOOKED')
      .query(`
        INSERT INTO Appointments (appointment_id, patient_id, test_id, timeslot, status)
        VALUES (@appointment_id, @patient_id, @test_id, @timeslot, @status)
      `);

    res.status(201).json({
      message: 'Appointment booked successfully',
      appointment_id: appointmentId
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during appointment booking' });
  }
};
*/

// appointment logic for main frontend code
/*exports.bookAppointment = async (req, res) => {
  const { name, email, phone, date, test, message } = req.body;

  console.log(`In there with`);

  if (!name || !email || !date)
    return res.status(400).json({ message: 'name, email and timeslot are required' });

  try {
    const pool = await poolPromise;

    // 1. get patient id
    const patient_id_ = await pool.request()
      .input('name', sql.VarChar, name)
      .input('email', sql.VarChar, email)
      .query('Select patient_id from Patients where name = @name and email = @email');

      if(patient_id_.recordset.length == 0) 
        return res.status(404).json({message : 'Patient with such name and email does not exist'});

    const patient_id = patient_id_.recordset[0].patient_id;
    console.log(`Query success: patient id ${patient_id}`);

    // 2. get test id

    const test_name = 'Blood Sugar';
    console.log(`get test of ${test}`);

    const test_id_ = await pool.request()
      .input('test_name', sql.VarChar, test_name)
      .query('select test_id from Tests where test_name = @test_name');
    
    if (!test_id_.recordset.length) {
        return res.status(400).send('Invalid test selected.');
    }

    const test_id = test_id_.recordset[0].test_id;

    console.log(`Query success: test id : ${test_id}`);

    // 3. Check if the test exists (unnessary)
    const testCheck = await pool.request()
      .input('test_id', sql.UniqueIdentifier, test_id)
      .query('SELECT * FROM Tests WHERE test_id = @test_id');
    
    if (!testCheck.recordset.length)
      return res.status(404).json({ message: 'Test not found' });

    // 4. check if patient has an appointment already
    const has_appointment = await pool.request()
      .input('patient_id', sql.UniqueIdentifier, patient_id)
      .input('test_id', sql.UniqueIdentifier, test_id)
      .query('Select Status from Appointments where patient_id = @patient_id and test_id = @test_id');
    if (has_appointment.recordset.length > 0){
      return res.status(400).json({message : 'You already have an appointment for the selected test'});
    }

    // 5. Check inventory for available kits
    const inventory = await pool.request()
      .input('test_id', sql.UniqueIdentifier, test_id)
      .query('SELECT available_kits FROM Inventory WHERE test_id = @test_id');

    const available = inventory.recordset[0]?.available_kits || 0;
    console.log(`Invertory retrieved test availible: ${available}`);

    if (available < 1) {
      return res.status(400).json({ message: 'Test kit not available' });
    }

    // 6. Reduce inventory
    await pool.request()
      .input('test_id', sql.UniqueIdentifier, test_id)
      .query('UPDATE Inventory SET available_kits = available_kits - 1 WHERE test_id = @test_id');

    
    // 7. Book the appointment
    const appointmentId = uuidv4();
    await pool.request()
      .input('appointment_id', sql.UniqueIdentifier, appointmentId)
      .input('patient_id',     sql.UniqueIdentifier, patient_id)
      .input('test_id',        sql.UniqueIdentifier, test_id)
      .input('timeslot',       sql.DateTime, date)
      .input('status',         sql.VarChar(20), 'BOOKED')
      .query(`
        INSERT INTO Appointments (appointment_id, patient_id, test_id, timeslot, status)
        VALUES (@appointment_id, @patient_id, @test_id, @timeslot, @status)
      `);

    res.status(201).json({
      message: `Appointment booked successfully for test: ${test_name}`,
      appointment_id: appointmentId
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during appointment booking' });
  }
};*/


exports.bookAppointment = async (req, res) => {
  const { patient_id, testname, date } = req.body;

  console.log(`In there with patientid: ${patient_id}, testname: ${testname}, date: ${date}`);

  if (!patient_id || !testname || !date)
    return res.status(400).json({ message: 'Invalid field entry' });

  try {
    const pool = await poolPromise;

    // 1. get test id
    const test_id_ = await pool.request()
      .input('test_name', sql.VarChar, testname)
      .query('select test_id from Tests where test_name = @test_name');
    
    if (!test_id_.recordset.length) {
        return res.status(400).send('Invalid test selected.');
    }

    const test_id = test_id_.recordset[0].test_id;
    console.log(`Query success: test id : ${test_id}`);

    // 2. check if patient has an appointment already
    const has_appointment = await pool.request()
      .input('patient_id', sql.UniqueIdentifier, patient_id)
      .input('test_id', sql.UniqueIdentifier, test_id)
      .query("Select Status from Appointments where patient_id = @patient_id and test_id = @test_id and Status != 'COMPLETED' ");
    if (has_appointment.recordset.length > 0){
      return res.status(400).json({message : 'You already have an appointment for the selected test'});
    }

    // 3. Check inventory for available kits
    const inventory = await pool.request()
      .input('test_id', sql.UniqueIdentifier, test_id)
      .query('SELECT available_kits FROM Inventory WHERE test_id = @test_id');

    const available = inventory.recordset[0]?.available_kits || 0;
    console.log(`Invertory retrieved test availible: ${available}`);

    if (available < 1) {
      return res.status(400).json({ message: 'Test kit not available' });
    }

    // 4. Reduce inventory
    await pool.request()
      .input('test_id', sql.UniqueIdentifier, test_id)
      .query('UPDATE Inventory SET available_kits = available_kits - 1 WHERE test_id = @test_id');

    // 5. Book the appointment
    
    const appointmentId = uuidv4();
    console.log(`appointment id : ${appointmentId}`);
    await pool.request()
      .input('appointment_id', sql.UniqueIdentifier, appointmentId)
      .input('patient_id',     sql.UniqueIdentifier, patient_id)
      .input('test_id',        sql.UniqueIdentifier, test_id)
      .input('timeslot',       sql.DateTime, date)
      .input('status',         sql.VarChar(20), 'BOOKED')
      .query(`
        INSERT INTO Appointments (appointment_id, patient_id, test_id, timeslot, status)
        VALUES (@appointment_id, @patient_id, @test_id, @timeslot, @status)
      `);

    res.status(201).json({
      message: `Appointment booked successfully for test: ${testname}`,
      appointment_id: appointmentId
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during appointment booking' });
  }
};

exports.get_tests = async (req, res) => {
  const pool = await poolPromise;

  try{
    const results = await pool.request()
      .query("select test_name from Tests");
    
    if (results.recordset.length == 0){
      res.status(400).json({message: 'Lab is not offering any test right now'});
    }

    res.status(200).json({ data: results.recordset });
  }catch(err){
    res.status(500).json({ message: 'Server error occurred' });
  }
}
