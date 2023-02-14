import { NavBar } from "./Nabvar";

export const Layout = ({ children }: any) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
};
