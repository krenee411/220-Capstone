import React from 'react'
import MemoriesForm from '../MemoriesForm/MemoriesForm.js'
import Memories from '../Memories/Memories.js'

export default function MemoriesDisplay() {
  return (
    <div>
        <h1>Memories</h1>
        <p>Welcome to the Pensacoola Memories page!!!</p>

        <MemoriesForm/>
        <Memories/>

        </div>
  )
}
