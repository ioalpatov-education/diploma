import { NavLink } from "react-router-dom";
import { links } from "../../utils/defaultData";

const HeaderLinks = () => {
  return (
    <ul className="navbar-nav mr-auto">
      {links.map((link, linkIdx) => (
        <li className="nav-item " key={linkIdx}>
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            to={link.to}
          >
            {link.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default HeaderLinks;
