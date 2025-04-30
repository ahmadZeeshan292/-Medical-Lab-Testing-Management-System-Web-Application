const { poolPromise, sql } = require('../db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

/*exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'Name, email & password are required' });

  try {
    const pool = await poolPromise;
    // 1) Check if email already exists
    const exists = await pool.request()
      .input('email', sql.VarChar(150), email)
      .query('SELECT 1 FROM Patients WHERE email = @email');
    if (exists.recordset.length)
      return res.status(409).json({ message: 'Email already registered' });

    // 2) Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // 3) Insert new patient
    await pool.request()
      .input('patient_id',    sql.UniqueIdentifier, uuidv4())
      .input('name',          sql.VarChar(100),     name)
      .input('email',         sql.VarChar(150),     email)
      .input('password_hash', sql.VarChar(255),     hash)
      .query(`
        INSERT INTO Patients (patient_id, name, email, password_hash)
        VALUES (@patient_id, @name, @email, @password_hash)
      `);

    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during signup' });
  }
};*/

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'Name, email & password are required' });

  console.log('In there');
  try {
    const pool = await poolPromise;
    // 1) Check if email already exists
    const exists = await pool.request()
      .input('email', sql.VarChar(150), email)
      .query('SELECT 1 FROM Patients WHERE email = @email');
    if (exists.recordset.length)
      return res.status(409).json({ message: 'Email already registered' });

    console.log('new credentials are entered');
    
    // 2) Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // 3) Insert new patient
    await pool.request()
      .input('patient_id',    sql.UniqueIdentifier, uuidv4())
      .input('name',          sql.VarChar(100),     name)
      .input('email',         sql.VarChar(150),     email)
      .input('password_hash', sql.VarChar(255),     hash)
      .query(`
        INSERT INTO Patients (patient_id, name, email, password_hash)
        VALUES (@patient_id, @name, @email, @password_hash)
      `);

    console.log('patient added in database');

    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during signup' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email & password are required' });

  try {
    const pool = await poolPromise;
    // 1) Fetch user by email
    const result = await pool.request()
      .input('email', sql.VarChar(150), email)
      .query('SELECT * FROM Patients WHERE email = @email');
    const user = result.recordset[0];
    if (!user) return res.status(401).json({ message: 'Login failed user email doesnt exist' });

    // 2) Compare password
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ message: 'Login failed user password is incorrect' });

    // 3) Return minimal user info (or JWT/token in a real app)
    res.json({
      patient_id: user.patient_id,
      name:       user.name,
      email:      user.email
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during login' });
  }
};


/*exports.login = async (req, res) => {
  const { email, password } = req.body;

  const pool = await poolPromise;

  // Check if the userType and id are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Enter required fields' });
  }

  console.log("Login Attempt:");
  console.log("User Type:", email);
  console.log("ID:", password);

    try {
      const result = await pool.request()
        .input('email', sql.VarChar, email)
        .input('password', sql.VarChar, password)
        .query('SELECT patient_id FROM Patients WHERE email = @email');
        
      console.log("Database Response for Patient:", result.recordset);  // Debugging line
      
      if (result.recordset.length !== 0) {
        const patient = result.recordset[0];
        // Returning user info along with the success message
        return res.status(200).json({
          message: 'Patient login successful',
          userType: 'patient',
          userInfo: { id: patient.patient_id, name: patient.name }  // Send user info
        });
      } else {
        return res.status(400).json({ message: 'Email is invalid' });
      }


    } catch (err) {
      console.error("Error during patient login:", err);
      return res.status(500).json({ message: 'Server error during patient login', error: err.message });
    }
};*/

/*else if (userType === 'technician') {
  try {
    const result = await pool.request()
      .input('tech_id', sql.UniqueIdentifier, id)
      .query('SELECT tech_id, name FROM Technicians WHERE tech_id = @tech_id');

    console.log("Database Response for Technician:", result.recordset);  // Debugging line

    if (result.recordset.length !== 0) {
      const technician = result.recordset[0];
      // Returning user info along with the success message
      return res.status(200).json({
        message: 'Technician login successful',
        userType: 'technician',
        userInfo: { id: technician.tech_id, name: technician.name }  // Send user info
      });
    } else {
      return res.status(400).json({ message: 'Technician ID invalid' });
    }
  } catch (err) {
    console.error("Error during technician login:", err);
    return res.status(500).json({ message: 'Server error during technician login', error: err.message });
  }
} else {
  return res.status(400).json({ message: 'Invalid userType' });
}*/

// redirectUrl = `/result.html?success=1&name=${encodeURIComponent(user.name)}&id=${encodeURIComponent(user.patient_id)}&appointments=${appointmentsParam}`;


