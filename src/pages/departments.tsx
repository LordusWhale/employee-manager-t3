import { LoadingOverlay, Modal } from "@mantine/core";
import { NextPage } from "next";
import { api } from "../utils/api";
import { useState } from "react";
import { AddDepartment } from "../components/departments/addDepartment";
import { ListDepartments } from "../components/departments/listDepartments";

const Department: NextPage = () => {
  const [open, setOpen] = useState(false);
  const department = api.department.getAll.useQuery();
  return (
    <div>
      <button
        className="absolute right-0 mt-8 mr-8 rounded-md bg-indigo-400 px-10 py-4 text-white"
        onClick={() => {
          setOpen(true);
        }}
      >
        Add department
      </button>
      <div className="flex w-full flex-col justify-center py-2 px-10 ">
        {department.isLoading ? (
           <LoadingOverlay style={{position: 'absolute', left: 0, top: 0, zIndex: 0}} visible={department.isLoading} />
        ) : (
          <div className="w-full py-20">
            {" "}
            <ListDepartments departments={department.data} />
          </div>
        )}
      </div>
      <Modal
        centered
        opened={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <AddDepartment setOpen={setOpen} />
      </Modal>
    </div>
  );
};

export default Department;
