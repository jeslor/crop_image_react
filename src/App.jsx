import React from 'react'
import ImageForm from './commponets/imageForm/imageForm'
import ImageCropper from './commponets/imageCropper/imageCropper'

const App = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className='text-4xl font-bold py-8'>Image Cropper</h1>
      <ImageForm />
    </div>
  )
}

export default App