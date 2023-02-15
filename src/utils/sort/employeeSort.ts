import { department, employee, role } from "@prisma/client";

type Employee =
  | employee & {
      role:
        | (role & {
            department: department;
          })
        | null;
      manager:
        | (employee & {
            role: role | null;
          })
        | null;
    };

export const employeeSortMethods = {
  none: {
    method: (a: Employee, b: Employee) => {
      return 0;
    },
  },
  nameAcending: {
    method: (a: Employee, b: Employee) => {
      if (a.first_name.toLowerCase() < b.first_name.toLowerCase()) {
        return -1;
      }
      if (a.first_name.toLowerCase() > b.first_name.toLowerCase()) {
        return 1;
      }
      return 0;
    },
  },
  nameDecending: {
    method: (a: Employee, b: Employee) => {
      if (a.first_name.toLowerCase() < b.first_name.toLowerCase()) {
        return 1;
      }
      if (a.first_name.toLowerCase() > b.first_name.toLowerCase()) {
        return -1;
      }
      return 0;
    },
  },
  roleAcending: {
    method: (a: Employee, b: Employee) => {
      if (!a.role || !b.role) {
        return 0;
      }
      if (a.role.title.toLowerCase() < b.role.title.toLowerCase()) {
        return -1;
      }
      if (a.role.title.toLowerCase() > b.role.title.toLowerCase()) {
        return 1;
      }
      return 0;
    },
  },
  roleDecending: {
    method: (a: Employee, b: Employee) => {
      if (!a.role || !b.role) {
        return 0;
      }

      if (a.role.title.toLowerCase() < b.role.title.toLowerCase()) {
        return 1;
      }
      if (a.role.title.toLowerCase() > b.role.title.toLowerCase()) {
        return -1;
      }
      return 0;
    },
  },
  departmentAcending: {
    method: (a: Employee, b: Employee) => {
      if (!a.role || !b.role) {
        return 0;
      }
      if (
        a.role.department.name.toLowerCase() <
        b.role.department.name.toLowerCase()
      ) {
        return -1;
      }
      if (
        a.role.department.name.toLowerCase() >
        b.role.department.name.toLowerCase()
      ) {
        return 1;
      }
      return 0;
    },
  },
  departmentDecending: {
    method: (a: Employee, b: Employee) => {
      if (!a.role || !b.role) {
        return 0;
      }

      if (
        a.role.department.name.toLowerCase() <
        b.role.department.name.toLowerCase()
      ) {
        return 1;
      }
      if (
        a.role.department.name.toLowerCase() >
        b.role.department.name.toLowerCase()
      ) {
        return -1;
      }
      return 0;
    },
  },
  idDecending: {
    method: (a: Employee, b: Employee) => {
      if (a.id < b.id) {
        return 1;
      }
      if (a.id > b.id) {
        return -1;
      }
      return 0;
    },
  },
  idAcending: {
    method: (a: Employee, b: Employee) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    },
  },
};
export type EmployeeSortMethods = keyof typeof employeeSortMethods;
