"use strict";
import * as dotenv from "dotenv";
import assert from "assert";
dotenv.config();

const { PORT, HOST, HOST_URL, FIREBASE_SERVICE_KEY } = process.env;

assert(PORT, "Port is required");
assert(HOST, "Host is required");

const configs = {
  port: PORT,
  host: HOST,
  url: HOST_URL,
  serviceAccount: FIREBASE_SERVICE_KEY,
};

export default configs;
