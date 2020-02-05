const admin = require('./node_modules/firebase-admin');
const data = require("./tillandsias.json");
const collectionKey = "tillandsias"; //name of the collection
var serviceAccount = require("./serviceKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tillsdb.firebaseio.com"
});
const firestore = admin.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);
if (data && (typeof data === "object")) {
Object.keys(data).forEach(docKey => {
  console.log(data[docKey].key);
 firestore.collection(collectionKey).doc(data[docKey].key).set(data[docKey]).then((res) => {
    console.log("Document " + data[docKey].key + " successfully written!");
}).catch((error) => {
   console.error("Error writing document: ", error);
});
});
}