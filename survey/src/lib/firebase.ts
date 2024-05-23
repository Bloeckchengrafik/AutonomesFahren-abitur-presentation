// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics, logEvent} from "firebase/analytics";
import {getFirestore, collection, addDoc} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCi0J50JijRSqSravFcDhRC-29MFFEIRgI",
    authDomain: "autonomesfahrenpraesentation.firebaseapp.com",
    projectId: "autonomesfahrenpraesentation",
    storageBucket: "autonomesfahrenpraesentation.appspot.com",
    messagingSenderId: "43421103251",
    appId: "1:43421103251:web:b6defdbddc917047328966",
    measurementId: "G-BT7273S93X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();
const col = collection(db, "surveys");

function logEventToDefaultSink(name: string, params?: Record<string, unknown>) {
    logEvent(analytics, name, params);
}

function submitToFirestore(data: never) {
    addDoc(col, data).then(() => {
        logEventToDefaultSink("survey-submitted");
    });
}

export {
    app,
    logEventToDefaultSink,
    submitToFirestore
}