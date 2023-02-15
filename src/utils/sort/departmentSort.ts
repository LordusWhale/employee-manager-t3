import { department } from "@prisma/client";

export const departmentSortMethods = {
  nameAcending: {
    method: (a: department, b: department) => {
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
    method: (a: department, b: department) => {
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
    method: (a: department, b: department) => {
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
    method: (a: department, b: department) => {
      if (a.id < b.id) {
        return 1;
      }
      if (a.id > b.id) {
        return -1;
      }
      return 0;
    },
  },
};

export type DepartmentSortMethods =
  | "none"
  | "nameAcending"
  | "nameDecending"
  | "idAcending"
  | "idDecending";
