import { useState, useRef } from "react";
import ReactCrop, { makeAspectCrop, centerCrop, convertToPixelCrop } from 'react-image-crop'
import setCanvasPreview from "./setCanvasPreview";
import 'react-image-crop/dist/ReactCrop.css';
import { Icon } from "@iconify/react/dist/iconify.js";

const ASPECT_RATIO = 1  ;
const minDimension = 150;
const ImageCropper = ({handleToggleModal,handleSetImage, handleSetFile}) => {
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [imgURL, setImgURL] = useState('');
    const [crop, setCrop] = useState();
    const [imageError, setImageError] = useState('');


    const onSelectFile = (e) => {
        const file = e.target.files[0];
        if (!file) {return;}
          const reader = new FileReader();
          reader.addEventListener('load', () => {
            const myImage = new Image();
            const imgURL = reader.result?.toString() || '';
            myImage.src = imgURL;
            myImage.addEventListener('load', (e) => {
                if(imageError) setImageError(error);
                const {naturalHeight, naturalWidth} = e.currentTarget;
                if (naturalHeight < minDimension || naturalWidth < minDimension) {
                    setImageError('Image must be atleast 150px by 150px');
                    return setImgURL('');
                  
                }
            })
            setImgURL(imgURL);
            
          });
            reader.readAsDataURL(file);

    }

    const onImageLoad = (e) => {
        const {width, height} = e.currentTarget
        const cropWidthPercentange  = (minDimension / width) * 100;
         
        const crop = makeAspectCrop(
            {
            unit: '%',
            width: cropWidthPercentange,
            },
            ASPECT_RATIO,
            width,
            height,);
            const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);

    }


    // setCrop(percentCrop)
    const settingMyCrop = (percentCrop) => {
        setCrop(percentCrop);
        setCanvasPreview( imgRef.current, previewCanvasRef.current, convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height))

    }

    const saveCroppedImage = async()=>{
        await fetch(previewCanvasRef.current.toDataURL( 'image/webp', 0.5))
        .then((res) => res.blob())
        .then((blob) => {
            const builtFile  =  new File([blob], "childImage.jpeg", { type: "image/jpeg" });
            handleSetFile(builtFile);
            handleSetImage(previewCanvasRef.current.toDataURL('image/jpeg', 0.3));
            handleToggleModal();
        });

        
    }



  return (
    <>
        <label className="text-purple-400 hover:text-purple-800 cursor-pointer" htmlFor="pickImage">
            <span  className=""><Icon className="h-[150px] w-[150px]" icon="tabler:camera-plus"  /></span>
            <span className="sr-only ">Choose a photo</span>
            <input 
            className="hidden"
            id="pickImage"
            type="file"
            accept='image/*'
            onChange={onSelectFile}
             />
        </label>
        <div className="pb-5"></div>
        <div className="flex rounded-sm">
        {imageError && <p className="text-sm font-semibold text-red-500">{imageError}</p>}
        {imgURL && (
            <div className="flex flex-col items-center justify-center border-r-[2px] border-slate-600 bg-slate-900 min-w-[400px]">
                <ReactCrop
                    crop={crop}
                    keepSelection
                    onChange={(pixelCrop, percentCrop) => {settingMyCrop(percentCrop)}}
                    aspect={ASPECT_RATIO}
                    minWidth={minDimension}
                    circularCrop


                >
                    <img 
                    ref={imgRef}  
                    src={imgURL} 
                    alt="loaded Image" 
                    onLoad={onImageLoad} 
                    style={{maxHeight:'50vh'}} 
                    />
                </ReactCrop>
            </div>

        )}
        {crop && (
            <div className="w-full h-full flex flex-col justify-center items-center bg-slate-500 text-slate-300 py-7 min-w-[400px]">
            <h4>New Image look</h4>
            <canvas
            ref={previewCanvasRef}
            className="mt-4"
            style={{
                border:"2px solid rgb(83 83 83)",
                objectFit:"contain",
                borderRadius: "10px",
                width:300,
                height:300
            }}
            />
            <button 
            onClick={() => {
                saveCroppedImage();
            }}
            className={`secondaryBongoButton mt-4`}
            >save Image</button>
            </div>
        )}
        </div>
    </>
  )
}

export default ImageCropper