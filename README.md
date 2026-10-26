# 미스테리 경매 (정적 사이트 + Firebase Realtime Database)

## 구조
    index.html            유저 화면 + 관리자 패널 (관리자 계정 로그인 시에만 표시)
    firebase-config.js    Firebase 설정 (여기만 수정)
    style.css
    database.rules.json   RTDB 보안 규칙
    .github/workflows/deploy.yml

## 설정 순서
1. Firebase 콘솔에서 프로젝트 생성 > Realtime Database 생성(Spark) > Authentication > 이메일/비밀번호 사용 설정.
2. 웹 앱 등록 후 config를 firebase-config.js에 붙여넣기. Authentication > 설정 > 승인된 도메인에 `<계정>.github.io` 추가.
3. Authentication > 사용자에서 관리자용 이메일 계정을 직접 추가하고 UID를 복사 > database.rules.json의 `ADMIN_UID` 5곳을 교체 > Rules 탭에 게시.
4. GitHub에 push > Settings > Pages > Source를 "GitHub Actions"로 선택 (main 푸시 시 자동 배포).
5. index.html 로그인 창에 관리자 이메일/비밀번호를 입력하면 관리자 패널이 화면 상단에 나타납니다. 상품/가격/종료 일시 입력 > [경매 시작 / 리셋]. 일반 유저는 닉네임 + 비밀번호(+ 가입 시 디스코드 ID)로 로그인합니다.

## 설계 메모
- 유저 인증은 Firebase Auth를 사용합니다. 닉네임은 해시되어 내부용 이메일로 변환되며 (닉네임 중복 방지), 비밀번호는 Firebase가 해시 저장합니다. users에는 비밀번호를 저장하지 않습니다.
- 익명성은 DB 레벨에서 보장합니다. 공개 노드(auction_item)에는 입찰자 정보가 없고, 최고 입찰자(auction_private)와 입찰 로그(bids)는 관리자 UID만 읽을 수 있습니다.
- 입찰은 auction_item 트랜잭션 + Rules(호가 단위, 마감 시각 `now`, 입찰 횟수 +1 검증)로 이중 차단됩니다.
- Spark 플랜에서는 이미지 파일 업로드(Storage)를 쓸 수 없어 이미지 URL 입력만 지원합니다.
- 마감 시각이 지나도 status는 admin이 [강제 종료]를 누를 때까지 active로 남지만, Rules가 마감 후 입찰을 거부하고 화면에는 "마감"으로 표시됩니다.
