import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const fileInputRef = useRef()
  const [selectedFile, setSelectedFile] = useState()
  const [displayError, setDisplayError] = useState()

  useEffect(() => {
    setDisplayError(false)
  }, [])  

  const onSubmit = (ev) => {
    ev.preventDefault()
    const fileName = fileInputRef.current.files[0].name.toLowerCase()
    if (fileName.endsWith('.json')) {
      setDisplayError(false)
    }
    else
      setDisplayError(true)
  }

  useEffect(() => {
    console.log(selectedFile)
  }, [selectedFile])

  return (
    <div className="App">
      <div className="Intro">
        <h1> Json Tree Viewer </h1>
        <p>Simple JSON Viewer that runs completely on-client. No data exchange</p>

        {selectedFile && <p>{selectedFile}</p>}

        <form className="file-form" onSubmit={onSubmit}>
          <label for="input-file">Load Json</label>
          <input type="file" name="file" id="input-file" ref={fileInputRef} onChange={() => setSelectedFile(fileInputRef.current?.files[0].name)}/>

          <button type="submit" className="submit-button">
            Confirm
          </button>

          {displayError && <p className="file-error">Invalid file. Please load a valid JSON file.</p>}

        </form>
      </div>
    </div >
  )
}

export default App
