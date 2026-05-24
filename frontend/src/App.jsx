import {useState } from "react"
import ReactMarkdown from "react-markdown"

function App()
{
  const [prname, setPrname] = useState('')
  const [prindustry, setPrindustry] = useState('')
  const [prplatform, setPrplatform] = useState('')
  const [prnum, setPrnum] = useState('')
  const [prtype, setPrtype] = useState('')
  const [copies, setCopies] = useState([])

  // async function handleGenerate()
  // {
  //   const response = await fetch("http://127.0.0.1:5000/copycrafter", {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({name: prname, industry: prindustry, platform: prplatform, numberofcopies: prnum, type: prtype})
  //   })
  //   const data = await response.json()

  //   const splitCopies = data.copies.split('###COPY_END###').filter(copy => copy.trim() !== '')
  //   setCopies(splitCopies)
  // }

  async function handleGenerate() {
  const fakeData = "**Hook**\nTest copy 1\n###COPY_END###\n**Hook**\nTest copy 2\n###COPY_END###"
  const splitCopies = fakeData.split('###COPY_END###').filter(copy => copy.trim() !== '')
  setCopies(splitCopies)
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
    
    {copies.map((copy, index) => (<ReactMarkdown key={index}>{copy}</ReactMarkdown>))}
    </div>
  )
}

export default App