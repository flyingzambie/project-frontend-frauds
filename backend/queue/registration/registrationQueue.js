import { Queue, Worker } from "bullmq";
import config from "../../config/index.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// redis connection
const connection = {
    host: config.REDIS_HOST,
    port: config.REDIS_PORT,
    password: config.REDIS_PASSWORD,
};

// dirname problem: https://stackoverflow.com/questions/8817423/why-is-dirname-not-defined-in-node-repl
const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

// retrieve processor in order sandbox it
const processorFile = path.join(_dirname, "registrationProcessor.cjs");

// define worker
export const registrationWorker = new Worker("registrationQueue", processorFile, {
    connection,
});

// queue for registration
export const registrationQueue = new Queue("registrationQueue", { connection });
