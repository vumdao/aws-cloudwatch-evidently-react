import { Image, Heading, Link, Flex, useTheme } from "@aws-amplify/ui-react";

export function MainHeader() {
  const { tokens } = useTheme();

  return (
    <Flex className={'main-header'}>
    <Heading level={1} className={'main-heading'}>
        <Link href="https://www.cloudopz.co/" isExternal={true}>
          <Image
            alt="logo"
            src="https://github.com/vumdao/aws-opensearch/blob/master/docs/images/logo.png?raw=true"
            padding={tokens.space.medium}
          />
          <span className={'brand-name'}>{'CloudOpz'}</span>
        </Link>
      </Heading>
    </Flex>
  );
}
