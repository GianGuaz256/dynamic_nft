import dynamic from 'next/dynamic';
const Layout = dynamic(import('../components/layout'));
import { Theme, ThemeProvider } from 'theme-ui';
import { StickyProvider } from '../contexts/app/app.provider';
import { Box, Container } from 'theme-ui';
import theme from '../theme/index';
import { useEffect, useState } from 'react';
import {getNumberOfTokenOwned, getTokenOfOwnerData, Data} from '../utils/web3calls';
import Image from 'next/image'
import tokenDash from '../assets/tokenDash.png';
import addressDash from '../assets/addressDash.png';
import { useMoralis } from 'react-moralis';
import CardComponentButton from '../components/CardComponentButton';
import Modal from '../components/ModalItem';
import ModalUpdate from '../components/ModalItemUpdate';

const Dashboard = () => {

    const {user} = useMoralis()

    const empty: Data = {
        id: '',
        uri: ''
    }

    const [tokenOwner, setTokenOwner] = useState(0);
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [nftData, setNftsData] = useState<Data[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [objectClicked, setObjectClicked] = useState<Data>();

    useEffect(()=>{
        setLoading(true);
        const address = user?.get('ethAddress');
        getDashboardInfo(address)
        .then(result=>{
            setNftsData(result.data)
            setTokenOwner(result.data.length);
        }).catch(e=>console.log(e));
        setAddress(address);
        setLoading(false)
    }, [user])

    const formatAddress = ():string => {
        let first = address.slice(0, 4);
        let last = address.slice(38, 42);
        return first + '...' + last;
    }

    const getDashboardInfo = async(address:string) => {
        const numOfTokens: number = await getNumberOfTokenOwned(address);
        const data = await getTokenOfOwnerData(address);
        return {
            data: data,
            length: numOfTokens
        }
    }

    return (
        <ThemeProvider theme={theme as Theme}>
            <StickyProvider>
                <Layout 
                    logged={true}
                    modalOpen={showModal}
                >
                    <Container>
                        <div className="w-full min-h-screen mt-32">
                            <h1 className="text-4xl font-bold">Dashboard</h1>
                            <div className="w-full flex justify-around items-center">
                                <div className="flex-col justify-center items-center text-center mt-6">
                                    <Image 
                                        alt="Token Dashboard Logo"
                                        src={tokenDash}
                                        width={100}
                                        height={100}
                                    />
                                    <p className="font-bold">Token: {tokenOwner}</p>
                                </div>
                                <div className="flex-col justify-center items-center text-center">
                                    <Image 
                                        alt="Address Dashboard Logo"
                                        src={addressDash}
                                        width={65}
                                        height={100}
                                    />
                                    <p className="font-bold">Address: {address ? formatAddress() : ''}</p>
                                </div>
                            </div>
                            <div>
                                {loading? (
                                    <div>Loading...</div>
                                ) : (
                                    <div className="flex justify-between flex-wrap my-6">
                                            {showModal? (
                                                <div className="fixed z-50">
                                                    <Modal 
                                                        onClick={()=>{setShowModal(!showModal)}}
                                                        token={objectClicked? objectClicked : empty}
                                                    />
                                                </div>
                                            ) : null}
                                            {showModalUpdate? (
                                                <div className="fixed z-50">
                                                    <ModalUpdate 
                                                        onClick={()=>{setShowModalUpdate(!showModalUpdate)}}
                                                        token={objectClicked? objectClicked : empty}
                                                    />
                                                </div>
                                            ) : null}
                                        {nftData.map((nft, i)=>{
                                            return <CardComponentButton 
                                                uri={nft.uri}
                                                index={nft.id}
                                                key={i}
                                                modify={true}
                                                onClickUpdate={()=>{
                                                    setShowModalUpdate(!showModalUpdate);
                                                    setObjectClicked(nft);
                                                }}
                                                onClick={()=>{
                                                    setShowModal(!showModal);
                                                    setObjectClicked(nft);
                                                }}
                                            />
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </Container>
                </Layout>
            </StickyProvider>
        </ThemeProvider>
    )
}

export default Dashboard;

//export async function getServerSideProps() {}
  