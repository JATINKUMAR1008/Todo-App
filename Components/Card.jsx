import React from 'react'
import { IoMdCheckmarkCircleOutline,IoMdTrash } from "react-icons/io"
import { db } from '../config/Firebase'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { userInfo } from '../fetchUser' 
const Card = ({prop,getData}) => {
   
  const deleteData =() =>{
    
    const doc1 = doc(db,`${userInfo()[0].email}`,`${prop?.obj?.id}`)
    deleteDoc(doc1)
    getData()
  }
  const update = ()=>{
    if(prop?.obj?.status){
      const field = {status: false}
    const doc1 = doc(db,`${userInfo()[0].email}`,`${prop?.obj?.id}`)
    updateDoc(doc1,field)
    }else{
      const field = {status: true}
      const doc1 = doc(db,`${userInfo()[0].email}`,`${prop?.obj?.id}`)
      updateDoc(doc1,field)
    }
    getData()

  }

  
  
  
    return (
      
    <div className='p-2 flex  '>
      <div className='flex justify-center items-center w-screen'>
      <div className={prop?.obj?.status?'bg-green-500 shadow-md w-[15rem] py-6 hover:scale-105 duration-300 rounded-xl':'bg-white shadow-md w-[15rem] py-3 hover:scale-105 duration-300 rounded-xl'}>
        <div className='flex justify-between items-center'>
          <div className='p-3 ml-4'>
            {prop.obj.task}
          </div>
          <div className='mr-5 flex gap-2'>
            <IoMdCheckmarkCircleOutline size={25} className={prop?.obj?.status?"text-white cursor-pointer":"text-green-500 cursor-pointer"} onClick={update}/>
            <IoMdTrash size={25} className={prop?.obj?.status?"cursor-pointer hover:text-blue-600 text-white":"cursor-pointer hover:text-blue-600"} onClick={deleteData}/>
          </div>
        </div>

      </div>
      </div>
    </div>
  )
}

export default Card