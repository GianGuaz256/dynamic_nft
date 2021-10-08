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

type Props = {
  children: React.ReactNode;
  logged: boolean;
  modalOpen?: boolean;
}

export default function Layout(props: Props) {

  const { authenticate, isAuthenticated, user} = useMoralis();

  useEffect(()=>{
    console.log(isAuthenticated)
    if(isAuthenticated && (props.logged == true)){
      setLoggedIn(true)
    }
  }, [isAuthenticated, props.logged])

  const [loggedIn, setLoggedIn] = useState(false);
  const isSticky = useStickyState('isSticky' as any);
  const isLoggedIn = useStickyState('logged' as any);
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

  const onWaypointPositionChange = (currentPosition: any) => {
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
        <Sticky enabled={isSticky} innerZ={40}>
          <HeaderLoggedIn 
            logoutSite={()=>setLoggedOut()} 
            className={`${isSticky ? 'sticky' : 'unSticky'}`} />
        </Sticky>
        <Waypoint
          onEnter={removeSticky}
          // onLeave={setSticky}
          onPositionChange={(obj)=>{onWaypointPositionChange(obj)}}
        />
        <main
          sx={{
            variant: 'layout.main',
          }}
        >
          {props.children}
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
          onPositionChange={(obj)=>{onWaypointPositionChange(obj)}}
        />
        <main
          sx={{
            variant: 'layout.main',
          }}
        >
          {props.children}
        </main>
        <Footer />
        </>
      )}
    </React.Fragment>
  );
}
