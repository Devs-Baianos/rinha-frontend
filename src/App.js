import './App.css'

function App() {


  return (
    <div className="App">
      <div className="Intro">
        <h1> Json Tree Viewer </h1>
        <p>Simple JSON Viewer that runs completely on-client. No data exchange</p>

        <form className="file-form" onsubmit="">
          <label for="input-file">Load Json</label>
          <input type="file" name="file" id="input-file" />
          
          <button type="submit" className="submit-button">
            Confirm
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
