const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const {initDatabase, userModel} = require('./schema/db');

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

initDatabase();

app.get("/", (_request, _response) => {

    return _response.json({
        "Message": "Welcome to the Akshar API"
    });

});

app.post("/file/:address", async (_request, _response)=>{
    
    try{ 

        const address = _request.params.address;
        const body = _request.body;

        const updatedDocument = await userModel.findOneAndUpdate(
            {address: address},
            {$push: {files: body.fileId}},
            {new: true}
        );

        if(updatedDocument){
            return _response.status(200).json({
                "message": "FileId saved to user"
            });
        } else {
            const newUser = await userModel.insertOne({
                address: address,
                files: [body.fileId]
            });

            return _response.json({
                "message": "File Id saved by creating new user"
            });
        }

    } catch(_error) {

        return _response.json({
            error: _error
        });

    }

});

app.get("/file/:address", async (_request, _response)=> {
    
    try{
        const address = _request.params.address;
        const user = await userModel.findOne({
            address: address
        });
        return _response.json({
            user 
        });
    } catch(_error){
        return _response.json({
            _error
        });
    }
});

app.listen(PORT, () => {
    console.log(`Listening at port: ${PORT} `);
});
