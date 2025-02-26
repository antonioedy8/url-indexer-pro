
import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary">
      <div className="w-full max-w-md">
        <SignIn 
          appearance={{
            elements: {
              rootBox: "mx-auto w-full",
              card: "backdrop-blur-sm bg-white/30 dark:bg-black/30 border border-gray-200 dark:border-gray-800",
            }
          }}
        />
      </div>
    </div>
  );
};

export default Login;
