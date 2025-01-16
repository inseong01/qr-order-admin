# QR-Order-Admin

### 🏢 소개

매장 관리와 고객 주문을 처리할 수 있는 **매장 관리자 웹**입니다.

이 웹 애플리케이션은 [QR-order-customer 프로젝트](https://github.com/inseong01/QR-order-customer)와 연계됩니다.

### 🎯 목표
- 효율적인 매장 관리  
  : 메뉴, 주문, 좌석 관리를 하나의 웹에서 통합적으로 처리하여 운영 효율 극대화

- 관리자 만족도 향상    
  : 자유도 높은 좌석 수정 기능을 통해 사용자 만족 기대

### 📝 주요 기능 
- 메뉴 관리
  1. 메뉴 생성, 수정, 삭제
  2. 이미지 첨부

- 주문 관리
  1. 완료 및 삭제 처리
  2. 미완료/완료 주문 확인
  3. 실시간 주문 수신

- 좌석 관리
  1. 좌석 생성, 크기/위치 수정, 삭제 가능
  2. 좌석 주문 목록 확인
  3. 좌석 QR 코드 다운로드
  4. 실시간 요청 수신

### 🔗 미리보기

클릭하면 [QR-Order-Admin 웹](https://qr-code-admin-inseong01-inseongs-projects-ab5eeeed.vercel.app/)을 브라우저에서 확인할 수 있어요 

### ⚙️ 설치

```bash
# 리포지토리를 클론합니다
git clone https://github.com/inseong01/QR-order-admin.git

# 프로젝트 디렉터리로 이동합니다
cd qr-order-admin

# 필요한 패키지를 설치합니다
npm install
```

### 🚀 배포 서버
```bash
# 배포 서버를 시작합니다
npm run preview
```

### 🛠️ 개발 서버
```bash
# 개발 서버를 시작합니다
npm run dev
```

### 💻 기술 스택
`React` `Tanstack React Query` `Zustand` `Supabase`