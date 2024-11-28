const express = require("express"); // Import express
const router = express.Router(); // Create a router instance
const Treatment = require("../Model/treatments");
const cors = require("cors");

const treatment = express();

//Middleware
treatment.use(cors());

// Add data to the database
router.post("/add", async (req, res) => {
    const { name, description, benefit, duration } = req.body; 

    const newTreatment = new Treatment({
        name,
        description,
        benefit,
        duration
    });

    try {
        await newTreatment.save();
        res.json({ status: "Treatment Added" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error adding treatment", error: err.message });
    }
});

// Read all treatments from the database
router.get("/", async (req, res) => {
    try {
        const treatments = await Treatment.find();
        res.json(treatments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error fetching treatments", error: err.message });
    }
});

// Update a specific treatment in the database
router.put("/update/:id", async (req, res) => {
    const userId = req.params.id;
    const { name, description, benefit, duration } = req.body;

    const updateTreatment = {
        name,
        description,
        benefit,
        duration
    };

    try {
        await Treatment.findByIdAndUpdate(userId, updateTreatment, { new: true });
        res.status(200).json({ status: "Treatment Updated" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error updating treatment", error: err.message });
    }
});

// Delete a specific treatment from the database
router.delete("/delete/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        await Treatment.findByIdAndDelete(userId);
        res.status(200).json({ status: "Treatment Deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error deleting treatment", error: err.message });
    }
});

// Get a specific treatment by ID
router.get("/get/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        const treatment = await Treatment.findById(userId);
        res.status(200).json({ status: "Treatment fetched", treatment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error fetching treatment", error: err.message });
    }
});

module.exports = router;
