import { Navbar, NavbarBrand, NavbarToggler } from "reactstrap";

const NavbarCustom = ({ toggleSidebar }) => {
  return (
    <Navbar color="light" light fixed="top" className="px-4">
      <NavbarBrand href="/">SonHaberler.co</NavbarBrand>
      <NavbarToggler onClick={toggleSidebar} />
    </Navbar>
  );
};

export default NavbarCustom;
