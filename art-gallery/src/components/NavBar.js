import React from "react";
import { useState } from "react";
import SideBar from "./SideBar";



function NavBar() {
  const [showSideBar, setShowSideBar] = useState(false);
  const links= [
    {
        name: "Home",
        path: "/",
       
    },
    {
        name: "About",
        path: "/about",
        
    },
    {
        name: "Gallery",
        path: "/gallery",
       

    },
    {
        name: "Contact",
        path: "/contact",
        
    },
  ]

  function closeSideBar(){
    setShowSideBar(false)
  }
  return (
    <>
      <div className="navbar container">
        <a href="#!" className="logo">
          P<span>allas</span> Galaxy
        </a>
        <div className="nav-links">
            {links.map(link=>(
                <a href="#!" key={link.name}>{link.name} </a>
            ))}
          {/* <a href="">Home</a>
          <a href="">About</a>
          <a href="">Gallery</a>
          <a href="">Contact</a> */}
        </div>
        <div
          onClick={() => setShowSideBar(true)}
          className={showSideBar ? "sidebar-btn active" : "sidebar-btn "}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        {showSideBar && <SideBar close={closeSideBar} links={links}/> }
       
      </div>
    </>
  );
}

export default NavBar;
