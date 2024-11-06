import CustomNavbar from "@/components/Navbar";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <CustomNavbar />

      {children}
    </div>
  );
};

export default UserLayout;
