import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import AdminNavbar from "./components/AdminNavbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <SignedIn>
        <AdminNavbar />
        {children}
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  );
};
export default AdminLayout;
