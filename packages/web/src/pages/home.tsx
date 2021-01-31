import React from 'react';

import { Box } from '@chakra-ui/core';

import Header from '@/components/Header';
import SEO from '@/components/SEO';
import Sidebar from '@/components/Sidebar';

// import { Container } from './styles';

const Home: React.FC = () => (
  <>
    <SEO title="Brasil Car" image="boost.png" shouldExcludeTitleSuffix />

    <Box as="main" height="100vh" position="relative" width="100vw">
      <Header />
      <Box maxWidth={200} height="calc(100vh - 130px)">
        <Sidebar />
      </Box>
    </Box>
  </>
);

export default Home;
