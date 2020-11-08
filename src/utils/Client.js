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

    registerUser(user) {
        return this.init()
            .collection("users")
            .add({
                email: user.email,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                hasPhoto: user.hasPhoto
            })
    }

    updateUser(user) {
        return this.init()
            .collection("users")
            .set({
                firstName: user.firstName,
                lastName: user.lastName,
                hasPhoto: user.hasPhoto,
                photoId: user.photoId
            })
    }

    uploadPhoto(file) {
        var storageRef = firebase.storage().ref()

        storageRef.put(file).then((snapshot) => {
            console.log('Image uploaded')
        })
    }
}