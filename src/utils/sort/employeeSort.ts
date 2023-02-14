export const employeeSortMethods = {
  none: {
    method: (a: any, b: any) => {
      return 0;
    },
  },
  nameAcending: {
    method: (a: any, b: any) => {
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
    method: (a: any, b: any) => {
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
    method: (a: any, b: any) => {
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
    method: (a: any, b: any) => {
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
    method: (a: any, b: any) => {
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
    method: (a: any, b: any) => {
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
    method: (a: any, b: any) => {
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
    method: (a: any, b: any) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    },
  },
} as any;
export type EmployeeSortMethods =
  | "none"
  | "nameAcending"
  | "nameDecending"
  | "roleAcending"
  | "roleDecending"
  | "departmentAcending"
  | "departmentDecending"
  | "idAcending"
  | "idDecending";