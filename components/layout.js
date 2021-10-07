/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useCallback, useEffect, useState } from 'react';
import Sticky from 'react-stickynode';
import { useStickyState } from '../contexts/app/app.provider';
import { Waypoint } from 'react-waypoint';
import { useStickyDispatch } from '../contexts/app/app.provider';
import Header from './header/header';
import HeaderLoggedIn from './headerLoggedIn/headerIn';
import Footer from './footer/footer';
import { useMoralis } from 'react-moralis'



export default function Layout({ children, logged }) {

  const { authenticate, isAuthenticated, user} = useMoralis();

  useEffect(()=>{
    console.log(isAuthenticated)
    if(isAuthenticated && (logged == true)){
      setLoggedIn(true)
    }
  })

  const [loggedIn, setLoggedIn] = useState(false);
  const isSticky = useStickyState('isSticky');
  const isLoggedIn = useStickyState('logged');
  const dispatch = useStickyDispatch();
  const setSticky = useCallback(() => dispatch({ type: 'SET_STICKY' }), [
    dispatch,
  ]);
  const removeSticky = useCallback(() => dispatch({ type: 'REMOVE_STICKY' }), [
    dispatch,
  ]);
  const setLoggedOut = useCallback(() => dispatch({ type: 'SET_LOGGED_OUT' }), [
    dispatch,
  ]);

  const onWaypointPositionChange = ({ currentPosition }) => {
    if (currentPosition === 'above') {
      setSticky();
    }
    if (currentPosition === 'below') {
      removeSticky();
    }
  };

  return (
    <React.Fragment>
      {loggedIn ? (
        <>
        <Sticky enabled={isSticky} innerZ={991}>
          <HeaderLoggedIn 
            logoutSite={()=>setLoggedOut()} 
            className={`${isSticky ? 'sticky' : 'unSticky'}`} />
        </Sticky>
        <Waypoint
          onEnter={removeSticky}
          // onLeave={setSticky}
          onPositionChange={onWaypointPositionChange}
        />
        <main
          sx={{
            variant: 'layout.main',
          }}
        >
          {children}
        </main>
        </>
      ) : (
        <>
        <Sticky enabled={isSticky} innerZ={991}>
          <Header className={`${isSticky ? 'sticky' : 'unSticky'}`} />
        </Sticky>
        <Waypoint
          onEnter={removeSticky}
          // onLeave={setSticky}
          onPositionChange={onWaypointPositionChange}
        />
        <main
          sx={{
            variant: 'layout.main',
          }}
        >
          {children}
        </main>
        <Footer />
        </>
      )}
    </React.Fragment>
  );
}
