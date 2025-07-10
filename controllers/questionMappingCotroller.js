const db = require("../Model");
const { Op } = require("sequelize");
const questionMapping = db.questionMapping;
const questions = db.questions;
const mcqs = db.mcqs;
const answer = db.answer

const createQuestionMapping = async (req, res) => {
  const info = {
    paper_id: req.body.paper_id,
    question_id: req.body.question_id,
    mcqs_id: req.body.mcqs_id,
    section_id: req.body.section_id,
  };
  const mapping = await questionMapping.create(info);
  res.json({ code: 200, data: mapping });
};

const updateQuestionMapping = async (req, res) => {
  const mapping = await questionMapping.update(req.body);
  res.json(200).send(mapping);
};

const deleteQuestionMapping = async (req, res) => {
  const result = await questionMapping.destroy({
    where: {
      paper_id: req.body.paper_id,
      question_id: req.body.question_id
    }
  });
  res.json({code: 200, data: "Mapping deleted! "});
};

const deleteMCQMapping = async (req, res) => {
  const result = await questionMapping.destroy({
    where: {
      paper_id: req.body.paper_id,
      mcqs_id: req.body.mcq_id
    }
  });
  res.json({code: 200, data: "Mapping deleted! "});
};

const reviewQuestionMapping = async (req, res) => {
  const mapping = await questionMapping.findOne({
    where: { id: req.paramas.id },
  });
  res.json(200).send(mapping);
};


const path = require('path');
const fs = require('fs');

// Enhanced helper function to process image to base64
async function processImageToBase64(imageField, uploadsDir = path.resolve(__dirname, '../uploads')) {
    if (!imageField || 
        imageField === "null" || 
        imageField === null || 
        imageField.toString().trim() === "") {
        return null;
    }

    try {
        let filename = imageField.toString().trim();
        
        // Remove any path components if present
        filename = path.basename(filename);
        
        // Clean filename - remove query parameters if any
        filename = filename.split('?')[0];
        
        // Validate extension
        const ext = path.extname(filename).toLowerCase();
        if (!ext) {
            console.log(`No extension found for file: ${filename}`);
            return null;
        }

        // Check valid image extensions
        const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];
        if (!validExtensions.includes(ext)) {
            console.log(`Invalid image extension: ${ext} for file: ${filename}`);
            return null;
        }

        const imagePath = path.join(uploadsDir, filename);

        if (!fs.existsSync(imagePath)) {
            console.log(`File not found: ${filename}`);
            
            // Try case-insensitive search
            const files = fs.readdirSync(uploadsDir);
            const foundFile = files.find(f => f.toLowerCase() === filename.toLowerCase());
            
            if (foundFile) {
                console.log(`Found case-insensitive match: ${foundFile}`);
                filename = foundFile; // Use the correct case version
            } else {
                return null;
            }
        }

        // Read and convert image
        const imageBuffer = fs.readFileSync(path.join(uploadsDir, filename));
        if (imageBuffer.length === 0) {
            console.log(`Empty file: ${filename}`);
            return null;
        }

        // Determine MIME type based on extension
        const mimeTypes = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.webp': 'image/webp',
            '.bmp': 'image/bmp'
        };

        const mimeType = mimeTypes[ext] || 'image/jpeg';
        const base64Data = imageBuffer.toString('base64');
        return `data:${mimeType};base64,${base64Data}`;

    } catch (err) {
        console.error(`Error processing image ${imageField}:`, err);
        return null;
    }
}

