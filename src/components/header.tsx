import { useState } from 'react';
import {createStyles, Header, Container, Group, Burger, rem, Button} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Image, Text } from '@mantine/core';
import logo from '../logo.svg';
import {tabs} from "../App";

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    width: '100vw',
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

interface HeaderSimpleProps {
  links: { link: tabs; label: string }[];
  tab: tabs;
  setTab: any;
}

export function SiteHeader({ links, tab, setTab }: HeaderSimpleProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(tab);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <Button
      key={link.label}
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
      onClick={(event) => {
        event.preventDefault();
        setTab(link.link)
        setActive(link.link);
      }}
    >
      {link.label}
    </Button>
  ));

  return (
    <Header
      height={60}
      mb={10}
      style={{background: 'linear-gradient(152deg, rgba(214,2,112,1) 0%, rgba(155,79,150,1) 50%, rgba(0,56,168,1) 100%)'}}
    >
      <Container className={classes.header}>
        <Group>
          <Image src={logo} fit={"contain"} width={"50px"} height={"50px"}/>
          <Text weight={"bold"} fz={"xl"}>MinePlace</Text>
        </Group>
        <Group spacing={5} className={classes.links}>
          {items.map((item) => (
            <div>
              {item}
            </div>
          ))}
        </Group>

        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
      </Container>
    </Header>
  );
}