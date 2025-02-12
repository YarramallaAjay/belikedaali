// export async function useDebouncer(func:CallableFunction,delay:number){
//     const resp=setTimeout(()=>{
//         clearTimeout(delay)
//         try{
//             func()
//             return resp
//         }
//         catch(e){
//             console.error(e)
//         }
//     },delay)
// }