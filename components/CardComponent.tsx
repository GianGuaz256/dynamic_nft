import axios from 'axios';
import { useState, useEffect } from 'react';
import Image from 'next/image';
//import IPFSGatewayTools from '@pinata/ipfs-gateway-tools/dist/browser';
//const gatewayTools = new IPFSGatewayTools();


type Props = {
    uri: string;
    index: string;
    onClick: () => void;
}

const CardDetailToken = (props: Props) => {

    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        title: '',
        image: '',
        description: '',
        error: '',
    });

    const { title, image, description, error } = values;

    useEffect(()=>{
        loadData().then(result=>{
            getImage();
        })
    }, [])

    const getImage = async() => {
        /*const desiredGatewayPrefix = 'https://ipfs.io'
        const convertedGatewayUrl = gatewayTools.convertToDesiredGateway(image, desiredGatewayPrefix);
        console.log('IMAGE', convertedGatewayUrl)
        setValues({
            ...values,
            image: convertedGatewayUrl
        })*/
    }

    const loadData = async() => {
        setLoading(true);
        return await axios.get(props.uri)
            .then(function (response) {
                console.log(response.data);
                setValues({
                    ...values,
                    title: response.data.name,
                    image: response.data.image,
                    description: response.data.description,
                });
                setLoading(false);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                setLoading(false)
            });
    }

    return(
        <>
            <a onClick={props.onClick}>
                <div id={`${props.index.toString()}`} className="max-w-xs sm:max-w-sm rounded-2xl bg-white overflow-hidden shadow-lg mx-2 my-4 border">
                        {loading ? (
                            <div className="flex items-center justify-center ">
                                <div className="w-20 h-20 border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div>
                            </div>
                        ) : (
                        <>
                            <div className="w-full flex flex-col justify-center items-center text-center h-20 px-6 py-4">
                                <div className="font-bold text-lg">{`${title} #${props.index.toString()}`}</div>
                            </div>
                            <div className="flex items-center justify-center w-full overflow-y-hidden bg-center">
                                <Image 
                                    src="https://ipfs.io/ipfs/QmeWK2BwtsEsSmRDMwmwCT5PADbyku2Xik5sXtsVQVC9Gw?filename=HE-SLEEP.jpeg"
                                    width={320}
                                    height={320}
                                />
                            </div>
                            <div className="w-full">
                                <div className="w-full flex justify-between mb-2 p-4">
                                    <a className="flex w-full mb-2" href="#" onClick={()=>{}}>
                                        <p>{description}</p>
                                    </a> 
                                </div>               
                            </div>
                        </>
                        )}
                </div>
            </a>
        </>
    )
}

export default CardDetailToken;