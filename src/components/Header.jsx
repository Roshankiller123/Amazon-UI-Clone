import React, { useState } from "react";
import logo from "../assests/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { getAuth, signOut } from "firebase/auth";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function Header() {
  const [{ basket, user }] = useStateValue();
  const navigate = useNavigate();
  const auth = getAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleAuth = () => {
    handleMenuClose();
    if (user) {
      signOut(auth)
        .then(() => {
          console.log("User signed out");
          navigate("/");
        })
        .catch((error) => console.error("Sign out error:", error));
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="p-2 bg-black flex items-center justify-between sticky top-0 z-50 ">
      <Link to={"/"}>
        <img src={logo} alt="logo" className="w-20 sm:w-24 object-contain" />
      </Link>

      
      <div className="flex flex-1 items-center rounded-md mx-2  flex-grow">
        <input
          type="text"
          name="search"
          className="h-8 outline-none p-3 text-xs border-none w-full rounded-l-md"
        />
        <SearchIcon className="bg-[#cd9042] !w-8 !h-8 p-1 rounded-r-md text-black cursor-pointer" />
      </div>

      {/* Desktop options */}
      <div className="hidden sm:flex items-center text-white gap-6 mx-2">
        <div
          onClick={handleAuth}
          className="flex flex-col cursor-pointer text-center sm:text-left"
        >
          <span className="text-xs">
            Hello {!user ? "Guest" : user.email.split("@")[0]}
          </span>
          <span className="text-sm font-bold">
            {user ? "Sign Out" : "Sign In"}
          </span>
        </div>

        <div
          className="flex flex-col text-center sm:text-left cursor-pointer"
          onClick={() => navigate("/orders")}
        >
          <span className="text-xs">Returns</span>
          <span className="text-sm font-bold">& Orders</span>
        </div>

        <div className="flex flex-col text-center sm:text-left cursor-pointer">
          <span className="text-xs">Your</span>
          <span className="text-sm font-bold">Prime</span>
        </div>

        <Link to={"/checkout"}>
          <div className="flex items-center gap-1 cursor-pointer">
            <ShoppingBasketIcon />
            <span className="m-2 text-base">{basket?.length}</span>
          </div>
        </Link>
      </div>

      {/* Mobile dropdown menu */}
      <div className="sm:hidden flex items-center ">
        <IconButton
          edge="end"
          aria-label="menu"
          onClick={handleMenuClick}
          className="!text-white"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          keepMounted
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: "white",
              color: "black",
              borderRadius: 2,
            },
          }}
        >
          <MenuItem onClick={handleAuth}>
            {user ? "Sign Out" : "Sign In"}
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              navigate("/orders");
            }}
          >
            Orders
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              navigate("/checkout");
            }}
          >
            Basket ({basket?.length})
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default Header;
