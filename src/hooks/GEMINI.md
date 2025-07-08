# 전역 커스텀 훅 개선

## 핵심 작업
* 가독성을 중점으로 개선합니다.
* 불러오는 경로는 수정하지 않아도 됩니다. 

## 주석 처리
* 간단히 주석을 삽입하여 코드 이해도를 높입니다. 
* 전역으로 내보내야 할 변수나 함수가 있다면 파일 내 상위에 위치시키고 주석으로 표기합니다.

## 상태관리 처리
* 상태관리 변수는 src-reactored/store/atom을 참고합니다.
* 해당되는 상태가 없는 경우 주석으로 표기합니다.

## 특정 디렉터리 작업 방향
* use-query/
  * query.ts
    * tanstack query를 활용하여 데이터를 사용할 query를 모아둔 파일입니다.
    * src-refactored/lib/supabase/function 디렉터리 내 파일을 참고합니다.
  * query-client.ts
    * tanstack query를 활용하여 초기 접속 때 필요한 데이터를 패치하는 파일입니다.
    * 초기에 필요한 데이터는 주문, 요청, 메뉴 데이터입니다.
    * 요청 데이터는 supabase realtime이 적용되어 실시간으로 가져와야 합니다. 
    * src-refactored/lib/supabase/function 디렉터리 내 파일을 참고합니다.