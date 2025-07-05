const express = require('express')
const router = require('./router')
const path = require('path');
const fs = require('fs');

const app = express()
const cors = require('cors')
app.use(cors());
app.use(express.json())

// Serve static files with proper MIME types
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
    setHeaders: (res, path) => {
        const ext = path.extname(path).toLowerCase();
        const mimeTypes = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.webp': 'image/webp'
        };
        const mimeType = mimeTypes[ext];
        if (mimeType) {
            res.setHeader('Content-Type', mimeType);
            res.setHeader('Cache-Control', 'public, max-age=31536000');
            res.setHeader('Access-Control-Allow-Origin', '*');
        }
    }
}));

// Specific route for serving images with better error handling
app.get('/uploads/:filename', (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, 'uploads', filename);
    
    if (fs.existsSync(imagePath)) {
        const ext = path.extname(filename).toLowerCase();
        const mimeTypes = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.webp': 'image/webp'
        };
        const mimeType = mimeTypes[ext] || 'application/octet-stream';
        
        res.setHeader('Content-Type', mimeType);
        res.setHeader('Cache-Control', 'public, max-age=31536000');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.sendFile(imagePath);
    } else {
        res.status(404).send('Image not found');
    }
});

app.use('/uploads/questions', express.static(path.join(__dirname, 'uploads/questions'), {
    setHeaders: (res, path) => {
        const ext = path.extname(path).toLowerCase();
        const mimeTypes = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.webp': 'image/webp'
        };
        const mimeType = mimeTypes[ext];
        if (mimeType) {
            res.setHeader('Content-Type', mimeType);
        }
    }
}));

app.use("/Examination",router)

app.listen(3000, ()=>{
    console.log("server is running on port 3000")
})