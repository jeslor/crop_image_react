import React, { useState } from 'react'
import ImageForm from './commponets/imageForm/imageForm'

const App = () => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState('');

  const handleSetImage = (image) => {
    setImages([...images, image]);    
  }

  const handleSetFile = (file) => {
    setFile(file);
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className='text-4xl font-bold py-8'>Image Cropper</h1>
      <ImageForm handleSetFile={handleSetFile} handleSetImage={handleSetImage}/>
      {
        images.length &&(
          <div className="w-full pt-7 bg-[rgba(0,0,0,0.8)] rounded-t-3xl">
            <h2 className="pl-8 font-semibold text-2xl text-slate-100">Cropped Images</h2>
            <div className="flex px-8 flex-wrap gap-4 pb-8 pt-4">
              {images.map((image, index) => (
                <img key={index} src={image} alt="cropped" className="h-[150px] w-[150px] rounded-md"/>
              ))}
            </div>
          </div>
        )
      }
    </div>
  )
}

export default App