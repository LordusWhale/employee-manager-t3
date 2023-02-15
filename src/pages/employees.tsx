import { type NextPage } from "next";
import { Modal } from "@mantine/core";
import { api } from "../utils/api";
import { useState } from "react";
import { ListEmployees } from "../components/employees/ListEmployees";
import { AddEmployee } from "../components/employees/AddEmployee";

const Employees: NextPage = () => {
  const [addEmployee, setAddEmployee] = useState<boolean>(false);
  const employees = api.employee.getAll.useQuery();
  return (
    <>
      <button
        className="absolute right-0 mt-8 mr-8 rounded-md bg-indigo-400 px-10 py-4 text-white"
        onClick={() => {
          setAddEmployee(true);
        }}
      >
        Add employee
      </button>
      <div className="flex w-full flex-col justify-center py-2 px-10 ">
        {employees.isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="w-full py-20">
            {employees.data && <ListEmployees employees={employees.data} />}
          </div>
        )}
      </div>
      <Modal
        centered
        opened={addEmployee}
        onClose={() => {
          setAddEmployee(false);
        }}
      >
        <AddEmployee setOpen={setAddEmployee} />
      </Modal>
    </>
  );
};

export default Employees;
