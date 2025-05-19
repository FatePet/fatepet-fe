#!/bin/zsh

echo "=== mkcert 설치 및 로컬 HTTPS 인증서 자동화 스크립트 ==="

# 1. mkcert 설치 여부 확인
if ! command -v mkcert &> /dev/null; then
  echo "mkcert가 설치되어 있지 않습니다."
  echo ""
  echo "운영체제에 맞게 아래 명령어를 참고해 mkcert를 설치해주세요."

  case "$(uname)" in
    "Darwin")
      echo "Mac (Homebrew 사용):"
      echo "  brew install mkcert"
      ;;
    "Linux")
      echo "Linux (예: Ubuntu):"
      echo "  sudo apt install libnss3-tools"
      echo "  wget -O mkcert https://github.com/FiloSottile/mkcert/releases/latest/download/mkcert-linux-amd64"
      echo "  chmod +x mkcert"
      echo "  sudo mv mkcert /usr/local/bin/"
      ;;
    "Windows_NT")
      echo "Windows (PowerShell 관리자 권한으로):"
      echo "  choco install mkcert"
      ;;
    *)
      echo "운영체제를 자동으로 인식하지 못했습니다. 직접 https://github.com/FiloSottile/mkcert/releases 에서 설치하세요."
      ;;
  esac

  echo ""
  echo "설치 후 다시 스크립트를 실행해주세요."
  exit 1
fi

# 2. 신뢰할 수 있는 루트 CA 설치
echo "신뢰할 수 있는 루트 CA를 설치합니다 (이미 설치되어 있으면 무시됩니다)..."
mkcert -install

# 3. 기존 인증서 삭제 (옵션)
echo "기존 인증서가 있으면 삭제합니다..."
rm -f localhost.pem localhost-key.pem

# 4. localhost 인증서 발급
echo "localhost용 인증서를 발급합니다..."
mkcert localhost

# 5. 완료 메시지
echo ""
echo "✅ 로컬 HTTPS 인증서 발급이 완료되었습니다."
echo "생성된 파일: localhost.pem, localhost-key.pem"
echo "server.js 등 커스텀 HTTPS 서버에서 사용하세요."
