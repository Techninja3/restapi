const { Router } = require("express");
const router = Router(); const admin = require("firebase-admin");
const db = admin.firestore();

router.post("/api/books", async (req, res) => {
    try {
        await db.collection('books').doc('/' + req.body.id + '/').create({ title: req.body.title });
        return res.status(204).json();
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

router.get('/api/books/:books_id', async (req, res) => {
    try {
        const doc = await db.collection('books').doc(req.params.books_id);
        const item = await doc.get();
        const response =  item.data();
        return res.status(200).json(response)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

router.get('/api/books', async (req, res) => {
    try {
        const query = db.collection('books');
        const querySnapshot = await query.get();
        const docs = querySnapshot.docs;
        const response = docs.map(doc => ({
            id: doc.id,
            title: doc.data().title
        }))
        return res.status(200).json(response)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

router.delete('/api/books/:books_id', async (req, res) => {
    try {
        const doc = await db.collection('books').doc(req.params.books_id);
        await doc.delete()
        return res.status(200).json()
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
});

router.put('/api/books/:books_id', async (req, res) => {
    try {
        const doc = await db.collection('books').doc(req.params.books_id);
        await doc.update({
            title: req.body.title
        })
        return res.status(200).json()
    }catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
});

module.exports = router