/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Link } from 'theme-ui';
import { Link as ScrollLink } from 'react-scroll';
import Logo from '../../components/logo';
import { DrawerProvider } from '../../contexts/drawer/drawer.provider';
import MobileDrawer from './mobileDrawer';
import MENU_DATA from './header.data';
import logoDark from '../../assets/logo.svg';
import { useState } from 'react';

export default function Header({ className }) {

  const [openModal, setOpenModal] = useState(false);

  return (
    <DrawerProvider>
      <header sx={styles.header} className={className}>
        <Container sx={styles.container}>
          <Logo image={logoDark} />

          <Flex as="nav" sx={styles.nav}>
            {MENU_DATA.map(({ path, label }, i) => (
              <ScrollLink
                activeClass="active"
                sx={styles.nav.navLink}
                to={path}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                key={i}
              >
                {label}
              </ScrollLink>
            ))}
            <Link href="/login" onClick={()=>setOpenModal(!openModal)} sx={styles.btn}>
              Login
            </Link>
          </Flex>
          <MobileDrawer />
        </Container>
      </header>
    </DrawerProvider>
  );
}

const styles = {
  header: {
    color: 'text_white',
    fontWeight: 'normal',
    py: [4, null, null, '25px'],
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'transparent',
    transition: 'all 0.4s ease',

    '&.sticky': {
      backgroundColor: 'background',
      color: 'text',
      py: '15px',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.06)',
    },
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnWrap: {
    display: 'flex',
    alignItems: 'center',
    mt: ['25px', null, null, '30px', '35px', '50px'],
    justifyContent: ['center', null, null, 'flex-start'],
  },
  btn: {
    backgroundColor: 'heading_secondary',
    borderRadius: '7px',
    lineHeight: 1,
    fontSize: ['13px', '14px', '15px'],
    padding: ['14px 20px 13px'],
    fontWeight: 700,
    display: 'inline-flex',
    alignItems: 'center',
    textTransform: 'uppercase',
    color: '#ffffff',
    transition: 'all 300ms ease',
    '&:hover': {
      opacity: 0.8,
    },
  },
  nav: {
    ml: 'auto',
    display: ['none', null, null, null, 'block'],
    navLink: {
      fontSize: '16px',
      color: '#0F2137',
      fontWeight: '400',
      cursor: 'pointer',
      lineHeight: '1.2',
      mr: '48px',
      transition: '500ms',
      ':last-child': {
        mr: '0',
      },
      '&:hover, &.active': {
        textShadow: '0 0 1px #0F2137',
      },
    },
  },
};
