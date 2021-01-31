import Link from 'next/link';
import React from 'react';
import { FiPower } from 'react-icons/fi';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';

import { Box, Tooltip } from '@chakra-ui/core';

import { useAuthentication } from '@/context/authentication';

import { Container } from './styles';

interface ISidebarProps {
  top?: React.ReactNode;
  middle?: React.ReactNode;
}

const Sidebar: React.FC<ISidebarProps> = () => {
  const { signOut } = useAuthentication();

  return (
    <Container>
      <ProSidebar>
        <SidebarContent>
          <Menu iconShape="circle">
            <Link href="/cash-handling">
              <MenuItem>Movimentação Caixa</MenuItem>
            </Link>
            <MenuItem>Mensalidades</MenuItem>
            <Link href="/inspections">
              <MenuItem>Vistorias</MenuItem>
            </Link>
          </Menu>
        </SidebarContent>

        <SidebarFooter
          css={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Tooltip label="Sair" aria-label="Sair">
            <Box cursor="pointer" onClick={signOut} padding={3}>
              <FiPower size={20} color="gray.200" />
            </Box>
          </Tooltip>
        </SidebarFooter>
      </ProSidebar>
    </Container>
  );
};

export default Sidebar;
