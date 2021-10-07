/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container, Flex, Link } from 'theme-ui';
import { Link as ScrollLink } from 'react-scroll';
import Logo from '../logo';
import { DrawerProvider } from '../../contexts/drawer/drawer.provider';
import MobileDrawer from './mobileDrawer';
import MENU_DATA from './headerIn.data';
import logoDark from '../../assets/logo.svg';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useMoralis } from 'react-moralis';
import Moralis from 'moralis'

export default function HeaderIn({ className, logoutSite }) {

  const router = useRouter();

  const [isClicked, setIsClicked] = useState(false);

  const logoutFromWallet = () => {
    Moralis.User.logOut()
    logoutSite();
    router.push('/');
  }

  const clickedOnNav = () => {
    router.push(path);
    if(i==0){
      //styles.dashboard
    } else if(i==1){

    } else {

    }
  }

  return (
    <DrawerProvider>
      <header sx={styles.header} className={className}>
        <Container sx={styles.container}>
          <Link to=""></Link>

          <Flex as="nav" sx={styles.nav}>
            {MENU_DATA.map(({ path, label }, i) => (
              <ScrollLink
                activeClass="active"
                sx={styles.nav.navLink}
                to={path}
                onClick={()=>{router.push(path)}}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                key={i}
              >
                {label}
              </ScrollLink>
            ))}
            <Link sx={styles.btn} to="">
              <div class="relative inline-block text-left">
              <div>
                <button type="button" onClick={()=>{setIsClicked(!isClicked)}} class="inline-flex justify-center w-full border border-gray-300 shadow-sm rounded-full bg-white text-sm font-medium text-black" id="menu-button" aria-expanded="true" aria-haspopup="true">
                  <img class="h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""></img>
                </button>
              </div>
              {isClicked? (
              <div class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                <div class="py-1" role="none">
                  <form method="POST" action="#" role="none">
                    <button type="submit" class="text-gray-700 block w-full text-left px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-3">
                      Update Profile
                    </button>
                  </form>
                  <form method="POST" action="#" role="none">
                    <button type="submit" onClick={()=>{logoutFromWallet()}} class="text-gray-700 block w-full text-left px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-3">
                      Sign out
                    </button>
                  </form>
                </div>
              </div>) : null}
            </div>
            </Link>
          </Flex>
          <MobileDrawer/>
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
    backgroundColor: '#3CC68A',
    transition: 'all 0.4s ease',
    borderBottom: '1px solid black',

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
    borderRadius: '100%',
    lineHeight: 1,
    fontSize: ['13px', '14px', '15px'],
    fontWeight: 700,
    display: 'inline-flex',
    alignItems: 'center',
    textTransform: 'uppercase',
    color: '#ffffff',
    transition: 'all 300ms ease',
    '&:hover': {
      opacity: 1,
    },
  },
  nav: {
    ml: 'auto',
    display: ['none', null, null, null, 'flex'],
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
