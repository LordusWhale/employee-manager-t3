export const departmentSortMethods = {
  nameAcending: {
    method: (a: any, b: any) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    },
  },
  nameDecending: {
    method: (a: any, b: any) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return 1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
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
} as any;

export type DepartmentSortMethods =
  | "none"
  | "nameAcending"
  | "nameDecending"
  | "idAcending"
  | "idDecending";
