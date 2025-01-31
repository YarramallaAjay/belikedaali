import axios from "axios"
import { BACKEND_URL } from "../../../config"
import { Chats } from "../../components/Chats"

async function getRooms(url:string){
    try{
        const room=await axios.get(url)

    return room.data

    }catch(e){
        console.log(e)
    }
    
}

type PageProps={
    params:Promise<{
        slug:string
    }>
}
export default async function ChatRoom({params}:PageProps
        
    
){
    const slug= (await params).slug
    const url=`${BACKEND_URL}/room/${slug}`
    // console.log(url)

    const room= await getRooms(url)

    // console.log(room)
    

    return <>
    <Chats id={room.id as unknown as string}></Chats>

    </>

}