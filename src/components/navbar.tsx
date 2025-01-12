import { NavLink } from "react-router";
import { useRef, memo } from "react";

import useAuthStore from "@/store/auth";
import { config } from "@/config";

/**
 * routeType:
 *  public - any one can access. always in menu
 *  public-auth - show only if the user is not logged in
 *  private-auth - show only if the user is logged in
 */
const menuItems = [
  {
    path: "/",
    text: "Home",
    routeType: "public",
  },
  {
    path: "/about",
    text: "About",
    routeType: "public",
  },
  {
    path: "/login",
    text: "Login",
    routeType: "public-auth",
  },
  {
    path: "/signup",
    text: "Sign Up",
    routeType: "public-auth",
  },
  {
    path: "/account",
    text: "Account",
    routeType: "private-auth",
  },
];

/*
when a link is clicked and the corresponding page is loaded,
the dropdown still stays open. this is a workaround to remove the
open attribute in the details element which has the menu items.
*/
const MenuItems = ({
  onClick,
  isLoggedIn,
}: {
  onClick: () => void;
  isLoggedIn: boolean;
}) => {
  let items = [...menuItems];
  if (isLoggedIn) {
    items = items.filter(
      (item) => item.routeType === "public" || item.routeType === "private-auth"
    );
  } else {
    items = items.filter(
      (item) => item.routeType === "public" || item.routeType === "public-auth"
    );
  }

  return items.map((m, index) => (
    <li key={`menu-item-${index}`}>
      <NavLink to={m.path} onClick={onClick}>
        {m.text}
      </NavLink>
    </li>
  ));
};
const Memoised_MenuItems = memo(MenuItems);

export const Navbar = () => {
  const { isLoggedIn } = useAuthStore();

  const ref = useRef<HTMLDetailsElement>(null);

  // Menu item click to close the dropdown
  const handleClick = () => {
    const el = ref.current;
    if (el) {
      el.removeAttribute("open");
    }
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-none">
        <details className="dropdown" ref={ref}>
          <summary
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </summary>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <Memoised_MenuItems onClick={handleClick} isLoggedIn={isLoggedIn} />
          </ul>
        </details>
      </div>
      <div className="flex-1">
        {/* the onClick ensures the menu stays closed. */}
        <NavLink to="/" className="btn btn-ghost text-xl" onClick={handleClick}>
          {config.appTitle}
        </NavLink>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            {isLoggedIn ? (
              <NavLink to="/logout" onClick={handleClick}>
                Log Out
              </NavLink>
            ) : (
              <NavLink to="/login" onClick={handleClick}>
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
