import { useState } from 'react'
import './App.css'
import DataTable from './components/DataTable'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='px-3 py-5'>
        <DataTable/>
      </div>
    </>
  )
}

export default App
