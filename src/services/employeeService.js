import { employeesRepository } from "../repositories/employeesRepository.js";

export async function getTaxes(id) {
    const employee = await employeesRepository.findById(id);
    // TODO: lidar com o erro caso o fucionário não exista

    const { grossSalary } = employee;

    // INSS
    let INSSRate = 7.5;
    if (grossSalary > 121200 && grossSalary < 242735) {
        INSSRate = 9;
    } else if (grossSalary > 242736 && grossSalary < 364103) {
        INSSRate = 12;
    } else if (grossSalary > 364104) {
        INSSRate = 14;
    }

    const INSSDeduction = grossSalary * (INSSRate / 100);
    const INSSDeductedSalary = grossSalary - INSSDeduction;

    // IRRF
    let IRRFRate = null;
    if (INSSDeductedSalary > 190399 && INSSDeductedSalary < 282665) {
        IRRFRate = 7.5;
    } else if (INSSDeductedSalary > 282666 && INSSDeductedSalary < 375105) {
        IRRFRate = 15;
    } else if (INSSDeductedSalary > 375106 && INSSDeductedSalary < 466468) {
        IRRFRate = 22.5;
    } else if (INSSDeductedSalary > 466469) {
        IRRFRate = 27.5;
    }

    const IRRFDeduction = IRRFRate ? INSSDeductedSalary * (IRRFRate / 100) : 0;
    const IRRFdeductedSalary = INSSDeductedSalary - IRRFDeduction;

    return({
        grossSalary,
        netSalary: IRRFdeductedSalary,
        INSS: {
            rate: INSSRate,
            deduction: INSSDeduction,
            deductedSalary: INSSDeductedSalary
        },
        IRRF: {
            rate: IRRFRate,
            deduction: IRRFDeduction,
            deductedSalary: IRRFdeductedSalary
        },
    });
}

async function findAll() {
    const result = await employeesRepository.findAll()
    return result
}

export const employeeService = {
    findAll
}