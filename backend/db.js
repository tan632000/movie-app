const admin = require('firebase-admin')
const {initializeApp, cert} = require('firebase-admin/app')
const {getFirestore} = require('firebase-admin/firestore')

const serviceAccount = require('./creds.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = getFirestore()

module.exports = {
    db,
    admin,
}
