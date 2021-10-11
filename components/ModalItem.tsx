import { useEffect, useState } from "react";
import { Data, getDynamicTokenData } from "../utils/web3calls";
import Image from 'next/image'
import axios from "axios";
import Story from "./Story";

type Props = {
    onClick: () => void;
    token: Data;
}

const Modal = (props: Props) => {

    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        title: '',
        image: '',
        description: '',
        error: '',
    });
    const [dynamicData, setDynamicData] = useState<string[]>([])

    const { title, image, description, error } = values;

    useEffect(()=>{
        console.log(props)
        loadData();
        getDynamicData()
    }, [])

    const getDynamicData = async() => {
        const data:string[] = await getDynamicTokenData(props.token.id);
        //data.unshift(props.token.uri);
        let newData = [props.token.uri].concat(data)
        setDynamicData(newData);
        console.log(data);
    }

    const loadData = async() => {
        setLoading(true);
        return await axios.get(props.token.uri)
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
        <div className="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover" id="modal-id">
            <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
            <div className="w-3/2 sm:w-11/12 xs:w-11/12 max-h-screen mx-auto border border-yellow-500 p-5 absolute my-auto rounded-xl shadow-lg  bg-white overflow-auto">
                <div className="">
                    {/*<div className="text-center p-5 flex-auto justify-center border border-black">
                        <div className="w-full flex flex-col justify-center items-center text-center h-20 px-6 py-4">
                            <div className="font-bold text-lg">{`${title} #${props.token.id.toString()}`}</div>
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
                    </div>*/}
                    {dynamicData.map((uri, index)=>{
                        return <Story 
                            uri={uri}
                            index={index}
                            tokenId={props.token.id}
                            key={index}
                        />
                    })}
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

export default Modal;