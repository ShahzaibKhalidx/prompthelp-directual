import React, { useEffect, useState } from 'react'
import Table from '../components/table';


export default function MyPrompts() {

  return (
    <div className="content">
      <h1 className='text-blue-300 mb-4 text-sm font-bold'>My Saved Prompts</h1>
      <Table dataStructure="myprompts" endpoint="getMyprompts"/>
      
    </div>
  )
}