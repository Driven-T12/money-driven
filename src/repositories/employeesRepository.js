import { connection } from "../database.connection.js";
import { mapObjectToInsertQuery, mapObjectToUpdateQuery } from "../utils/sqlUtils.js";

async function insert(employee) {
  const { objectColumns, objectValues, paramsOrder } = mapObjectToInsertQuery(employee);

  return connection.query(
    `INSERT INTO employees(${objectColumns}) VALUES (${paramsOrder});`,
    [...objectValues]
  );
}

async function findAll() {
  const result = await connection.query("SELECT * FROM employees;");
  return result.rows;
}

async function findById(id) {
  const result = await connection.query("SELECT * FROM employees WHERE id=$1;", [id]);
  return result.rows[0];
}

async function update(id, payload) {
  const { objectColumns, objectValues } = mapObjectToUpdateQuery(payload, 2);

  return connection.query(
    `UPDATE employees SET ${objectColumns} WHERE $1=id;`,
    [id, ...objectValues]
  );
}

async function remove(id) {
  return connection.query("DELETE FROM employees WHERE id=$1;", [id]);
}

export const employeesRepository = {
  insert,
  findAll,
  findById,
  update,
  remove
};
