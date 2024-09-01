import React from 'react'
import ImageCropper from '../imageCropper/imageCropper'

const ImageForm = () => {
  return (
    <div>
        <h6>Upload an Image</h6>
        <div>
            <input type="file" accept="image/*" onChange={onSelectFile} />
        </div>

    </div>
  )
}

export default ImageForm