import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const fileInputRef = useRef()
  const jsonRef = useRef()
  const [selectedFile, setSelectedFile] = useState()
  const [displayError, setDisplayError] = useState(null)

  useEffect(() => {
    setDisplayError(null)
  }, [])

  useEffect(() => {
    console.log(selectedFile)
  }, [selectedFile])

  const getFinalContent = formattedContent => {
    if (formattedContent.length < 50 || typeof (formattedContent) == 'number') {
      return `<span>${formattedContent}</span>`;
    }
    return `<span class="clickable" style="cursor: pointer">+</span><pre style="display:none">${formattedContent}</pre>`;
  }

  const jsonToHTML = json => {
    const display = 'block'
    const htmlArray = [`<ul style="display:${display}">`]

    for (let [key, value] of Object.entries(json)) {
      if (typeof (value) === 'object' && Object.keys(value).length > 0) {
        htmlArray.push(`<li>${key}:<span class="clickable" style="cursor: pointer">+</span>`)
        htmlArray.push(jsonToHTML(value))

      } else {
        let content

        if (Array.isArray(value)) {
          content = '[]'
        } else if (typeof (value) === 'object') {
          content = '{}'

        } else {
          const formattedContent = value
          content = getFinalContent(formattedContent)
        }

        htmlArray.push(`<li>${key}: ${content}</li>`)
      }
    }
    htmlArray.push('</ul>')
    return htmlArray.flat().join('')
  }

  const onSubmit = (ev) => {
    ev.preventDefault()
    if (!fileInputRef.current.files.length)
      return setDisplayError('Choose a file to be read!')
    const fileName = fileInputRef.current.files[0]?.name.toLowerCase()
    if (!fileName.endsWith('.json'))
      return setDisplayError('Invalid file. Please load a valid JSON file.')
    const reader = new FileReader()
    reader.addEventListener('load', (event) => {
      const jsonContent = JSON.parse(event.target.result)

      console.log(jsonToHTML(jsonContent))

      jsonRef.current.innerHTML = jsonToHTML(jsonContent) 
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
        
          <p ref={jsonRef}>testets<br/>testetste</p>

        </form>
      </div>
    </div >
  )
}

export default App
