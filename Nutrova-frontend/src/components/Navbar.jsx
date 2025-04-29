import { useClerk, useUser } from "@clerk/clerk-react";

export default function Navbar() {
  const { signOut, openSignIn } = useClerk();
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return <div>Loading authentication state...</div>;
  }

  const handleLogout = async () => {
    try {
      await signOut();
      console.log("Successfully logged out");
      window.location.reload();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const username = user?.username || user?.firstName || "User";
  const email = user?.emailAddresses[0]?.emailAddress || "No email";

  return (
    <div className="w-full flex items-center justify-between p-4 bg-white shadow-md">
      <h1 className="text-3xl font-bold text-blue-600 select-none">NeuTrova</h1>
      <div className="flex items-center space-x-6">
        {isSignedIn ? (
          <>
            <div className="flex flex-col text-right group cursor-pointer">
              <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                Hi, {username}
              </span>
              <span className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                {email}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded-full font-medium hover:bg-blue-600 hover:text-white transition-all duration-300 active:scale-95"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 active:scale-95 transition-transform duration-200"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}
