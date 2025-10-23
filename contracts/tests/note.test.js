const request = require('supertest');
const app = require('../app');
 
describe('Memo CRUD API', () => {
  let noteId;
 
  //Positive test case for POST endpoint which creates a note
  it('should create a new note', async () => {
    const res = await request(app)
      .post('/notes')
      .send({ title: 'Test Note', content: 'This is a Test Content' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Test Note');
    expect(res.body.content).toBe('This is a Test Content');
    noteId = res.body.id;
  });
  // Positive Test case for GET endpoint to get all the notes
  it('should get all notes', async () => {
    const res = await request(app).get('/notes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
   // Positive Test case for GET endpoint to get all the notes by ID
  it('should get a note by id', async () => {
    const res = await request(app).get(`/notes/${noteId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(noteId);
  });
   // Positive Test case for PUT endpoint to update a note by Its ID
  it('should update a note by id', async () => {
    const res = await request(app)
      .put(`/notes/${noteId}`)
      .send({ title: 'Updated Title', content: 'Updated Content' });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Title');
    expect(res.body.content).toBe('Updated Content');
  });
   // Positive Test case for DELETE endpoint to delete the note by its ID
  it('should delete a note by id', async () => {
    const res = await request(app).delete(`/notes/${noteId}`);
    expect(res.statusCode).toBe(204);
  });
 // Negative Test case for DELETE endpoint to delete the note by its ID
  it('should return 404 for deleted note', async () => {
    const res = await request(app).get(`/notes/${noteId}`);
    expect(res.statusCode).toBe(404);
  });
  // Negative Test case for POST endpoint to Create a note
  it('should return 400 for missing title/content on create', async () => {
    const res = await request(app)
      .post('/notes')
      .send({ title: '', content: '' });
    expect(res.statusCode).toBe(400);
  });
  // Negative Test case for PUT endpoint to update the note by its ID
  it('should return 400 for missing title/content on update', async () => {
    // Create a note first
    const createRes = await request(app)
      .post('/notes')
      .send({ title: 'Another Note', content: 'Another Content' });
    const anotherId = createRes.body.id;
 
    const res = await request(app)
      .put(`/notes/${anotherId}`)
      .send({ title: '', content: '' });
    expect(res.statusCode).toBe(400);
  });
});