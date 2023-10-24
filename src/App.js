import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const fileInputRef = useRef()
  const [selectedFile, setSelectedFile] = useState()
  const [displayError, setDisplayError] = useState(null)

  useEffect(() => {
    setDisplayError(null)
  }, [])

  useEffect(() => {
    console.log(selectedFile)
  }, [selectedFile])

  const onSubmit = (ev) => {
    ev.preventDefault()
    if (!fileInputRef.current.files.length)
      return setDisplayError('Choose a file to be read!')
    const fileName = fileInputRef.current.files[0]?.name.toLowerCase()
    if (!fileName.endsWith('.json'))
      return setDisplayError('Invalid file. Please load a valid JSON file.')
    const reader = new FileReader()
    reader.addEventListener('load', (event) => {
      console.log(event.target.result)
    })
    reader.readAsText(fileInputRef.current.files[0])

    return setDisplayError(null)
  }

  return (
    <div className="App">
      <div className="Intro">
        <h1> Json Tree Viewer </h1>
        <p>Simple JSON Viewer that runs completely on-client. No data exchange</p>

        {selectedFile && <p>{selectedFile}</p>}

        <form className="file-form" onSubmit={onSubmit}>
          <label htmlFor="input-file">Load Json</label>
          <input type="file" name="file" id="input-file" ref={fileInputRef} onChange={() => setSelectedFile(fileInputRef.current?.files[0].name)} />

          <button type="submit" className="submit-button">
            Confirm
          </button>

          <p className="file-error">{displayError}</p>

        </form>
      </div>
    </div >
  )
}

export default App
