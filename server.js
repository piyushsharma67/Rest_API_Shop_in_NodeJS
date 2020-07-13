const http=require('http');
const express=require('express');
const index=require('./app')

const server=http.createServer(index);

server.listen(3000,()=>{
    console.log("server activated on port 3000");
});