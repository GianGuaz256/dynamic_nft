import React, { useState } from 'react';
import Image from 'next/image';
import { Container, Box, Heading, Text, Button, Link } from 'theme-ui';
//import ModalVideo from 'react-modal-video';
import { IoIosPlayCircle } from 'react-icons/io';
import BannerImage from '../assets/banner-1.png';
const BANNER_DATA = {
  title: 'Welcome to first Dynamic NFT Marketplace',
  text:
    "We think NFTs go far beyond static content. Every digital asset has a unique story it needs to tell, and that's why we created the first marketplace where you can buy NFTs and create your own story out of them.",
  button: {
    link: '/login',
    label: 'Try it out!',
  },
  bannerImage: BannerImage,
};

const Banner = () => {
  const { title, text, button, videoBtn, bannerImage } = BANNER_DATA;
  const handleClick = (e) => {
    e.preventDefault();
    setVideoOpen(true);
  };
  return (
    <Box as="section" id="banner" sx={styles.section}>
      <Container sx={styles.container}>
        <Box sx={styles.content}>
          <Heading as="h1">{title}</Heading>
          <Text as="p">{text}</Text>
          <Box sx={styles.btnWrap}>
            <Link href={button.link} sx={styles.btn}>
              {button.label}
            </Link>
          </Box>
        </Box>

        <Box sx={styles.sectionImage}>
          <Image
            src={bannerImage}
            alt="Banner Mockup"
            width={740}
            height={442}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;

const styles = {
  section: {
    overflow: 'hidden',
    pt: ['115px', null, null, '140px', '150px', '170px', '185px'],
    pb: ['60px', '75px', null, '90px', '110px', '120px', '140px', '160px'],
  },
  container: {
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: ['column', null, null, 'row'],
  },
  content: {
    maxWidth: ['100%', null, null, '355px', '460px', '545px', null, '590px'],
    textAlign: ['center', null, null, 'left'],
    h1: {
      fontSize: ['28px', '32px', null, '34px', '40px', '48px', '54px', '58px'],
      lineHeight: [1.4, null, null, 1.35],
      color: 'heading',
      fontFamily: 'archivo',
      letterSpacing: '-1.5px',
      fontWeight: 'body',
      mx: ['0', null, null, 'auto', '0'],
    },
    p: {
      fontSize: ['15px', null, null, null, '16px', '17px'],
      lineHeight: [1.8, null, null, 1.8],
      color: 'text',
      mt: [3, null, null, '18px'],
      pr: [0, null, null, null, null, null, null, '50px'],
    },
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
    padding: ['14px 20px 13px', '14px 25px 13px', '17px 30px 15px'],
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
  videoBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: 'transparent',
    color: 'heading_secondary',
    cursor: 'pointer',
    textTransform: 'uppercase',
    padding: 0,
    fontSize: ['13px', null, '15px', null, '17px'],
    fontWeight: 700,
    fontFamily: 'body',
    ml: ['20px', null, null, '25px', '30px'],
    outline: 'none',
    svg: {
      ml: [1, null, 2],
      fontSize: ['17px', '18px', '20px'],
      position: 'relative',
      top: '-1px',
    },
  },
  sectionImage: {
    mt: ['40px', null, null, 0],
    pl: [0, null, null, '30px', 0],
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'relative',
    right: ['auto', null, null, null, '-10px', '-50px', '-70px'],
    width: [
      null,
      null,
      null,
      'calc(100% - 355px)',
      'calc(100% - 460px)',
      'calc(100% - 545px)',
      null,
      'calc(100% - 590px)',
    ],
    textAlign: ['center', null],
  },
};
