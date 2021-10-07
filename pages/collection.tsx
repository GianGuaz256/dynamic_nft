import dynamic from 'next/dynamic';
const Layout = dynamic(import('../components/layout'));
import { Theme, ThemeProvider, ThemeUIStyleObject } from 'theme-ui';
import { StickyProvider } from '../contexts/app/app.provider';
import theme from '../theme/index';
import { Box, Container } from 'theme-ui';
import { useEffect } from 'react';
import axios from 'axios';
import { getCollection } from '../utils/web3calls';
import CardComponentButton from '../components/CardComponentButton';

type Props = {
    nfts: string[];
    length: number;
}

const Collection = (props: Props) => {

    useEffect(()=>{

    }, [])

    return (
        <ThemeProvider theme={theme as Theme}>
            <StickyProvider>
                <Layout logged={true}>
                    <Container>
                        <div className="w-full min-h-screen mt-32">
                            <h1 className="text-4xl font-bold">Collections</h1>
                            <div className="flex justify-between flex-wrap my-6">
                                {props.nfts.map((nft, i)=>{
                                    return <CardComponentButton 
                                        uri={nft}
                                        index={i.toString()}
                                        modify={false}
                                        onClick={()=>{}}
                                    />
                                })}
                            </div>
                        </div>
                    </Container>
                </Layout>
            </StickyProvider>
        </ThemeProvider>
    )
}

export default Collection;

export async function getServerSideProps() {
    let nfts = await getCollection().then(result=>{
        return result
    })
    return {
        props: {
            nfts,
            length: nfts.length
        }
    }
}

const styles = {
    section: {
      pb: ['55px', '65px', null, '90px', '110px', null, '130px', '140px'],
    },
    container: {
        position: 'absolute',
    },
}  