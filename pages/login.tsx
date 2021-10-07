import { useCallback, useEffect } from 'react';
import { jsx, Container, Flex } from 'theme-ui';
import { useMoralis } from 'react-moralis'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Metamask from '../assets/metamask.png';
import WalletConIcon from '../assets/wallet.png'
import Image from 'next/image'
import { useStickyState } from '../contexts/app/app.provider';
import { useStickyDispatch } from '../contexts/app/app.provider';

const Login = () => {

    const { authenticate, isAuthenticated, user} = useMoralis();
    const router = useRouter();

    const isLogged = useStickyState('logged' as any);
    const dispatch = useStickyDispatch();
    const setLoggedIn = useCallback(() => dispatch({ type: 'SET_LOGGED_IN' }), [
        dispatch,
    ]);

    useEffect(()=>{
        if(isAuthenticated){
            router.push('/dashboard');
        }
    })

    const authenticateWithMetamask = async() => {
        await authenticate({chainId: 137}).then(user=>{
            setLoggedIn();
            console.log(user)
        })
    }

    const authenticateWithWalleCon = async() => {
        await authenticate({ provider: "walletconnect", chainId: 137}).then(user=>{
            setLoggedIn();
            console.log(user)
        })
    }

    return (
        <div className="w-full min-h-screen overflow-hidden flex justify-center items-center">
            <div className="w-auto h-auto shadow-lg rounded-lg flex-col text-center p-4 m-4">
                <h1>Connect your wallet</h1>
                <div className="flex justify-between sm:flex-col xs:flex-col">
                    <a href="#" onClick={authenticateWithMetamask} className="">
                        <div className="w-fill h-auto shadow-lg rounded-lg flex-col justify-items-center m-4 px-20 py-10">
                            <h2 className="mb-4">Metamask</h2>
                            <Image 
                                src={Metamask}
                                alt="Metamask Logo"
                                width={60}
                                height={60}
                            />
                        </div>
                    </a>
                    <a href="#" onClick={authenticateWithWalleCon}>
                        <div className="w-fill h-auto shadow-lg rounded-lg flex-col justify-items-center m-4 px-20 py-10">
                            <h2 className="mb-4">Wallet Connect</h2>
                            <Image 
                                src={WalletConIcon}
                                alt="Metamask Logo"
                                width={60}
                                height={60}
                            />
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Login;
  