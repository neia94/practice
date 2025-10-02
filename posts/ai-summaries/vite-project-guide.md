# Vite + React 프로젝트 가이드

## 🚀 Vite란?

Vite(프랑스어로 "빠르다"는 뜻)는 차세대 프론트엔드 빌드 도구입니다. Evan You(Vue.js 창시자)가 개발했으며, 기존 번들러들의 느린 개발 서버 시작 시간과 느린 업데이트를 해결하기 위해 만들어졌습니다.

### Vite의 주요 특징

1. **⚡️ 번개같이 빠른 개발 서버**

   - ES 모듈을 네이티브로 활용하여 번들링 없이 즉시 시작
   - 파일 변경 시 전체 앱을 다시 빌드하지 않고 해당 모듈만 교체 (HMR)

2. **📦 최적화된 프로덕션 빌드**

   - Rollup 기반의 번들링으로 최적화된 번들 생성
   - 코드 스플리팅, Tree-shaking 자동 지원

3. **🔧 Zero Config**

   - 합리적인 기본 설정으로 즉시 사용 가능
   - 필요시 유연한 설정 확장 가능

4. **🎯 다양한 프레임워크 지원**
   - React, Vue, Svelte, Preact 등 다양한 템플릿 제공

### Vite vs 전통적인 번들러 (Webpack, CRA 등)

| 특징           | Vite          | 전통적인 번들러      |
| -------------- | ------------- | -------------------- |
| 개발 서버 시작 | 즉시 (수백ms) | 느림 (수초~수십초)   |
| HMR 속도       | 매우 빠름     | 프로젝트 크기에 비례 |
| 빌드 시간      | 빠름 (Rollup) | 느림 (전체 번들링)   |
| 설정 복잡도    | 낮음          | 높음                 |

---

## 📁 프로젝트 파일 구조 설명

이번에 생성된 주요 파일들에 대해 자세히 알아보겠습니다.

### 1. `package.json` - 프로젝트 메타데이터 및 의존성 관리

```json
{
  "name": "practice",
  "version": "1.0.0",
  "type": "module",
  "description": "공부를 위한 프로젝트 - Vite + React → Next.js 마이그레이션 예정"
}
```

**주요 포인트:**

- `"type": "module"`: ES 모듈 방식 사용 (import/export)
- **dependencies**: 런타임에 필요한 패키지
  - `react`, `react-dom`: React 라이브러리
  - `vite`: 개발 서버 및 빌드 도구
  - `@vitejs/plugin-react`: React 지원 플러그인
- **devDependencies**: 개발 시에만 필요한 패키지
  - `typescript`: TypeScript 컴파일러
  - `@types/react`, `@types/react-dom`: TypeScript 타입 정의

**스크립트:**

- `npm run dev`: 개발 서버 실행
- `npm run build`: 프로덕션 빌드
- `npm run preview`: 빌드된 결과물 미리보기

---

### 2. `vite.config.ts` - Vite 설정 파일

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/practice/",
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
});
```

**설정 상세 설명:**

- **`plugins: [react()]`**: React 프로젝트를 위한 플러그인 활성화
  - JSX/TSX 파일 변환
  - Fast Refresh (HMR) 지원
- **`base: "/practice/"`**: 배포 시 기본 경로 설정
  - GitHub Pages에서 `https://username.github.io/practice/`로 접근
  - 모든 asset 경로가 이 base를 기준으로 생성됨
- **`build.outDir: "docs"`**: 빌드 결과물을 `docs` 폴더에 생성
  - GitHub Pages가 /docs 폴더를 소스로 사용하도록 설정 가능
- **`build.emptyOutDir: true`**: 빌드 전 출력 폴더를 비움

---

