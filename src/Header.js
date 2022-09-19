import { Image, Heading, useTheme } from "@aws-amplify/ui-react";
import React from 'react';
import Logo from './images/logo.png';

export function Header() {
  const { tokens } = useTheme();

  return (
    <>
      <Heading level={1} className={'logo-heading'}>
        <Image src={Logo} alt="Logo" padding={tokens.space.medium} />
        <span className={'brand-name'}>{'CloudWatch Evidently'}</span>
      </Heading>
    </>
  );
}
