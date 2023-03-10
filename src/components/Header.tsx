import React from 'react';
import {Anchor, Header as GrommetHeader, Nav} from "grommet"

interface Props {}

export const Header: React.FC<Props> = () => {
  return (
    <GrommetHeader background="light-3" pad="small">
      <Nav direction="row">
        <Anchor label="Upload" href="/upload" />
        <Anchor label="List of videos" href="/upload/list" />
      </Nav>
    </GrommetHeader>
  )
};

Header.displayName = 'Header';
