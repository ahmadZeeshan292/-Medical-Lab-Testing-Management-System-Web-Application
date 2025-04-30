const { poolPromise, sql } = require('../db');
const bcrypt = require('bcrypt');

exports.loginTechnician = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required' });

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('email', sql.VarChar(150), email)
      .query('SELECT * FROM Technicians WHERE email = @email');

    const tech = result.recordset[0];
    if (!tech) return res.status(401).json({ message: 'Login failed user email doesnt exist' });

    //const valid = await bcrypt.compare(password, tech.password_hash);
    const valid = true;
    if (!valid) return res.status(401).json({ message: 'Login failed user password is incorrect' });


    res.json({
      tech_id: tech.tech_id,
      name:    tech.name,
      email:   tech.email
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during login' });
  }
};


