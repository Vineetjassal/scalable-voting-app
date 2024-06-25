"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const ioredis_1 = require("ioredis");
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const redis = new ioredis_1.Redis(process.env.REDIS_CONNECTION_STRING);
const subRedis = new ioredis_1.Redis(process.env.REDIS_CONNECTION_STRING);
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    },
});
subRedis.on("message", (channel, message) => {
    io.to(channel).emit("room-update", message);
});
subRedis.on("error", (err) => {
    console.error("Redis subscription error", err);
});
io.on("connection", async (socket) => {
    const { id } = socket;
    socket.on("join-room", async (room) => {
        console.log("User joined room:", room);
        const subscribedRooms = await redis.smembers("subscribed-rooms");
        await socket.join(room);
        await redis.sadd(`rooms:${id}`, room);
        await redis.hincrby("room-connections", room, 1);
        if (!subscribedRooms.includes(room)) {
            subRedis.subscribe(room, async (err) => {
                if (err) {
                    console.error("Failed to subscribe:", err);
                }
                else {
                    await redis.sadd("subscribed-rooms", room);
                    console.log("Subscribed to room:", room);
                }
            });
        }
    });
    socket.on("disconnect", async () => {
        const { id } = socket;
        const joinedRooms = await redis.smembers(`rooms:${id}`);
        await redis.del(`rooms:${id}`);
        joinedRooms.forEach(async (room) => {
            const remainingConnections = await redis.hincrby(`room-connections`, room, -1);
            if (remainingConnections <= 0) {
                await redis.hdel(`room-connections`, room);
                subRedis.unsubscribe(room, async (err) => {
                    if (err) {
                        console.error("Failed to unsubscribe", err);
                    }
                    else {
                        await redis.srem("subscribed-rooms", room);
                        console.log("Unsubscribed from room:", room);
                    }
                });
            }
        });
    });
});
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log("Server is running at:", PORT);
});
//# sourceMappingURL=index.js.map