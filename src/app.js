import { Express } from "express"

const app = Express()


app.get('/saludo',(req,res)=>{
res.send("Hola Mundo")
})

app.listen(8080,()=>console.log("Servidior activado en puerto 8080"))