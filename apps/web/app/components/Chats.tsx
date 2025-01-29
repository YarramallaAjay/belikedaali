import axios from "axios";
import { BACKEND_URL } from "../../config";
import { ChatRoomClient } from "./ChatRoomClient";


async function getChats(url:string)
{
    try{
        // console.log(url)
        const chats=await axios.get(url)

        

    return chats.data

    }
    catch(e){
        console.log(e)
    }
    
}
export async function Chats({id}:{id:string,
   
}){

    if(!id){
        console.log("id null")
        return null;
    }

    const url=`${BACKEND_URL}/chats/${id}`
    // console.log(url)

    const chats= await getChats(url)
    
    console.log(chats)

    return <>
    <ChatRoomClient  messages={chats} id={id} ></ChatRoomClient>
    </>



}