import { department, role } from "@prisma/client";

type Role =
  | role & {
      department: department;
      _count: {
        employee: number;
      };
    };

export const roleSortMethods = {
  none: {
    method: (a: Role, b: Role) => {
      return 0;
    },
  },
  titleAcending: {
    method: (a: Role, b: Role) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      }
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      }
      return 0;
    },
  },
  titleDecending: {
    method: (a: Role, b: Role) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return 1;
      }
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return -1;
      }
      return 0;
    },
  },
  departmentAcending: {
    method: (a: Role, b: Role) => {
      if (a.department.name.toLowerCase() < b.department.name.toLowerCase()) {
        return -1;
      }
      if (a.department.name.toLowerCase() > b.department.name.toLowerCase()) {
        return 1;
      }
      return 0;
    },
  },
  departmentDecending: {
    method: (a: Role, b: Role) => {
      if (a.department.name.toLowerCase() < b.department.name.toLowerCase()) {
        return 1;
      }
      if (a.department.name.toLowerCase() > b.department.name.toLowerCase()) {
        return -1;
      }
      return 0;
    },
  },
  idAcending: {
    method: (a: Role, b: Role) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    },
  },
  idDecending: {
    method: (a: Role, b: Role) => {
      if (a.id < b.id) {
        return 1;
      }
      if (a.id > b.id) {
        return -1;
      }
      return 0;
    },
  },
  salaryAcending: {
    method: (a: Role, b: Role) => {
      if (parseInt(a.salary.toString()) < parseInt(b.salary.toString())) {
        return -1;
      }
      if (parseInt(a.salary.toString()) > parseInt(b.salary.toString())) {
        return 1;
      }
      return 0;
    },
  },
  salaryDecending: {
    method: (a: Role, b: Role) => {
      if (parseInt(a.salary.toString()) < parseInt(b.salary.toString())) {
        return 1;
      }
      if (parseInt(a.salary.toString()) > parseInt(b.salary.toString())) {
        return -1;
      }
      return 0;
    },
  },
  numberOfEmployeesAcending: {
    method: (a: Role, b: Role) => {
      if (a._count.employee < b._count.employee) {
        return -1;
      }
      if (a._count.employee > b._count.employee) {
        return 1;
      }
      return 0;
    },
  },
  numberOfEmployeesDecending: {
    method: (a: Role, b: Role) => {
      if (a._count.employee < b._count.employee) {
        return 1;
      }
      if (a._count.employee > b._count.employee) {
        return -1;
      }
      return 0;
    },
  },
};

export type RoleSortMethods =
  | "none"
  | "titleAcending"
  | "titleDecending"
  | "departmentAcending"
  | "departmentDecending"
  | "idAcending"
  | "idDecending"
  | "salaryAcending"
  | "salaryDecending"
  | "numberOfEmployeesAcending"
  | "numberOfEmployeesDecending";
