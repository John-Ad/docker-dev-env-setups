"use client";

import { BsList } from "react-icons/all";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  // const { data: session } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     // Redirecting...
  //     redirect("/signin");
  //   }
  // })

  return (
    <nav className="mb-10 p-9 flex flex-row justify-between items-center min-w-[100vw]">
      <img className="w-20 h-20 rounded-full"
        src="https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
        alt="" />
      <h2 className="hidden sm:inline">A title</h2>
      <div className="hidden lg:inline">
        <ul className="flex flex-row justify-evenly min-w-[60vw]">
          <li>Home</li>
          <li>Services</li>
          <li>About</li>
          <li>Contact Us</li>
        </ul>
      </div>

      <div className="w-[100px] flex-row space-evenly">
        <button onClick={() => setMenuOpen(!menuOpen)} className="float-right">
          <BsList className={"h-8 w-8 lg:hidden hover:cursor-pointer"} />
        </button>

        {
          menuOpen &&
          <ul
            className="absolute flex flex-col justify-evenly z-[1000] right-0 p-3 mt-9 mr-2 min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg"
          >
            <li>
              <Link href="/admin">Home</Link>
            </li>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact-us">Contact Us</Link>
            </li>
          </ul>
        }
      </div>
    </nav>
  );
}