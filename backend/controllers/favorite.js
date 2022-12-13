const {db} = require('../db.js')
const { query, collection, getDocs, orderBy, startAt, endAt } = require("firebase/firestore");

const add = async (req, res) => {
    const {img, name, type, video, uid} = req.body;
    await db.collection('favorite').add({
        name: name,
        img: img,
        type: type,
        uid: uid,
        video: video,
    })
    res.status(200).send("Banner has been created!");
};

const edit = async (req, res) => {
    const id = req.params.id;
    const bannerRef = await db.collection('favorite').doc(id).update({
        ...req.body
    })
    res.status(200).send(bannerRef);
}

const get = async (req, res) => {
    const id = req.params.id;
    const bannerRef = db.collection('favorite').doc(id)
    const response = await bannerRef.get();
    res.send(response.data());
}

const remove = async (req, res) => {
    const id = req.params.id;
    const response = db.collection('favorite').doc(id).delete()
    res.send(response)
}

const getAll = async (req, res) => {
    const {page, limit, type} = req.query;
    let result = [];
    await db.collection('favorite')
        // .where('type', '==', type)
        .orderBy('name')
        .startAt((+page - 1) * 10)
        .limit(+limit).get().then((snapshot) => {
        snapshot.forEach(element => {
            result.push(element.data())
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