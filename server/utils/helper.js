import pool from "../config/db.js";

const checkIdentifierExists = async (identifier) => {
  const result = await pool.query("SELECT * FROM users WHERE userId = $1", [
    identifier,
  ]);
  return result.rows.length > 0;
};

export const generateNewUniqueIdentifier = async (fName, lName) => {
  let uniqueIdentifier;
  let exists = true;
  while (exists) {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    uniqueIdentifier = `${fName[0]}${lName[0]}${randomNumber}`;
    exists = await checkIdentifierExists(uniqueIdentifier);
  }
  return uniqueIdentifier;
};
