import Link from "next/link";

export const NavBar: React.FC = () => {
  return (
    <nav className="flex bg-white w-full justify-between py-8 shadow-xl z-10 relative">
      <Link href="/" className="px-8 text-lg">Employee Manger</Link>
      <nav className="flex gap-8 px-8 text-lg">
        <Link href="/employees">Employees</Link>
        <Link href={"/roles"}>Roles</Link>
        <Link href="/departments">Departments</Link>
      </nav>
    </nav>
  );
};
