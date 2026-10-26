import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
// Firebase 콘솔 > 프로젝트 설정 > 내 앱(웹)의 값을 붙여넣으세요. (웹 config는 공개값이며, 보안은 Rules가 담당)
const cfg = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT",
  appId: "YOUR_APP_ID"
};
export const app = initializeApp(cfg);
export const db = getDatabase(app);
export const auth = getAuth(app);
