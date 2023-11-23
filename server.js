const express = require('express')
const app = express()
const port = 3333
const { checkDBConnection } = require('./batabase')
const cors =require('cors')
app.use(cors())
app.use(express.json())
// app.param()
app.use('/posts/')
app.use('/todos/')
app.use('/users/')
app.use('/login/')

app.get('/', (req, res) => res.send('Hello World!'))
const connection = checkDBConnection()




if(connection){
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
} else{
    console.log('Error al conectar a la base de datos')
}
