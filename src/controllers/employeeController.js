import dayjs from "dayjs";
import { employeesRepository } from "../repositories/employeesRepository.js";
import { employeeService, getTaxes } from "../services/employeeService.js"
import { notFoundError } from "../errors/errors.js";

function formatEmployee(employee) {
  const birthDate = dayjs(employee.birthDate).format("DD/MM/YYYY");
  const dateJoined = dayjs(employee.dateJoined).format("DD/MM/YYYY");
  return { ...employee, birthDate, dateJoined };
}

export async function getEmployees(req, res) {
  const employees = await employeeService.findAll();
  res.send(employees.map((employee) => formatEmployee(employee)));
}

export async function getEmployee(req, res) {
  const { id } = req.params;
  
  const employee = await employeesRepository.findById(id);
  if (!employee) throw notFoundError("funcionário");

  res.send(formatEmployee(employee));
}

export async function insertEmployee(req, res) {
  const employee = req.body;

  const salaryInCents = employee.grossSalary * 100;
  await employeesRepository.insert({ ...employee, grossSalary: salaryInCents });

  res.sendStatus(201);
}

export async function updateEmployee(req, res) {
  const { id } = req.params;
  const employee = req.body;

  const formattedEmployee = { ...employee };

  if (formattedEmployee.grossSalary) {
    formattedEmployee.grossSalary = formattedEmployee.grossSalary * 100;
  }

  await employeesRepository.update(id, formattedEmployee);
  res.sendStatus(200);
}

export async function deleteEmployee(req, res) {
  const { id } = req.params;

  await employeesRepository.remove(id);
  res.sendStatus(200);
}

export async function getEmployeeNetSalaryWithTaxes(req, res) {
  const { id } = req.params;
  const result = await getTaxes(id)

  res.send(result)
}
