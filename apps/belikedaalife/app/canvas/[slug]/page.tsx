
import {  BACKEND_URL, WS_URL } from "@/app/config";
import RoomCanvas from "@/app/draw/RoomCanvas";
import axios from "axios";
import {  useState } from "react";

interface PageProps{
    params:Promise<{
        slug:string
    }>
}
export default async function Canvas({params}:PageProps){

    const slug=(await params).slug
    console.log(slug)

    

    return (
        <div>
            <RoomCanvas slug={slug} />
        </div>
    )
}