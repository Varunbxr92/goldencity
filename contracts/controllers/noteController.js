// Note Controller to handle the endpoints

const notes = [];
let serialId = 1;


// To handle the Create Note POST Request
exports.createNote = (req, res) => {
    console.log("Came here in Create Note");
    try {
        const { title, content } = req.body;
        if (title === null || content === null) {
            return res.status(400).json({ error: "Title and Content cannot be null" });
        }
        if (!title || !content) {
            return res.status(400).json({ error: "Title and Content are required Fields." });
        }
        const note = { id: serialId++, title, content };
        notes.push(note);
        res.status(201).json(note);
    } catch (err) {
        if (err.name === "TypeError") {
            return res.status(400).json({ error: "Invalid request payload" });
        }
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// To handle the Get All Notes
exports.getAllNotes = (req, res) => {
    try {
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// To handle the Get Notes By Id
exports.getNotesById = (req, res ) => {
    try {
    const id = parseInt(req.params.id);
    const memo = notes.find(a => a.id === id);
    if (!memo) return res.status(404).json({"error": `Note Not Found with ID: ${id}`});
    res.json(memo);
    }
    catch(err) {
        res.status(500).json({"error": "Internal Server Error"});
    }
   
};


// To Update the Note By Id
exports.updateNote = (req, res ) => {
    try {
    const id = parseInt(req.params.id);
    const memo = notes.find(a => a.id === id);
    if (!memo) return res.status(404).json({"error": `Note Not Found with ID: ${id}`});
    const {title, content } = req.body;
    if(!title || !content)
        return res.status(400).json({"error": "Title and Content are required Fields. "});
    memo.title = title;
    memo.content = content;
    res.json(memo);
    }
    catch(err) {
        res.status(500).json({"error": "Internal Server Error"});
    }
};

// To Delete the Note By Id
exports.deleteNote = (req, res ) => {
    try {
    const id = parseInt(req.params.id);
    const idxOfNote = notes.findIndex(i => i.id === id);
    if(idxOfNote === -1) return res.status(404).json({"error": `Note Not Found with ID: ${id}`});
    notes.splice(idxOfNote,1);
    res.status(204).send();
    } catch (error) {
        res.status(500).json({"error": "Internal Server Error"});
    }
};