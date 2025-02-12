import axios from "axios";
import { BACKEND_URL } from "../config";

interface Shape {
    type: string;
    x: number;
    y: number;
    width?: number;
    height?: number;
    radius?: number;
    depth?: number;
    strokeColor: string;
    fillColor: string;
    opacity: number;
    strokeWidth: number;
}

interface DrawConfig {
    strokeColor: string;
    fillColor: string;
    opacity: number;
    strokeWidth: number;
}

export async function initDraw(canvas: HTMLCanvasElement, socket: WebSocket, roomId: string) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let defaultConfig: DrawConfig = {
        strokeColor: "white",
        fillColor: "black",
        opacity: 1,
        strokeWidth: 2
    };
    let userConfig = { ...defaultConfig };

    let ExistingShapes: Shape[] = await getExistingShapes(roomId);
    drawShapes(ExistingShapes, ctx);

    document.addEventListener("change", (e) => {
        const target = e.target as HTMLInputElement;
        if (!target) return;
        if (target.id === "strokeColor") userConfig.strokeColor = target.value;
        if (target.id === "fillColor") userConfig.fillColor = target.value;
        if (target.id === "opacity") userConfig.opacity = parseFloat(target.value);
        if (target.id === "strokeWidth") userConfig.strokeWidth = parseInt(target.value);
    });

    let dragging = false;
    let startX = 0, startY = 0;
    let selectedShape: Shape | null = null;
    let shapeType = "rect";

    canvas.addEventListener("mousedown", (e) => {
        startX = e.clientX;
        startY = e.clientY;
        selectedShape = getClickedShape(startX, startY, ExistingShapes);
        dragging = true;
    });

    canvas.addEventListener("mousemove", (e) => {
        if (!dragging) return;
        if (selectedShape) {
            selectedShape.x = e.clientX;
            selectedShape.y = e.clientY;
            drawShapes(ExistingShapes, ctx);
        }
    });

    canvas.addEventListener("mouseup", () => {
        dragging = false;
        selectedShape = null;
    });
}

function drawShapes(shapes: Shape[], ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    shapes.forEach(shape => {
        ctx.globalAlpha = shape.opacity;
        ctx.strokeStyle = shape.strokeColor;
        ctx.fillStyle = shape.fillColor;
        ctx.lineWidth = shape.strokeWidth;
        if (shape.type === "rect") {
            ctx.strokeRect(shape.x, shape.y, shape.width!, shape.height!);
            ctx.fillRect(shape.x, shape.y, shape.width!, shape.height!);
        } else if (shape.type === "circle") {
            ctx.beginPath();
            ctx.arc(shape.x, shape.y, shape.radius!, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fill();
        }
    });
}

function getClickedShape(x: number, y: number, shapes: Shape[]): Shape | null {
    return shapes.find(shape => 
        x >= shape.x && x <= shape.x + (shape.width || shape.radius! * 2) &&
        y >= shape.y && y <= shape.y + (shape.height || shape.radius! * 2)
    ) || null;
}

async function getExistingShapes(roomId: string) {
    try {
        const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
        return response.data.map((x: any) => JSON.parse(x.message));
    } catch (e) {
        console.log(e);
        return [];
    }
}
