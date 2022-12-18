const {db} = require('../db.js')

const add = async (req, res) => {
    const {img, name, type, video} = req.body;
    await db.collection('movie').add({
        name: name,
        img: img,
        type: type,
        video: video,
    })
    res.status(200).send("Movie has been created!");
};

const edit = async (req, res) => {
    const id = req.params.id;
    await db.collection('movie').doc(id).update({
        ...req.body
    })
    res.status(200).send("Edit movie successfully!");
}

const get = async (req, res) => {
    const id = req.params.id;
    const bannerRef = db.collection('movie').doc(id)
    const response = await bannerRef.get();
    res.send(response.data());
}

const remove = async (req, res) => {
    const id = req.params.id;
    const response = db.collection('movie').doc(id).delete()
    res.send(response)
}

const getAll = async (req, res) => {
    const {page, limit, type} = req.query;
    let result = [];
    await db.collection('movie')
        // .where('type', '==', type)
        .orderBy('name')
        .startAt((parseInt(page) - 1) * 10)
        .limit(parseInt(limit)).get().then((snapshot) => {
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
    get,
    getAll,
}