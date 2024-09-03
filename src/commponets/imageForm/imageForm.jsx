import React from 'react'
import ImageCropper from '../imageCropper/imageCropper'

const ImageForm = ({handleSetFile, handleSetImage}) => {
   

  return (
    <div className='flex flex-col items-center'>
        <h6 className="opacity-65 font-medium">Upload an Image</h6>
       <ImageCropper handleSetFile={handleSetFile} handleSetImage={handleSetImage}/>
    </div>
  )
}

export default ImageForm