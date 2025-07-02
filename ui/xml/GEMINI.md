# 목적
XML 파일을 HTML 태그로 변환

## 작업방식
- Component 태그를 밖에 있는 태그는 무시합니다.
- description 내용을 참고하여 HTML 실제 태그로 변환합니다.
- description 내용에 아이콘이 있다면 div 태그로 감싼 img 태그를 생성합니다.
- description은 변환된 태그에 포함하지 않습니다.
- 폼 형식은 form 태그로 변환합니다.
- input 태그가 있는 경우 label 태그도 같이 삽입합니다.
- 생성된 HTML은 가독성을 위해 포맷팅이 적용됩니다.
- 태그의 id 대신 카멜 케이스로 class를 작성합니다.

## 출력물
- 각각의 컴포넌트 HTML 파일로 변환되어 ui/html 디렉터리에 위치합니다.