### 3. `tsconfig.json` - TypeScript 설정 파일

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "jsx": "react-jsx",
    "strict": true
  }
}
```

**주요 옵션 설명:**

- **`target: "ES2020"`**: 컴파일 결과물의 JavaScript 버전
- **`module: "ESNext"`**: 최신 ES 모듈 시스템 사용
- **`moduleResolution: "bundler"`**: Vite/Rollup 등 번들러를 위한 모듈 해석
- **`jsx: "react-jsx"`**: React 17+ 새로운 JSX 변환 사용
  - `import React from 'react'` 없이도 JSX 사용 가능
- **`strict: true`**: 엄격한 타입 체크 활성화
- **`noEmit: true`**: TypeScript가 직접 파일을 생성하지 않음 (Vite가 처리)

---

### 4. `index.html` - 진입점 HTML 파일

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Practice Blog</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**Vite의 특별한 점:**

- HTML 파일이 **프로젝트의 진입점**
- `<script type="module">` 태그로 TypeScript/JSX 파일을 직접 로드
- Vite가 자동으로 필요한 변환 처리
- Create React App과 달리 public 폴더가 아닌 프로젝트 루트에 위치

---

### 5. `src/main.tsx` - React 애플리케이션 진입점

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**코드 설명:**

- **`ReactDOM.createRoot()`**: React 18의 새로운 Root API
- **`React.StrictMode`**: 개발 모드에서 잠재적 문제 감지
- **`document.getElementById("root")!`**:
  - TypeScript의 non-null assertion (`!`)
  - root 요소가 반드시 존재함을 보장

---

### 6. `src/App.tsx` - 메인 컴포넌트

```typescript
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>🚀 Practice Blog</h1>
        <p>공부를 위한 프로젝트</p>
      </header>
      {/* ... */}
    </div>
  );
}

export default App;
```

**특징:**

- 함수형 컴포넌트 (Functional Component)
- TypeScript로 작성되어 타입 안정성 제공
- CSS 파일을 직접 import하여 스타일링

---

## 🔥 Vite의 개발 경험

### 1. 즉시 시작되는 개발 서버

```bash
npm run dev
```

실행 시 수백 밀리초 내에 서버가 시작됩니다:

```
VITE v7.1.7  ready in 666 ms
➜  Local:   http://localhost:5173/practice/
```

### 2. 즉각적인 Hot Module Replacement (HMR)

파일을 수정하면 브라우저가 **즉시 업데이트**되며, 상태도 유지됩니다:

- 컴포넌트 수정 → 화면만 업데이트
- CSS 수정 → 페이지 새로고침 없이 스타일 적용

### 3. TypeScript 기본 지원

별도 설정 없이 `.ts`, `.tsx` 파일을 바로 사용할 수 있습니다.

---

## 📊 Vite vs Create React App 비교

### 개발 서버 시작 시간

- **Create React App**: 10~30초 (프로젝트 크기에 따라)
- **Vite**: 0.5~2초

### HMR 속도

- **Create React App**: 2~5초
- **Vite**: 50~200ms

### 빌드 설정

- **Create React App**: eject 후 복잡한 webpack 설정
- **Vite**: 간단한 `vite.config.ts`

---

## 🎯 GitHub Pages 배포 전략

이 프로젝트는 GitHub Pages 배포를 염두에 두고 설정되었습니다:

1. **`vite.config.ts`에서 `base` 설정**

   ```typescript
   base: "/practice/"; // 저장소 이름
   ```

2. **빌드 출력을 `docs` 폴더로 설정**

   ```typescript
   build: {
     outDir: "docs";
   }
   ```

3. **배포 단계**

   ```bash
   npm run build  # docs 폴더에 빌드
   git add docs
   git commit -m "Deploy to GitHub Pages"
   git push
   ```

4. **GitHub 저장소 설정**
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: main, folder: /docs

---

## 🚀 다음 단계

현재 프로젝트는 기본 세팅이 완료된 상태입니다. 다음 학습 단계:

1. **React Router 추가**: 페이지 라우팅 구현
2. **마크다운 파싱**: 블로그 포스트 작성을 위한 마크다운 지원
3. **상태 관리**: Context API 또는 Zustand 등
4. **API 연동**: 데이터 페칭 실습
5. **GitHub Pages 배포**: 실제 배포 경험
6. **Next.js 마이그레이션**: SSR/SSG 학습

---

## 📚 참고 자료

- [Vite 공식 문서](https://vitejs.dev/)
- [Vite GitHub 저장소](https://github.com/vitejs/vite)
- [React 공식 문서](https://react.dev/)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/)

---

## 💡 결론

Vite는 현대적인 프론트엔드 개발에 최적화된 도구입니다. 빠른 개발 경험과 간단한 설정으로, Create React App의 강력한 대안이 되었습니다.

이 프로젝트를 통해 Vite + React + TypeScript의 기본을 익히고, 점진적으로 더 복잡한 기능들을 추가해 나가며 학습할 수 있습니다.

**핵심 takeaway:**

- ⚡️ Vite는 정말 빠르다
- 🛠️ 설정이 간단하다
- 🎯 모던 도구들과 잘 통합된다
- 🚀 프로덕션 빌드도 최적화되어 있다

Happy coding! 🎉
