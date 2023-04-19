const express=require('express')
const { Pool } = require('pg');
const app=express()
const cors=require('cors')
app.use(express.json())
app.use(cors({}))
//------------------------------------------------------------
const pool=new Pool({
    user: "postgres",
    host: "localhost",
    database: "worldline",
    password: "12345678",
    port: 5432
});
//---------------------------------------------------------
app.post('/',async(req,res)=>{
    const info=req.body
    console.log(info)
    try{
        const newData = await pool.query((" insert into registrations (name,email,pno,sex,qualification,dob,joindate) values($1,$2,$3,$4,$5,$6,$7) RETURNING (name)"),
        [info.name,info.email,info.pno,info.sex,info.qualification,info.dob,info.joindate])
        console.log(newData.rows)
    }
    catch(err){
        console.log(err.message)
        res.json(err.message)
    }
})
//----------------------------------------------------------
app.get('/', async (req, res) => {
    try {
        const records = await pool.query('SELECT * FROM registrations');
        console.log(records.rows)
        res.json(records.rows);
    } catch (err) {
        console.error(err.message);
        res.json(err.message);
    }
});
//--------------------------------------------------------
app.listen(4000,()=>
{
    pool.connect(()=>{
        console.log("database connected !")
    })
    console.log("server running !")
})