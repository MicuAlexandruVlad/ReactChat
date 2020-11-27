import firebase from 'firebase'

export default class Client {
    init() {
        var firebaseConfig = {
            apiKey: "AIzaSyDftkyf1xLUgGnUNrO_9r_t6pHfRZowNKM",
            authDomain: "reactchat-c218a.firebaseapp.com",
            databaseURL: "https://reactchat-c218a.firebaseio.com",
            projectId: "reactchat-c218a",
            storageBucket: "reactchat-c218a.appspot.com",
            messagingSenderId: "95688266805",
            appId: "1:95688266805:web:221c07770d38086c6d0d7c",
            measurementId: "G-QB0LFZRGV8"
          };
          // Initialize Firebase
          
        if (!firebase.apps.length) {
            let app = firebase.initializeApp(firebaseConfig)
            return app.firestore()
        }
          
        return firebase.firestore()
    }

    getUser(user) {
        return this.init()
            .collection("users")
            .where("email", "==", user.email)
            .where("password", "==", user.password)
            .get()
    }

    getUserById(id) {
        return this.init()
            .collection("users")
            .where(firebase.firestore.FieldPath.documentId(), '==', id)
            .get()
    }

    getUsers() {
        return this.init()
            .collection("users")
            .get()
    }

    registerUser(user) {
        return this.init()
            .collection("users")
            .add({
                email: user.email,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                hasPhoto: user.hasPhoto,
                photoUrl: user.photoUrl
            })
    }

    updateUser(user) {
        return this.init()
            .collection("users")
            .doc(user.id)
            .update({
                firstName: user.firstName,
                lastName: user.lastName,
                hasPhoto: user.hasPhoto,
                photoUrl: user.photoUrl
            }).then(() => {
                console.log('User updated in firestore')
            })
    }

    uploadPhoto(file, userId) {
        var storageRef = firebase.storage().ref()

        return storageRef.child(`images/${userId}.jpg`).put(file)
    }

    getSentMessages(userId) {
        return this.init()
            .collection('messages')
            .where('senderId', '==', userId)
            .orderBy('timestamp')
            .get()
    }

    getReceivedMessages(userId) {
        return this.init()
            .collection('messages')
            .where('receiverId', '==', userId)
            .orderBy('timestamp')
            .get()
    }

    uploadMessage(message) {
        return this.init()
            .collection('messages')
            .add({
                senderId: message.senderId,
                receiverId: message.receiverId,
                timestamp: message.timestamp,
                text: message.text
            })
    }

    listenForMessages(userId) {
        return this.init()
            .collection('messages')
            .where('receiverId', '==', userId)
            .orderBy('timestamp')
    }
}