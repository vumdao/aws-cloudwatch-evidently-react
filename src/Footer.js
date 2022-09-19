import { Flex, Text, useTheme } from "@aws-amplify/ui-react";
import React from 'react';

export function Footer() {
  const { tokens } = useTheme();

  return (
    <Flex className={'footer'} justifyContent="center" padding={tokens.space.medium}>
      <Text>&copy; All Rights Reserved</Text>
    </Flex>
  );
}
