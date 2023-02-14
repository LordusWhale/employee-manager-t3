

export const roleSortMethods = {
    none: {
      method: (a: any, b: any) => {
        return 0;
      },
    },
    titleAcending: {
      method: (a: any, b: any) => {
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
      method: (a: any, b: any) => {
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
      method: (a: any, b: any) => {
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
      method: (a: any, b: any) => {
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
    salaryAcending: {
      method: (a: any, b: any) => {
        if (a.salary < b.salary) {
          return -1;
        }
        if (a.salary > b.salary) {
          return 1;
        }
        return 0;
      },
    },
    salaryDecending: {
      method: (a: any, b: any) => {
        if (a.salary < b.salary) {
          return 1;
        }
        if (a.salary > b.salary) {
          return -1;
        }
        return 0;
      },
    },
    numberOfEmployeesAcending: {
      method: (a: any, b: any) => {
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
      method: (a: any, b: any) => {
        if (a._count.employee < b._count.employee) {
          return 1;
        }
        if (a._count.employee > b._count.employee) {
          return -1;
        }
        return 0;
      },
    },
  } as any;
  
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
  