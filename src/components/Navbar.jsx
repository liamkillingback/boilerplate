import React, {useState} from 'react';
import { navLinks } from '../constants'
import { HashLink } from "react-router-hash-link";


const Navbar = () => {
    const [currentNav, setCurrentNav] = useState("Home");
    return (
      <div className="flex flex-row w-full pt-7 font-semibold fixed navbar top-0 right-0">
        <div className="flex flex-row md:gap-20 gap-9 text-[rgb(209,209,209)] md:px-[22%] px-6 h-10 items-center justify-end w-full bg-[rgba(54,54,54,0.9)] shadow-md shadow-[rgba(192,192,192,0.23)]">
          {navLinks.map((link, index) => (
            <HashLink
              onClick={() => setCurrentNav(link.title)}
              className="hover:text-[hsl(0,100%,67%)] transition duration-300 group"
              key={index}
              to={link.href}
            >
              {link.title}
              <span
                className={`block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-[rgb(252,89,89)] ${
                  currentNav === link.title && "max-w-full"
                }`}
              ></span>
            </HashLink>
          ))}
        </div>
      </div>
    );
  };

export default Navbar;
