import { Loader } from "@mantine/core";

export const UpdateButton = ({
  updateMethod,
  loading,
}: {
  updateMethod: () => void  ;
  loading: boolean ;
}) => {
  return (
    <div className="flex w-full items-center justify-center">
      {loading ? (
        <Loader />
      ) : (
        <button
          className="w-full bg-indigo-500 p-2 text-white"
          onClick={updateMethod}
        >
          Save
        </button>
      )}
    </div>
  );
};
