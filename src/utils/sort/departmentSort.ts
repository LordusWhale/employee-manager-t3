import { department, role } from "@prisma/client";

type Department = department & {
  role: role & {
    _count: {
      employee: number;
    };
  }[]
};

export const departmentSortMethods = {
  nameAcending: {
    method: (a: Department, b: Department) => {
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
    method: (a: Department, b: Department) => {
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
    method: (a: Department, b: Department) => {
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
    method: (a: Department, b: Department) => {
      if (a.id < b.id) {
        return 1;
      }
      if (a.id > b.id) {
        return -1;
      }
      return 0;
    },
  },
  numberOfEmployeesAcending: {
    method: (a: Department, b: Department) => {
      let aNum = 0;
      let bNum = 0;
      a.role.forEach(role=>{
        aNum += role._count.employee;
      })
      b.role.forEach(role=>{
        bNum += role._count.employee;
      })
      if (aNum < bNum) {
        return -1;
      }
      if (aNum > bNum) {
        return 1;
      }
      return 0;
    },
  },
  numberOfEmployeesDecending: {
    method: (a: Department, b: Department) => {
      let aNum = 0;
      let bNum = 0;
      a.role.forEach(role=>{
        aNum += role._count.employee;
      })
      b.role.forEach(role=>{
        bNum += role._count.employee;
      })
      if (aNum < bNum) {
        return 1;
      }
      if (aNum > bNum) {
        return -1;
      }
      return 0;
    },
  },
} as any;

export type DepartmentSortMethods = keyof typeof departmentSortMethods;
