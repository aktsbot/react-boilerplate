import { NavLink } from "react-router";
import { useRef } from "react";

const menuItems = [
  {
    path: "/",
    text: "Home",
  },
  {
    path: "/about",
    text: "About",
  },
  {
    path: "/login",
    text: "Login",
  },
  {
    path: "/signup",
    text: "Sign Up",
  },
  {
    path: "/account",
    text: "Account",
  },
];

/*
when a link is clicked and the corresponding page is loaded,
the dropdown still stays open. this is a workaround to remove the
open attribute in the details element which has the menu items.
*/
const MenuItems = ({ onClick }: { onClick: () => void }) => {
  return menuItems.map((m, index) => (
    <li key={`menu-item-${index}`}>
      <NavLink to={m.path} onClick={onClick}>
        {m.text}
      </NavLink>
    </li>
  ));
};

export const Navbar = () => {
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
            <MenuItems onClick={handleClick} />
          </ul>
        </details>
      </div>
      <div className="flex-1">
        <NavLink to="/" className="btn btn-ghost text-xl">
          myapp
        </NavLink>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/logout">Logout</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
