import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <SignedIn>
        <div className="absolute top-4 right-4">
          <UserButton />
        </div>
        {children}
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  );
};

export default AdminLayout;
