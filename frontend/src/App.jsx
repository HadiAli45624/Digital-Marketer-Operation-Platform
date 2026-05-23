import {useState } from "react"

function App()
{
  const [prname, setPrname] = useState('')
  const [prindustry, setPrindustry] = useState('')
  const [prplatform, setPrplatform] = useState('')
  const [prnum, setPrnum] = useState('')
  const [prtype, setPrtype] = useState('')

  async function handleGenerate()
  {
    console.log("hello")
    const response = await fetch("http://127.0.0.1:5000/copycrafter", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name: prname, industry: prindustry, platform: prplatform, numberofcopies: prnum, type: prtype})
    })
    const data = await response.json()
    console.log(data)
  }

  return (
    <div>
    <h1>CopyCrafter</h1>
    <input type="text" value={prname} onChange={(e) => setPrname(e.target.value)} placeholder="ProductName" />
    <input type="text" value={prindustry} onChange={(e) => setPrindustry(e.target.value)} placeholder="IndustryName" />
    <input type="text" value={prplatform} onChange={(e) => setPrplatform(e.target.value)} placeholder="PlatformName" />
    <input type="text" value={prnum} onChange={(e) => setPrnum(e.target.value)} placeholder="NumberofCopies" />
    <input type="text" value={prtype} onChange={(e) => setPrtype(e.target.value)} placeholder="TypeName" />
    <button onClick={handleGenerate}>Generate</button>
    
    </div>
  )
}

export default App