"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {

  const [slug,setSlug]=useState("")
  const router=useRouter();

  return (
    <>
    <input type="text" placeholder="slug"  value={slug} onChange={(e)=>{
      setSlug(e.target.value)
      console.log("slug:"+slug)
    }}></input>

    <button onClick={ () => {
      // console.log("slug in button:"+slug)
       router.push(`/room/${slug}`);
    }}>Join Room</button>
    </> );
}

