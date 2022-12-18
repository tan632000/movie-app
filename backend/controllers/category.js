const {db} = require('../db.js')

const add = async (req, res) => {
    const {type} = req.body;
    await db.collection('category').add({
        type: type,
    })
    res.status(200).send("Category has been created!");
};

const edit = async (req, res) => {
    const id = req.params.id;
    await db.collection('category').doc(id).update({
        ...req.body
    })
    res.status(200).send("Edit category successfully!");
}


const remove = async (req, res) => {
    const id = req.params.id;
    await db.collection('category').doc(id).delete()
    res.send('Delete movie successfully')
}

const getAll = async (req, res) => {
    let result = [];
    await db.collection('category')
        .orderBy('type').get().then((snapshot) => {
        snapshot.forEach(element => {
            result.push({document_id: element.id, ...element.data()})
        });
    })
    res.send(result)
}

module.exports = {
    add,
    edit,
    remove,
    getAll,
}