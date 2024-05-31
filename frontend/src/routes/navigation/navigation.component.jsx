import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsCartOpen } from "../../store/cart/cart.selector";


import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import NatoLogo  from "../../assets/imgs/LOGO-rosa.png";

import {
  NavigationContainer,
  NavLinks,
  LogoContainer,
} from "./navigation.styles";

export default function Navigation() {
  const isCartOpen = useSelector(selectIsCartOpen);

  return (
    <Fragment>
      <NavigationContainer className="navigation">
        <LogoContainer to="/">
          <img src={NatoLogo} alt="logo-nato" className="logo" />
          {/* <NatoLogo className="logo" /> */}
        </LogoContainer>
        <NavLinks>
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
}
