const Note = require('../models/Note');

// @desc    Get all notes for a user
// @route   GET /api/notes
// @access  Private
const getNotes = async (req, res) => {
    try {
        const { search, tags, sort } = req.query;
        let query = { user: req.user.id };

        // Handle text search
        if (search) {
            query.$text = { $search: search };
        }

        // Handle tags filtering (comma separated)
        if (tags) {
            const tagsArray = tags.split(',').map((tag) => tag.trim());
            query.tags = { $in: tagsArray };
        }

        let dbQuery = Note.find(query);

        if (search) {
            // Sort by relevance score if doing a text search
            dbQuery = dbQuery.select({ score: { $meta: 'textScore' } });
            dbQuery = dbQuery.sort({ score: { $meta: 'textScore' } });
        } else {
            // Default Sorting logic
            let sortOrder = -1; // newest by default
            if (sort === 'oldest') {
                sortOrder = 1;
            }

            // Always prioritize pinned notes, then by date
            dbQuery = dbQuery.sort({ isPinned: -1, createdAt: sortOrder });
        }

        const notes = await dbQuery.exec();
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new note
// @route   POST /api/notes
// @access  Private
const createNote = async (req, res) => {
    try {
        const { title, content, tags, isPinned } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        const note = await Note.create({
            user: req.user.id,
            title,
            content,
            tags: tags || [],
            isPinned: isPinned || false,
        });

        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        // Check for user ownership
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized to update this note' });
        }

        const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        // Check for user ownership
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized to delete this note' });
        }

        await Note.findByIdAndDelete(req.params.id);

        res.status(200).json({ id: req.params.id, message: 'Note removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getNotes,
    createNote,
    updateNote,
    deleteNote,
};
