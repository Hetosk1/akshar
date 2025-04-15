const express = require("express");
const cors = require("cors");

const {initDatabase, userModel} = require('./schema/db');

const PORT = 3000;
const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',  // React development server
      'http://localhost:3001',  // Alternate port if needed
      'http://127.0.0.1:5173'   // Local IP variation
    ];

    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Accept',
    'Origin'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

// Apply CORS middleware
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

initDatabase();

app.get("/", (_request, _response) => {
    return _response.json({
        "Message": "Welcome to Akshar's backend"
    });
});

app.post("/file/:address", async (_request, _response) => {
    try { 
        const address = _request.params.address;
        const body = _request.body;

        console.log("Received POST request for address:", address);
        console.log("Received file ID:", body.fileId);

        // Attempt to update existing document
        const updatedDocument = await userModel.findOneAndUpdate(
            { address: address },
            { $addToSet: { files: body.fileId } },  // $addToSet prevents duplicate entries
            { new: true, upsert: true }  // Create document if not exists
        );

        return _response.status(200).json({
            message: "FileId saved successfully",
            user: updatedDocument
        });

    } catch(error) {
        console.error("Error in file upload:", error);
        return _response.status(500).json({
            error: "Internal server error",
            message: error.toString()
        });
    }
});

app.get("/file/:address", async (_request, _response) => {
    try {
        const address = _request.params.address.toLowerCase();
        
        console.log("Received GET request for address:", address);

        const user = await userModel.findOne({
            address: { 
                $regex: new RegExp(`^${address}$`, 'i') 
            }
        });

        console.log("Found user:", user);

        if (!user) {
            return _response.status(404).json({
                message: "No user found for this address",
                user: null
            });
        }

        return _response.json({
            user: user
        });
    } catch(error) {
        console.error("Error fetching user files:", error);
        return _response.status(500).json({
            error: "Internal server error",
            message: error.toString()
        });
    }
});

app.listen(PORT, () => {
    console.log(`Listening at port: ${PORT}`);
});