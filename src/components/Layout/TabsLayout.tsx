import { NavLink, Outlet } from "react-router-dom";
import { Home, Users } from "lucide-react";
import { routes } from "@/routes/paths";

const TabsLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className=" container flex flex-shrink flex-col md:flex-row justify-start items-center">
          <div className="px-4 py-4 flex justify-between items-center">
            <h1 className="text-lg md:text-2xl font-semibold">
              Octane Dashboard
            </h1>
          </div>

          {/* Navigation Tabs */}
          <div className="px-4 mx-auto pb-2 md:pb-0">
            <nav className="bg-white w-fit-content px-2 rounded-md shadow-md">
              <ul className="flex justify-center gap-x-2 py-2">
                <li>
                  <NavLink
                    to={routes.orders``}
                    className={({ isActive }) =>
                      `flex items-center space-x-2 block py-3 px-4 rounded-md ${
                        isActive
                          ? "text-white bg-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                  >
                    <Home className="w-5 h-5" />
                    <span className="md:visible md:relative invisible absolute">
                      Orders Overview
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={routes.users``}
                    className={({ isActive }) =>
                      `flex items-center space-x-2 block py-3 px-4 rounded-md ${
                        isActive
                          ? "text-white bg-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                  >
                    <Users className="w-5 h-5" />
                    <span className="md:visible md:relative invisible absolute">
                      User Management
                    </span>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet /> {/* Render child routes here */}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>&copy; {new Date().getFullYear()} Octane. All rights reserved.</p>
      </footer>
    </div>
  );
};

export { TabsLayout };
