import React from 'react';

import { Heading } from '@chakra-ui/core';

const Title: React.FC = ({ children }) => (
  <Heading
    size="lg"
    borderBottom="1px solid"
    borderBottomColor="black"
    color="black"
    paddingBottom={2}
    marginBottom={4}
  >
    {children}
  </Heading>
);

export default Title;
