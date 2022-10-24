#!/usr/bin/env node

require("dotenv").config();
const server = require("express")();
const fetch = require("node-fetch");
const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 3000;
const TARGET = process.env.TARGET || "127.0.0.1:4000";

server.get("/", async (req, res) => {
	const payload = await fetch(`http://${TARGET}/recipes/42`);
	const producer_data = await payload.json();

	res.send({
		consumer_pid: process.pid,
		producer_data,
	});
});

server.listen(PORT, HOST, () => {
	console.log(`Consumer running at http://${HOST}:${PORT}/`);
});
