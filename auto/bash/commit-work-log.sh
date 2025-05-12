trap "echo '자동 커밋 실행 종료'; exit 0" SIGINT

echo '>> 파일을 스테이징 영역에 추가 중...'
git add . 
echo -e '\n파일 스테이징 완료되었습니다.'

echo '>> Git 상태 및 변경 사항 파일 생성 중...'
git status --short | grep -vF '\354\236\221\354\227\205\354\235\274\354\247\200.txt' > file-status.txt
git diff --cached -- . ':!작업일지.txt' > diff-files.txt
echo -e '\nGit 파일이 성공적으로 생성되었습니다.'

trap 'echo "첫번째 요약 에러가 발생하여 실행을 종료합니다."; exit 1' ERR

echo '>> 작업 로그 요약 중...'
node ./auto/node/summary-work-log.js
echo -e '\n요약이 완료되었습니다.'

while true; do
  echo '요약을 확인해주세요.'
  echo '---'
  cat ./commit-msg.txt
  echo -e '\n---'
  echo '>> 다시 요약할까요? (y/N)'

  read -r choice
  choice=${choice:-"n"}  # 기본값 N

  case "${choice,,}" in 
    y)
      trap 'echo "재실행 에러가 발생하여 실행을 종료합니다."; exit 1' ERR

      echo '다시 요약을 진행합니다.'
      node ./auto/node/summary-work-log.js
      echo '요약이 완료되었습니다.'
      ;;
    n | q)
      echo '요약을 유지합니다.'
      break 
      ;;
    *)
      echo '올바른 입력값(y/n)을 입력하세요!'
      ;;
  esac
done

echo -e '\n>> 자동 커밋을 실행할까요? (Y/n)'

while true; do
  read -r choice
  choice=${choice:-"y"}  # 기본값 Y

  case "${choice,,}" in 
    y)
      echo '자동 커밋을 진행합니다.'
      break;
      ;;
    n | q)
      echo '자동 커밋 진행을 종료합니다.'
      exit 0
      ;;
    *)
      echo '올바른 입력값(y/n)을 입력하세요!'
      ;;
  esac
done

FILE_NAME="작업일지.txt"
trap 'echo "$FILE_NAME 업데이트 에러가 발생하여 실행을 종료합니다."; exit 1' ERR

echo -e "\n>> $FILE_NAME 업데이트 중..."
node ./auto/node/past-work-log.js
echo '파일이 업데이트 되었습니다.'

echo -e '\n>> 커밋 전에 다시 파일을 스테이징 하는 중...'
git add . 
echo '파일 스테이징 완료되었습니다.'

COMMIT_MESSAGE=$(<commit-msg.txt)
HEAD_COMMIT=$(echo "$COMMIT_MESSAGE" | head -n 1)
BODY_COMMIT=$(echo "$COMMIT_MESSAGE" | tail -n +4)

echo -e '\n>> 커밋 메시지 작성 중...'
git commit -m "$HEAD_COMMIT" -m "$BODY_COMMIT"
echo '커밋이 성공적으로 완료되었습니다!'

echo -e '\n>> 커밋 메시지를 확인하세요'
git log -1

CURRENT_BRANCH=$(git branch --show-current)
echo -e "\n>> '$CURRENT_BRANCH' 브랜치에 커밋을 푸시할까요? (Y/n)"

while true; do
  read -r choice
  choice=${choice:-"y"}  # 기본값 Y

  case "${choice,,}" in 
    y)
      trap 'echo "푸시 에러가 발생하여 실행을 종료합니다."; exit 1' ERR

      echo "'$CURRENT_BRANCH' 브랜치로 변경 사항을 푸시하는 중..."
      git push origin "$CURRENT_BRANCH"
      echo "푸시 완료!"
      break
      ;;
    n | q)
      echo "푸시를 취소합니다. 변경 사항은 로컬에만 유지됩니다."
      exit 0
      ;;
    *)
      echo "올바른 입력값(y/n)을 입력하세요!"
      ;;
  esac
done