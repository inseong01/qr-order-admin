1. 디렉터리 및 파일 구조 재설계

* 핵심 원칙: 모든 디렉터리와 파일명은 `kebab-case`로 통일합니다.
* TO-BE (목표 구조):

  src/
  ├── assets/                   # 정적 리소스 (예: 이미지, 폰트 등)
  │   └── logo.png
  │
  ├── components/              # 재사용 가능한 UI 컴포넌트  
  │   ├── ui/                    # Button, Modal 등 스타일 중심 컴포넌트
  │   └── layout/                # Header, Footer 등 레이아웃 관련
  │
  ├── constants/               # 전역 상수, 열거형 등
  │   └── query-keys.ts
  │
  ├── features/                # 도메인/기능 중심 구조 
  │   ├── menu/
  │   │   ├── components/         # 도메인 전용 UI
  │   │   ├── api/                # Supabase/API 호출
  │   │   ├── hooks/              # 메뉴 전용 훅
  │   │   ├── store/              # 메뉴 상태
  │   │   └── types.ts            # 도메인 타입
  │   ├── order/
  │   └── table/
  │
  ├── hooks/                   # 공통 커스텀 훅
  │   └── use-modal.ts
  │
  ├── lib/                     # 외부 라이브러리 초기화 / 클라이언트 객체
  │   ├── supabase.ts
  │   ├── i18n.ts
  │   └── axios.ts
  │
  ├── store/                   # 전역 상태 관리
  │   └── global-atoms.ts
  │
  ├── styles/                  # 글로벌 스타일 및 테마
  │   └── index.css
  │
  ├── types/                   # 전역 공통 타입 정의
  │   └── common.ts
  │
  └── utils/                   # 순수 유틸 함수
      └── debounce.ts

2. 코딩 컨벤션 정의

   * 파일/디렉터리 네이밍:
     * src 루트 디렉터리에 위치한 파일(예: App.tsx)은 제외하며 모두 `kebab-case`를 사용합니다.
     * 예시: feature/load/start/start-up-screen.tsx -> features/load/start-up-screen.tsx

4. GEMINI.md 전역 규칙
  * esc로 종료되는 경우 이전까지 진행된 작업을 적용합니다.
  * 작업 진행에서 애매하거나 모르는 것이 생길 때 해당 작업에 대해 질의를 요청합니다.
  * .md 파일은 임의로 작성/수정 요청하지 않습니다.

---