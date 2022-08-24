import React, { useState, useEffect } from "react";
import { accessToken, userInfo } from "../fetchUser";
import { useRouter } from "next/router";
import { AiOutlinePlusCircle, AiOutlineUser } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { addDoc, collection, deleteDoc, getDocs } from "firebase/firestore"
import { db } from '../config/Firebase'
import Image from "next/image";
import Card from "../Components/Card";
const Todo = () => {
  const router = useRouter();
  const signOut = () => {
    router.push("/");
    localStorage.clear();
    
  };
  const [user, setUser] = useState({});
  const [avtar, setAvtar] = useState(false);
  const [task, setTask] = useState("");
  const [list,setList] = useState([])
  
  
    
        const getData = async()=>{
          const setRef =
        collection(db,`${(userInfo())[0]?.email}`)
        const data = await getDocs(setRef)
        setList(data.docs?.map((doc)=>({...doc.data(),id:doc.id})))
  }

  const createData = async()=>{
    const setRef =
        collection(db,`${(userInfo())[0]?.email}`)
    if(task !== ""){
        await addDoc(setRef,{
            task,
            status:false,
        })
        setTask("")
    }
    getData()
  }

  
  useEffect(() => {
    const access = accessToken();
    if (!access) return router.push("/");
    const [info] = userInfo()
    setUser(info)
    getData()
  }, []);
  
  return (
    <div className="bg-red-300 w-screen h-screen overflow-y-hidden p-1">
      <div className=" text-xl text-white p-2 flex justify-center items-center text-center w-screen font-bold fixed h-[10rem]">
        TODO APP
      </div>
      <div
        className={
          avtar
            ? "flex justify-center items-center w-full h-[20rem] fixed p-3"
            : "flex justify-center items-center w-full h-[20rem] fixed p-3"
        }
      >
        <div className="bg-white w-[30rem]  height-[20rem] rounded-xl py-4 px-3 flex justify-between items-center gap-6">
          <div className="flex flex-col">
            <Image
              src={user.photoURL}
              width={"50px"}
              height={"50px"}
              className="rounded-full cursor-pointer"
              onClick={() => setAvtar(!avtar)}
            />
          </div>

          <input
            placeholder="Enter Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full h-full outline-none text-xl "
          />
          <AiOutlinePlusCircle
            size={30}
            className="hover:scale-105 cursor-pointer hover:text-blue-500 duration-300 "
            onClick={createData}
          />
          <FiLogOut size={30} className="hover:scale-105 cursor-pointer hover:text-blue-500 duration-300 "
            onClick={signOut}
          />
        </div>
        
      </div>
      <div className="top-[15rem] relative overflow-y-scroll scrollbar-hide h-[30rem] ">
        {list.map((obj)=>(
          <Card key={obj.id} prop={{obj}} getData={getData}/>
        ))}
      </div>
      
    </div>
  );
};

export default Todo;
