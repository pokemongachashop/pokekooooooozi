import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
// Firebase 콘솔 > 프로젝트 설정 > 내 앱(웹)의 값을 붙여넣으세요. (웹 config는 공개값이며 보안은 Rules가 담당)
const cfg = {
  apiKey: "AIzaSyCfLPlwHU2Hr8pCTbGp9MakvQDbK6QT6a0",


  authDomain: "pikekoozi.firebaseapp.com",


  databaseURL: "https://pikekoozi-default-rtdb.asia-southeast1.firebasedatabase.app",


  projectId: "pikekoozi",


  storageBucket: "pikekoozi.firebasestorage.app",


  messagingSenderId: "28170873340",


  appId: "1:28170873340:web:b5d40ec1a8b7130d70ea79"
};
export const app = initializeApp(cfg);
export const db = getDatabase(app);
export const auth = getAuth(app);
