import { useEffect, useState } from "react";
import { Data } from "../utils/web3calls";
import Image from 'next/image'
import axios from "axios";

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

    const { title, image, description, error } = values;

    useEffect(()=>{
        console.log(props)
        loadData();
    }, [])

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
        <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover" id="modal-id">
            <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
            <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
                <div className="">
                    <div className="text-center p-5 flex-auto justify-center">
                        <div className="w-full flex flex-col justify-center items-center text-center h-20 px-6 py-4">
                            <div className="font-bold text-lg">{`${title} #${props.token.id.toString()}`}</div>
                        </div>
                        <div className="flex items-center justify-center w-full overflow-y-hidden bg-center">
                            <Image 
                                src={'https://ipfs.io/ipfs/QmeWK2BwtsEsSmRDMwmwCT5PADbyku2Xik5sXtsVQVC9Gw?filename=HE-SLEEP.jpeg'}
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
                    </div>
                    <div className="p-3  mt-2 text-center space-x-4 md:block">
                        <button onClick={props.onClick} className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                            Cancel
                        </button>
                        <button className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )

}

export default Modal;