interface Shape{
    type:string
    x:number
    y:number
    width:number
    height:number
}


export function initDraw(canvas:HTMLCanvasElement){
    const ctx = canvas.getContext('2d');
    if(!ctx){
        return
    }
    ctx.fillStyle="rgba(0,0,0)"
    ctx.fillRect(0,0,canvas.width,canvas.height)

    const ExistingShapes:Shape[]=[]

    let clicked:boolean=false
    let startx:number=0
    let starty:number=0

    canvas.addEventListener("mousedown",(e)=>{
      
        clicked=true
        console.log("canvas clicked")
        console.log(e.clientX)
        console.log(e.clientY)
        startx=e.clientX;
        starty=e.clientY;
    })

    canvas.addEventListener("mouseup",(e)=>{
        clicked=false
        console.log(e.clientX)
        console.log(e.clientY)
        const width=e.clientX-startx
        const height=e.clientY-starty 

        ExistingShapes.push({
            type:"rect",
            x:startx,
            y:starty,
            width,
            height
        })
    })

    canvas.addEventListener("mousemove",(e)=>{
        if(clicked){
            console.log("drawing")
            const width=e.clientX-startx
            const height=e.clientY-starty 
            clearCanvas(ExistingShapes,canvas,ctx)
            ctx.strokeStyle="rgba(255,255,255)"
            ctx.strokeRect(startx,starty,width,height)
            
        }
    })

}

function clearCanvas(ExistingShapes:Shape[],canvas:HTMLCanvasElement, ctx:CanvasRenderingContext2D){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle="rgba(0,0,0)"
    ctx.fillRect(0,0,canvas.width,canvas.height)

    ExistingShapes.map(shape=>{
        if(shape.type==="rect"){
            ctx.strokeStyle="rgba(255,255,255)"
            ctx.strokeRect(shape.x,shape.y,shape.width,shape.height)

        }
    })


}