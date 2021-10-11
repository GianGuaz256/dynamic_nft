import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Props = {
    uri: string;
    index: number;
    tokenId: string;
}


const Story = (props: Props) => {

    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        title: '',
        image: '',
        description: '',
        error: '',
    });
    const { title, image, description, error } = values;

    useEffect(()=>{
        console.log(props)
        loadData().then(()=>{
            getImage()
        })
    }, [])

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
    
    const getImage = async() => {
        const desiredGatewayPrefix = 'https://ipfs.io';
        const toBeFind = 'https://gateway.pinata.cloud'
        if(image.includes(toBeFind)){
            let index = image.indexOf(toBeFind)
            console.log(index)
            let hashed = image.slice(28, 80);
            console.log(hashed)
            let newWord = desiredGatewayPrefix.concat(hashed)
            console.log(newWord)
            setValues({
                ...values,
                image: newWord
            })
        }
    }

    return (
        <div className="">
            <div className="text-center p-5 flex-auto justify-center border border-black">
                <div className="w-full flex flex-col justify-center items-center text-center h-20 px-6 py-4">
                    <div className="font-bold text-lg">{props.index == 0? `${title} - Dynamic Token #${props.tokenId}` : `${title}`}</div>
                </div>
                <div className="flex items-center justify-center w-full overflow-y-hidden bg-center">
                    <Image 
                        alt="Image of the Card"
                        src={image? image.toString() : 'https://ipfs.io/ipfs/QmeWK2BwtsEsSmRDMwmwCT5PADbyku2Xik5sXtsVQVC9Gw?filename=HE-SLEEP.jpeg'}
                        width={320}
                        height={320}
                    />
                </div>
                <div className="w-full">
                    <div className="w-full text-center mb-2 p-4">
                        <p>{description}</p>
                    </div>               
                </div>   
            </div>
        </div>
    )
}

export default Story;