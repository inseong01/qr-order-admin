![qr-order-admin-img](./docs/src/img/qr-order-admin.png)

## QR-Order-Admin
매장/메뉴 관리와 고객 주문을 처리할 수 있는 **매장 관리자 웹 애플리케이션**입니다.

이 웹 애플리케이션은 [QR-order-customer 프로젝트](https://github.com/inseong01/QR-order-customer)와 연계됩니다.

## 프로젝트
### 목표
#### "효율적인 매장 관리"  
메뉴/주문/좌석 관리를 하나의 웹에서 통합적으로 처리하여 운영 효율 향상

#### "관리자 만족도 향상"    
좌석 수정 기능을 통해 자유도 높은 웹 애플리케이션으로 사용자 만족 기대

### 주요 기능 
메뉴 관리
  1. 메뉴 생성, 수정, 삭제
  2. 이미지 첨부    

주문 관리
  1. 주문 완료/삭제 처리
  2. 미완료/완료 주문 확인
  3. 실시간 주문 수신

좌석 관리
  1. 좌석 생성, 크기/위치 수정, 삭제
  2. 좌석 주문 목록 확인
  3. 좌석 QR 코드 다운로드
  4. 실시간 요청 수신

### 기술 스택
`React` `TypeScript` `Tanstack React Query` `Zustand` `Supabase` `Konva`

## 미리보기
<details>
<summary>메뉴 탭</summary>

--- 
**카테고리 생성**

![](./docs/src/gif/menu/menu-1-create%20category-1.gif)

**지정된 카테고리에서 메뉴 생성 (+사진첨부)**

![](./docs/src/gif/menu/menu-2-create%20menu-1.gif)

**메뉴 삭제**

![](./docs/src/gif/menu/menu-3-update%20delete-1.gif)

**전체메뉴에서 메뉴 생성**

![](./docs/src/gif/menu/menu-4-create%20menu-1.gif)

**카테고리 이름 변경**

![](./docs/src/gif/menu/menu-5-update%20category-1.gif)

**카테고리 삭제**

![](./docs/src/gif/menu/menu-6-delete%20category-1.gif)

[올라가기](#미리보기)

</details>

<details>
<summary>좌석 탭</summary>

---
**좌석 정보 확인 (+QR 다운로드)**

![](./docs/src/gif/table/table-7-click%20table-1.gif)

**좌석 요청 수신**

![](./docs/src/gif/table/request/table-1-request%20reception-1.gif)

**좌석 요청 읽음**

![](./docs/src/gif/table/request/table-2-request%20read-1.gif)

**좌석 요청 숨김**

![](./docs/src/gif/table/request/table-3-request%20toggle-1.gif)

**좌석 생성**

![](./docs/src/gif/table/edit/table-4-create%20table-2.gif)

**좌석 수정**

![](./docs/src/gif/table/edit/table-5-update%20table-2.gif)

**좌석 삭제**

![](./docs/src/gif/table/edit/table-6-delete%20table-2.gif)

[올라가기](#미리보기)

</details>

<details>
<summary>주문 탭</summary>

---
**주문 수신**

![](./docs/src/gif/order/order-1-reception-1.gif)

**주문 완료 처리**

![](./docs/src/gif/order/order-2-complete-1.gif)

**주문 삭제 처리**

![](./docs/src/gif/order/order-3-delete%20order-1.gif)

[올라가기](#미리보기)

</details>


## 체험하기

클릭하면 [QR-ORDER Admin 전용 서비스](https://qr-code-admin-inseong01-inseongs-projects-ab5eeeed.vercel.app/)를 웹 브라우저에서 경험할 수 있어요.   

PC 또는 태블릿 접속을 권장드려요 😊

## 설치하기
```bash
# 리포지토리를 클론합니다
git clone https://github.com/inseong01/QR-order-admin.git

# 프로젝트 디렉터리로 이동합니다
cd qr-order-admin

# 필요한 패키지를 설치합니다
npm install
```

### 서버 접속
```bash
# .env 파일 미첨부로 서버 생성은 되지만 데이터를 불러올 수 없어요 :(
```

<br />

---

<img src="./docs/src/img/qr-order-logo.png" width="150px" align="right" />