# 이치방쿠지 (정적 사이트 + Firebase Realtime Database)

## 구조
    index.html            유저 화면 (?userId=&userName=&token=)
    admin.html            관리자 화면
    firebase-config.js    Firebase 설정 (여기만 수정)
    style.css
    database.rules.json   RTDB 규칙
    .github/workflows/deploy.yml

## 설정 순서
1. Firebase 콘솔에서 프로젝트 생성 > Realtime Database 생성(Spark) > Authentication에서 이메일/비밀번호 사용 설정, 관리자 계정 1개 추가.
2. 웹 앱 등록 후 config 값을 firebase-config.js에 붙여넣기. Authentication > 설정 > 승인된 도메인에 `<계정>.github.io` 추가.
3. 관리자 계정의 UID(Authentication > 사용자)를 database.rules.json의 `ADMIN_UID` 두 곳에 넣고 Rules 탭에 게시.
4. GitHub 저장소에 push > Settings > Pages > Source를 "GitHub Actions"로 선택 (main 푸시 시 자동 배포).
5. /admin.html 로그인 > 판 설정 > [새 판 시작 / 리셋]. 디스코드 봇은 `index.html?userId=..&userName=..&token=..` 링크를 전달.

## Config(환경 변수) 관련
정적 사이트에서는 Firebase 웹 config가 어차피 브라우저에 노출되는 공개값입니다. 비밀이 아니며 보안은 Rules(관리자 UID 검증, 중복 뜯기 차단)로 처리합니다.

## 동작 및 한계
- 티켓 뜯기는 티켓 단위 Transaction + Rules(opened가 false일 때만 true로 변경)로 이중 차단됩니다.
- 등급별 잔여 수량은 tickets에서 계산하며, 라스트원은 remaining 카운터가 0이 되는 순간 뜯은 유저에게 지급됩니다.
- 서버가 없으므로 rank/reward가 DB에서 읽기 가능하고, token 검증과 코인 차감/지급은 클라이언트가 할 수 없습니다. 코인 정산은 디스코드 봇이 history를 읽어 처리하고 token을 검증하세요.