const reviewQuestionsByPaperID = async (req, res) => {
    try {
        const mapping = await questionMapping.findAll({
            where: { paper_id: req.body.paper_id },
            include: [{ model: questions, required: true }],
        });

        const transformedData = await Promise.all(mapping.map(async (item) => {
            const plainItem = item.toJSON();
            const questionImageBase64 = await processImageToBase64(plainItem.question.image);
            
            return {
                ...plainItem,
                id: plainItem.question.id,
                name: plainItem.question.name,
                marks: plainItem.question.marks,
                image: questionImageBase64 || plainItem.question.image, // fallback to original if conversion fails
                original_image: plainItem.question.image // keep original for reference
            };
        }));

        res.json({
            code: 200,
            data: transformedData,
            message: "Mappings retrieved successfully",
        });

    } catch (error) {
        console.error("Error in reviewQuestionsByPaperID:", error);
        res.status(500).json({ code: 500, message: "Internal Server Error" });
    }
};

const reviewQuestionsWithAnswerByPaperID = async (req, res) => {
    try {
        const mapping = await questionMapping.findAll({
            where: { paper_id: req.body.paper_id },
            include: [{ 
                model: questions, 
                required: true,
                include: [{ model: answer, required: true }]
            }],
        });

        const transformedData = await Promise.all(mapping.map(async (item) => {
            const plainItem = item.toJSON();
            const questionImageBase64 = await processImageToBase64(plainItem.question.image);
            const answerImageBase64 = plainItem.question.answers[0]?.image 
                ? await processImageToBase64(plainItem.question.answers[0].image)
                : null;
            
            return {
                ...plainItem,
                id: plainItem.question.id,
                name: plainItem.question.name,
                marks: plainItem.question.marks,
                image: questionImageBase64 || plainItem.question.image,
                answer: answerImageBase64 || plainItem.question.answers[0]?.answer,
                answer_image: answerImageBase64 ? true : false,
                original_image: plainItem.question.image,
                original_answer: plainItem.question.answers[0]?.answer,
                answers: undefined,
                question: undefined
            };
        }));

        res.json({
            code: 200,
            data: transformedData,
            message: "Mappings retrieved successfully",
        });

    } catch (error) {
        console.error("Error in reviewQuestionsWithAnswerByPaperID:", error);
        res.status(500).json({ code: 500, message: "Internal Server Error" });
    }
};

const reviewMCQsByPaperID = async (req, res) => {
    try {
        const mapping = await questionMapping.findAll({
            where: { paper_id: req.body.paper_id },
            include: [{ model: mcqs, required: true }],
        });

        const transformedData = await Promise.all(mapping.map(async (item) => {
            const plainItem = item.toJSON();
            // Process both the question image (name field) and the image field
            const mcqImageBase64 = await processImageToBase64(plainItem.mcq.image);
            
            return {
                ...plainItem,
                id: plainItem.mcq.id,
                name: plainItem.mcq.name,
                image: mcqImageBase64 || plainItem.mcq.image, // fallback to original if conversion fails
                choice1: plainItem.mcq.choice1, // remains as text
                choice2: plainItem.mcq.choice2, // remains as text
                choice3: plainItem.mcq.choice3, // remains as text
                choice4: plainItem.mcq.choice4, // remains as text
                answer: plainItem.mcq.answer,   // remains as text
                original_name: plainItem.mcq.name,
                original_image: plainItem.mcq.image, // keep original for reference
                mcq: undefined
            };
        }));

        res.json({
            code: 200,
            data: transformedData,
            message: "Mappings retrieved successfully",
        });

    } catch (error) {
        console.error("Error in reviewMCQsByPaperID:", error);
        res.status(500).json({ code: 500, message: "Internal Server Error" });
    }
};
  

const reviewPastPaperQuestions = async (req, res) => {
  const mapping = await questionMapping.findAll({
    where: { question_id: req.body.question_id },
  });
  res.json(200).send(mapping);
};

module.exports = {
  createQuestionMapping,
  updateQuestionMapping,
  deleteQuestionMapping,
  deleteMCQMapping,
  reviewQuestionsByPaperID,
  reviewQuestionsWithAnswerByPaperID,
  reviewMCQsByPaperID,
  reviewPastPaperQuestions,
  reviewQuestionMapping,
};
