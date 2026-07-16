const express = require('express');
const Data = require('../models/Data');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Create data entry
router.post('/', protect, async (req, res) => {
  try {
    const { title, description, content } = req.body;

    const data = await Data.create({
      userId: req.user.id,
      title,
      description,
      content
    });

    res.status(201).json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's data
router.get('/', protect, async (req, res) => {
  try {
    const data = await Data.find({ userId: req.user.id });
    res.json({
      success: true,
      count: data.length,
      data
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single data entry
router.get('/:id', protect, async (req, res) => {
  try {
    const data = await Data.findById(req.params.id);
    
    if (!data) {
      return res.status(404).json({ error: 'Data not found' });
    }

    if (data.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update data entry
router.put('/:id', protect, async (req, res) => {
  try {
    let data = await Data.findById(req.params.id);
    
    if (!data) {
      return res.status(404).json({ error: 'Data not found' });
    }

    if (data.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    data = await Data.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete data entry
router.delete('/:id', protect, async (req, res) => {
  try {
    const data = await Data.findById(req.params.id);
    
    if (!data) {
      return res.status(404).json({ error: 'Data not found' });
    }

    if (data.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await Data.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Data deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
