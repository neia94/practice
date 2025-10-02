# 📚 Posts 디렉토리 구조

이 폴더는 블로그 포스트들을 카테고리별로 관리합니다.

## 📁 폴더 구조

### `/my-learning/` - 내 학습 노트

직접 공부하고 작성하는 포스트들을 저장하는 공간입니다.

**용도:**

- 개인 학습 내용 정리
- 튜토리얼 따라하기
- 개념 이해 및 정리
- 트러블슈팅 경험

**예시:**

```
my-learning/
  ├── react-hooks-deep-dive.md
  ├── typescript-generics-study.md
  ├── css-flexbox-practice.md
  └── algorithm-study-week1.md
```

---

### `/ai-summaries/` - AI 자동 생성 요약

AI가 자동으로 생성하는 내용 정리 및 코드 변경점 설명을 저장하는 공간입니다.

**용도:**

- 프로젝트 변경점 자동 요약
- 코드 리팩토링 설명
- 새로운 기능 추가 시 문서화
- 기술 스택 설명 및 가이드

**예시:**

```
ai-summaries/
  ├── vite-project-guide.md
  ├── react-router-implementation.md
  ├── github-actions-setup.md
  └── code-changes-2024-10-02.md
```

---

## 🔄 워크플로우

### 1. 직접 학습한 내용을 포스트할 때

```bash
# my-learning 폴더에 마크다운 파일 생성
touch posts/my-learning/새로운-학습-내용.md
```

### 2. AI에게 내용 정리를 요청할 때

사용자: "오늘 작업한 내용을 정리해서 포스트로 만들어줘"
→ AI가 자동으로 `/ai-summaries/` 폴더에 생성

### 3. 코드 변경 후 설명이 필요할 때

사용자: "이번 변경사항을 문서화해줘"
→ AI가 자동으로 `/ai-summaries/` 폴더에 생성

---

## 📝 파일 명명 규칙

### 권장 형식

- 소문자 사용
- 단어는 하이픈(`-`)으로 구분
- 날짜가 필요한 경우: `YYYY-MM-DD-제목.md`

### 좋은 예시

✅ `react-hooks-useState.md`
✅ `2024-10-02-github-pages-deploy.md`
✅ `typescript-interface-vs-type.md`

### 나쁜 예시

❌ `React Hooks.md` (공백 포함)
❌ `TypeScript_기초.md` (언더스코어, 한글 혼용)
❌ `post1.md` (의미 없는 이름)

---

## 🎯 향후 확장 계획

프로젝트가 성장하면 다음과 같이 세분화할 수 있습니다:

```
posts/
  ├── my-learning/
  │   ├── frontend/
  │   ├── backend/
  │   └── algorithms/
  ├── ai-summaries/
  │   ├── guides/
  │   ├── changelogs/
  │   └── refactoring/
  └── projects/
      ├── project-1/
      └── project-2/
```

---

**마지막 업데이트:** 2024-10-02
