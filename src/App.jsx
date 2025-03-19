import { useState } from 'react'
import './App.css'
import DataTable from './components/DataTable'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='px-3 py-5'>
        <h2 className='text-5xl font-bold text-blue-950'>Nhóm 6 - Thứ 4 - Ca 1</h2>
        <DataTable/>
      </div>
    </>
  )
}

export default App
