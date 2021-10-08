import { useEffect, useState } from "react";
import { Data, getDynamicTokenData } from "../utils/web3calls";
import Image from 'next/image'
import axios from "axios";

type Props = {
    onClick: () => void;
    token: Data;
}

const ModalUpdate = (props: Props) => {


    useEffect(()=>{
        //
    }, [])

    return(
        <>
        <div className="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover" id="modal-id">
            <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
            <div className="w-full border border-yellow-500 p-5 absolute mx-auto my-auto rounded-xl shadow-lg  bg-white ">
                <div className="">
                    <div className="text-center p-5 flex-auto justify-center border border-black">
                        <div className="w-full flex flex-col justify-center items-center text-center h-20 px-6 py-4">
                            <div className="font-bold text-lg">Ciao</div>
                        </div>
                        <div className="flex items-center justify-center w-full overflow-y-hidden bg-center">
                            <Image 
                                alt="Image of the Card"
                                src={'https://ipfs.io/ipfs/QmeWK2BwtsEsSmRDMwmwCT5PADbyku2Xik5sXtsVQVC9Gw?filename=HE-SLEEP.jpeg'}
                                width={320}
                                height={320}
                            />
                        </div>
                        <div className="w-full">
                            <div className="w-full text-center mb-2 p-4">
                                <p>Ciao</p>
                            </div>               
                        </div>   
                    </div>
                    <div className="p-3 mt-2 text-center space-x-4 md:block">
                        <button onClick={props.onClick} className="mb-2 md:mb-0 bg-white px-10 py-4 text-sm shadow-sm font-medium tracking-wider border rounded-xl hover:shadow-lg hover:bg-gray-100">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )

}

export default ModalUpdate;