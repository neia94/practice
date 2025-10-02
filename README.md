# practice

공부를 위한 프로젝트

## 🎯 목표

- 깃헙 페이지로 블로그 추가
- 간단한 웹 에디터를 사용해 블로그 포스팅 기능 구현
- 공부한 내용을 블로그에 포스팅

## 🚀 기술 스택

### 현재: Vite + React (Phase 1)

- **프레임워크**: React 19 + TypeScript
- **빌드 도구**: Vite 7
- **배포**: GitHub Pages (`/docs` 폴더)
- **목적**: React 기초 다지기, 직접 구현하며 배우기

### 향후: Next.js (Phase 2)

- **마이그레이션 예정**: Vite 프로젝트 완성 후
- **목적**: SSG, SEO 최적화, Next.js 학습 및 마이그레이션 경험

## 📦 프로젝트 구조

```
practice/
├── src/                    # 소스 코드
│   ├── components/         # React 컴포넌트
│   ├── pages/             # 페이지 컴포넌트
│   ├── styles/            # 스타일 파일
│   ├── utils/             # 유틸리티 함수
│   ├── App.tsx            # 메인 앱 컴포넌트
│   └── main.tsx           # 진입점
├── docs/                   # GitHub Pages 배포 폴더 (빌드 결과물)
├── public/                 # 정적 파일
├── index.html             # HTML 진입점
├── vite.config.ts         # Vite 설정
├── tsconfig.json          # TypeScript 설정
└── package.json           # 프로젝트 설정
```

## 🛠️ 개발 가이드

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:5173)
npm run dev

# 프로덕션 빌드 (/docs 폴더에 생성)
npm run build

# 빌드 결과물 미리보기
npm run preview
```

### GitHub Pages 배포

1. `npm run build` 실행 → `/docs` 폴더에 빌드 결과물 생성
2. Git에 커밋 및 푸시
3. GitHub 저장소 Settings → Pages → Source: main 브랜치의 `/docs` 폴더 선택
4. 배포 완료! `https://[username].github.io/practice`

## 📚 학습 로드맵

### Phase 1: Vite + React (현재)

- [x] Vite + React + TypeScript 프로젝트 세팅
- [x] GitHub Pages 배포 설정
- [x] React Router로 라우팅 구현
- [ ] 블로그 포스트 목록/상세 페이지
- [ ] 마크다운 파싱 및 렌더링
- [ ] 마크다운 에디터 구현
- [ ] 상태 관리 (Context 또는 Zustand)
- [ ] GitHub Actions 자동 배포

### Phase 2: Next.js 마이그레이션

- [ ] Next.js 프로젝트 생성
- [ ] 컴포넌트 및 페이지 이전
- [ ] 파일 기반 라우팅으로 전환
- [ ] `getStaticProps`로 데이터 페칭 전환
- [ ] 이미지 최적화 (`next/image`)
- [ ] SEO 최적화 (`next/head`)
- [ ] 배포 설정 변경

### 마이그레이션을 통해 배울 것

- Vite vs Next.js 차이점 체감
- 클라이언트 렌더링 vs SSG 비교
- 수동 라우팅 vs 파일 기반 라우팅
- 프레임워크 마이그레이션 경험

## Git 연습 및 학습

### 기본 개념

- Git의 작동 원리 이해 (Working Directory, Staging Area, Repository)
- 버전 관리 시스템의 필요성과 장점

### 기본 명령어 실습

- `git init` - 저장소 초기화
- `git add` - 변경사항 스테이징
- `git commit` - 커밋 생성 및 메시지 작성법
- `git status` - 현재 상태 확인
- `git log` - 커밋 히스토리 조회
- `git diff` - 변경사항 비교

### 브랜치 관리

- `git branch` - 브랜치 생성 및 조회
- `git checkout` / `git switch` - 브랜치 전환
- `git merge` - 브랜치 병합
- `git rebase` - 커밋 히스토리 재구성
- 브랜치 전략 (Git Flow, GitHub Flow)

### 원격 저장소 활용

- `git remote` - 원격 저장소 설정
- `git push` - 원격 저장소에 푸시
- `git pull` - 원격 저장소에서 풀
- `git fetch` - 원격 저장소 변경사항 가져오기
- `git clone` - 저장소 복제

### 협업 및 고급 기능

- Pull Request (PR) 생성 및 리뷰
- 이슈(Issue) 관리
- `git stash` - 임시 저장
- `git cherry-pick` - 특정 커밋 선택적 적용
- `git reset` vs `git revert` - 커밋 되돌리기
- `.gitignore` 설정
- Git Hooks 활용

### 실전 시나리오 연습

- 충돌(Conflict) 해결
- 잘못된 커밋 수정
- 커밋 메시지 수정 (`git commit --amend`)
- 여러 커밋을 하나로 합치기 (Interactive Rebase)
- 실수로 삭제한 파일 복구

## 🧪 실험 프로젝트

해보고 싶었던 것들을 구현해 볼 실험장  
(프로젝트 분리 필요, 관련 내용과 링크만 여기에 두는 것으로 변경)

1. 캔버스를 이용한 웹 기반 디자인 툴
2. 게임 (일단 기획부터 시작해야 함)
3. AI API를 이용해 간단한 서비스 제작
   - 3-1. 원하는 분야의 정보를 알아서 찾아주는 AI API 시스템
4. MCP 서버 이용해보기
5. 바이브 코딩하기

## 📝 참고 자료

### Vite + React

- [Vite 공식 문서](https://vitejs.dev/)
- [React 공식 문서](https://react.dev/)
- [React Router](https://reactrouter.com/)

### Next.js (향후 마이그레이션용)

- [Next.js 공식 문서](https://nextjs.org/docs)
- [Next.js Learn](https://nextjs.org/learn)

### GitHub Pages

- [GitHub Pages 문서](https://docs.github.com/en/pages)
- [GitHub Actions](https://docs.github.com/en/actions)
