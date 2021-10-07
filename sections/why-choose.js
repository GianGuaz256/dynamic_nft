import React from 'react';
import { Container, Box, Flex, Heading, Text, Image as Img } from 'theme-ui';
import iconOpensea from '../assets/opensea.png';
import iconHistory from '../assets/history.png';
import iconErc from '../assets/erc721.png';
const WHY_CHOOSE_DATA = {
  blockTitle: {
    title: 'Why you choose Dynamic NFT?',
    text: 'Well, because its the first time something like this has landed in the Ethereum world and because you could be part of a new form of collecting on NFTs',
  },
  posts: [
    {
      icon: iconErc,
      title: 'Dynamic NFT',
      text:
        'Buy the first dynamic nft and become a pioneer of this new standard',
    },
    {
      icon: iconHistory,
      title: 'Onchain history',
      text:
        'Create your online story by saving metadata in the NFT. Each token has its own history',
    },
    {
      icon: iconOpensea,
      title: 'Sell on Opensea',
      text:
        'All tokens follow the ERC721 standard and are sold directly on Opensea',
    },
  ],
};

const WhyChoose = () => {
  const { blockTitle, posts } = WHY_CHOOSE_DATA;
  return (
    <Box as="section" id="services" sx={styles.section}>
      <Container sx={styles.container}>
        <Box sx={styles.blockTitle}>
          <Heading as="h2">{blockTitle.title}</Heading>
          <Text as="p">{blockTitle.text}</Text>
        </Box>
        <Flex sx={styles.row}>
          {posts.map(({ icon, text, title }, index) => (
            <Box key={`why-choose-post-key-${index}`} sx={styles.post} className="rounded-xl shadow-md hover:shadow-xl">
              <Box sx={styles.imageWrap}>
                <Img src={icon} alt="icon image" />
              </Box>
              <Heading as="h3">{title}</Heading>
              <Text as="p">{text}</Text>
            </Box>
          ))}
        </Flex>
      </Container>
    </Box>
  );
};

export default WhyChoose;

const styles = {
  section: {
    borderTop: '2px solid #f8f8ff',
    pb: ['20px', '30px', null, '50px', '85px', null, '105px', '125px', '140px'],
    pt: ['20px', '30px', null, '50px', '85px', null, '105px', '125px', '140px'],
  },
  container: {
    position: 'relative',
  },
  blockTitle: {
    textAlign: 'center',
    mb: ['35px', null, null, '55px', null, '60px', '85px', '95px', '110px'],
    h2: {
      fontSize: ['24px', null, '28px', '30px'],
      lineHeight: [1.35],
      color: 'heading',
      mb: [2, null, '13px'],
      fontWeight: 'body',
    },
    p: {
      fontSize: ['15px', null, '16px'],
      lineHeight: 1.85,
      color: 'text_secondary',
    },
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 9,
  },
  post: {
    padding: '20px',
    mb: [0, null, null, null, 0],
    flex: ['0 0 100%', null, '0 0 50%', null, '0 0 25%'],
    textAlign: 'center',
    h3: {
      fontSize: ['18px', null, null, null, null, '20px'],
      lineHeight: 1.45,
      letterSpacing: '-0.5px',
      fontWeight: '500',
      color: '#02073E',
      mt: ['18px', '20px', null, null, '25px', '30px', null, '40px'],
      mb: ['10px', '15px', null, null, null, '20px'],
    },
    p: {
      maxWidth: '266px',
      mx: 'auto',
      color: '#02073E',
      fontSize: ['14px', '15px'],
      lineHeight: 2,
      px: [null, null, null, null, '5px', 0],
    },
  },
  imageWrap: {
    display: 'flex',
    minHeight: ['auto', '83px'],
    alignItems: 'center',
    justifyContent: 'center',
    img: {
      width: ['75px', null, null, null, 'auto'],
    },
  },
};
