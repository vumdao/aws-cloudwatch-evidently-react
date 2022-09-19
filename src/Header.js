import { Image, Heading, useTheme } from "@aws-amplify/ui-react";
import React from 'react';

export function Header() {
  const { tokens } = useTheme();

  return (
    <>
    <Heading level={1} className={'logo-heading'}>
        <Image
          alt="logo"
          src="https://github.com/vumdao/aws-opensearch/blob/master/docs/images/logo.png?raw=true"
          padding={tokens.space.medium}
        />
          <span className={'brand-name'}>{'CloudWatch Evidently'}</span>
      </Heading>
    </>
  );
}
