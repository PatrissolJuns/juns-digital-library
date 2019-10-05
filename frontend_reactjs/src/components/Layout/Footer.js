import React from 'react';

import { Navbar, Nav, NavItem } from 'reactstrap';

import SourceLink from './../../components/SourceLink';

const Footer = () => {
  return (
    <Navbar>
      <Nav navbar>
        <NavItem>
          &copy; 2019 Patrissol KENFACK #patrissoljuns, source on <SourceLink>Github</SourceLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Footer;
