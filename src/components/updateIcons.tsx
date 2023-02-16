import { Loader } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import type { Dispatch, SetStateAction } from "react";

interface DeleteLoaderProps {
  isDeleting: boolean;
  deleteMethod: (id: number) => Promise<void>;
  setId: Dispatch<SetStateAction<number>>;
  setEdit: Dispatch<SetStateAction<boolean>>;
  employeeId: number;
}

export const UpdateIcons: React.FC<DeleteLoaderProps> = ({
  isDeleting,
  deleteMethod,
  setId,
  setEdit,
  employeeId,
}) => {
  return (
    <div className="flex items-center justify-center gap-4 text-sm">
      {isDeleting ? (
        <Loader w={20} />
      ) : (
        <>
          <IconTrash
            onClick={() => {
              deleteMethod(employeeId);
            }}
            cursor={"pointer"}
          />
          <IconEdit
            cursor={"pointer"}
            onClick={() => {
              setId(employeeId);
              setEdit(true);
            }}
          />
        </>
      )}
    </div>
  );
};
