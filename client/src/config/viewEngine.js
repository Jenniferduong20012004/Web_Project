import express from "express";
let configViewengine = (app) =>{
    app.use (express.static ("./src"));
    app.set ("view engine", "ejs");
    app.set ("views", "./src/views")
}
module.exports = configViewengine;