import React from "react";
import { useState } from "react";
import SideBar from "./SideBar";
import { Link,useLocation  } from "react-router-dom";


function NavBar() {
  const [showSideBar, setShowSideBar] = useState(false);
  const location = useLocation()
  const links= [
    {
        name: "Home",
        path: "/",
       
    },
    {
        name: "About",
        path: "/artistProfile",
        
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
        <a href="/" className="logo">
          P<span>allas</span> Galaxy
        </a>
        <div className="nav-links">
        { links.map(link=>(
                <Link Link to={link.path} className= {location.pathname === link.path ? " active" : ""}  key={link.name}>{link.name}</Link>
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
