import { useEffect, useState } from "react";
import { addDynamicTokenData, Data, getDynamicTokenData, mintNewToken } from "../utils/web3calls";
import { useMoralis } from "react-moralis";
import { pinFileToIPFS, pinJSONToIPFS } from "../utils/ipfs";

type Props = {
    onClick: () => void;
    token: Data;
}

const ModalUpdate = (props: Props) => {

    const {user} = useMoralis();

    const [file, setFile] = useState(null);
    const [imgLoading, setImgLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState("");
    const [signerAddress, setSignerAddress] = useState("")
    const [errors, setErrors] = useState({
        name: "",
        desc: "",
        file: "",
    });
    const [pinned, setPinned] = useState(false);

    const initialState = {
        name: "",
        desc: "",
        surl: "",
        imgSrc: "",
        imgHash: false,
        nftType: "ERC721",
        ercTwoNum: 1,
    };

    const [{ name, desc, surl, imgSrc, imgHash, nftType, ercTwoNum }, setState] =
        useState(initialState);

    useEffect(()=>{
        if(user){
            setSignerAddress(user.get('ethAddress'))
        } else {
            setErr('Error while loading userAddress, try later!')
        }
    }, [])

    //RESET FORM
    const resetForm = () => {
        setState({...initialState});
    };

    //VALIDATION
    const validateName = () => {
        if (name === "") {
            setErrors((pS) => ({ ...pS, name: "Name cannot be empty" }));
        } else {
            setErrors((pS) => ({ ...pS, name: "" }));
        }
    };
    const validateDesc = () => {
        if (desc === "") {
            setErrors((pS) => ({ ...pS, desc: "Add description for your token" }));
        } else {
            setErrors((pS) => ({ ...pS, desc: "" }));
        }
    };

    //FILE UPLOAD
    const handleFile = async (e: any) => {
        setImgLoading(true);
        if (e.target.files[0]?.size < 1e7) {
            try {
                setFile(e.target.files[0]);
                const cid = await pinFileToIPFS(e.target.files[0]);
                console.log("IPFS imgHash", cid);
                setPinned(true);
                setState((prevState) => ({ ...prevState, imgHash: cid }));
                setErrors((pS) => ({ ...pS, file: "" }));

                if (e.target.files.length !== 0) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        setState((prevState) => ({ ...prevState, imgSrc: e.target?.result? e.target.result.toString() : ""})); 
                        setImgLoading(false);
                    };
                    reader.readAsDataURL(e.target.files[0]);
                }
            } catch (e) {
                console.error(e);
                setErr(e as string);
                setImgLoading(false);
            }
        } else {
            setErrors((pS) => ({ ...pS, file: "File should be less than 10MB" }));
            setImgLoading(false);
        }
    };

    const onSubmit = async (e: any) => {
        e.preventDefault();
        // if all req fields are avaialable
        if (name && desc && file && signerAddress && imgHash) {
          console.log("Submitting...");
          setIsLoading(true);
          setErr("");
    
          // Upload files on IPFS
          let ipfsHash = "";
          try {
            ipfsHash = await pinJSONToIPFS({
              name: name,
              description: desc,
              image: "https://gateway.pinata.cloud/ipfs/" + imgHash,
            });
          } catch (err) {
            console.log("Error Uploading files on IPFS", err);
            setErr("Uploading files on IPFS failed");
          }

        if (signerAddress) { 
            try{
                await addDynamicTokenData(props.token.id, "https://gateway.pinata.cloud/ipfs/" + ipfsHash);
                console.log("https://gateway.pinata.cloud/ipfs/" + ipfsHash)
                setErr("")
                setIsLoading(false);
                resetForm();
            } catch(err){
                setErr("Error on minting, try again later");
            }
        } else {
            validateName();
            validateDesc();
            setIsLoading(false);
            if (!signerAddress) {
                setErr("Connect to wallet first");
            } else {
                setErr("Enter all mandatory fields");
            }
        }}
    }

    return(
        <>
        <div className="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover" id="modal-id">
            <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
            <div className="w-3/2 sm:w-11/12 xs:w-11/12 mx-auto border border-yellow-500 p-5 absolute my-auto rounded-xl shadow-lg  bg-white ">
            <div className="">
                        <div className="flex flex-col border-2 border-dashed 
                            border-primary-700 mt-6 rounded-xl m-8
                            p-10 justify-center">
                            <input
                                accept="audio/*, video/*, image/*, .html, .pdf"
                                id="upload-file"
                                onChange={handleFile}
                                type="file"
                                hidden
                            />
                            <p className="w-full text-center">
                                <label htmlFor="upload-file" className="cursor-pointer border border-black font-bold px-6 py-2 rounded-lg hover:shadow-lg">Upload file</label>
                            </p>
                            <br />
                            <p className="w-full text-center mt-4 text-gray-500">
                                Supports JPG, PNG, MP3 and MP4 videos. Max file size : 10MB.
                            </p>
                            {errors.file && <p className="text-primary-100">{errors.file}</p>}
                        </div>
                        {pinned? (
                            <div className="w-full text-center mb-2">
                                <p className="text text-green-700">File pinned to IPFS</p>
                            </div>
                        ) : null}
                        {imgLoading && (
                            <div className="flex items-center justify-center ">
                                <div className="w-20 h-20 border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div>
                            </div>
                        )}
                    </div>
                    <div className="w-full px-8 sm:p-2 xs:p-2 sm:pb-6 xs:pb-6">
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-xl shadow-md border focus:outline-none"
                            value={name}
                            onChange={(e) => {
                                setState((prevState) => ({
                                ...prevState,
                                name: e.target.value,
                                }));
                                setErr("");
                                setErrors((pS) => ({ ...pS, name: "" }));
                            }}
                            onBlur={validateName}
                            required
                            id="name"
                            placeholder="Title"
                        />
                        {errors.name && (
                            <p className="text-grey-500">{errors.name}</p>
                        )}
                    </div>
                    <div className="w-full px-8 mt-6 sm:p-2 xs:p-2 sm:pb-6 xs:pb-6">
                        <textarea
                            value={desc}
                            placeholder="Description"
                            className="w-full px-4 py-3 rounded-xl border shadow-md focus:outline-none"
                            style={{ minHeight: "150px" }}
                            onChange={(e) => {
                                setErrors((pS) => ({ ...pS, desc: "" }));
                                setErr("");
                                setState((prevState) => ({
                                ...prevState,
                                desc: e.target.value,
                                }));
                            }}
                            onBlur={validateDesc}
                            required
                            id="description"
                        ></textarea>
                        {errors.desc && (
                        <p className="text-grey-500">{errors.desc}</p>
                        )}
                    </div>
                    <div className="w-full px-20 py-4 flex justify-around">
                        <button onClick={props.onClick} className="bg-white px-10 py-3 text-sm shadow-sm border rounded-xl hover:shadow-lg hover:bg-gray-100">
                            Close
                        </button>
                        <button
                            onClick={(e)=>{onSubmit(e)}}
                            disabled={false}
                            className="px-10 py-4 rounded-md bg-red-600 border border-black focus:outline-none"
                            style={{ marginBottom: "30px" }}
                        >
                            Mint
                            {isLoading && (
                                <div className="flex items-center justify-center ">
                                    <div className="w-20 h-20 border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div>
                                </div>
                            )}
                        </button>
                    </div>
                    {err? (
                            <div className="w-full text-center mb-2">
                                <p className="text-red-700">{err}</p>
                            </div>
                    ) : null}
            </div>
        </div>
        </>
    )

}

export default ModalUpdate;