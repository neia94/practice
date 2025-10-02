# React Router 도입 가이드

## 🎯 React Router란?

React Router는 React 애플리케이션을 위한 **클라이언트 사이드 라우팅 라이브러리**입니다. 페이지 새로고침 없이 URL에 따라 다른 컴포넌트를 렌더링하여 SPA(Single Page Application)를 구현할 수 있게 해줍니다.

### 왜 React Router가 필요한가?

React는 기본적으로 **단일 페이지**만 렌더링합니다. 여러 "페이지"를 가진 것처럼 보이게 하려면 라우팅 라이브러리가 필요합니다.

**React Router 없이:**

- 모든 콘텐츠가 하나의 컴포넌트에 집중
- URL 변경 없이 조건부 렌더링만 가능
- 브라우저의 뒤로 가기/앞으로 가기 버튼 작동 불가
- 특정 페이지로 직접 이동 불가 (북마크 불가)

**React Router 있으면:**

- ✅ URL에 따라 다른 컴포넌트 렌더링
- ✅ 브라우저 히스토리 API 활용
- ✅ 뒤로 가기/앞으로 가기 정상 작동
- ✅ 특정 URL로 직접 접근 가능
- ✅ 페이지 새로고침 없이 부드러운 전환

---

## 📦 설치 과정

### 1. 패키지 설치

```bash
# React Router DOM 설치
npm install react-router-dom

# TypeScript 타입 정의 설치 (TypeScript 사용 시)
npm install --save-dev @types/react-router-dom
```

### 2. 설치 확인

설치 후 `package.json`에 다음이 추가됩니다:

```json
{
  "dependencies": {
    "react-router-dom": "^7.x.x"
  },
  "devDependencies": {
    "@types/react-router-dom": "^5.3.x"
  }
}
```

---

## 🏗️ 프로젝트 구조

React Router 도입 후 프로젝트 구조를 다음과 같이 구성했습니다:

```
src/
├── pages/              # 페이지 컴포넌트들
│   ├── Home.tsx        # 홈 페이지
│   ├── About.tsx       # About 페이지
│   ├── Posts.tsx       # 블로그 포스트 목록 페이지
│   └── NotFound.tsx    # 404 페이지
├── App.tsx             # 라우트 정의
├── main.tsx            # BrowserRouter 설정
└── ...
```

### 왜 `pages` 폴더를 만들었나?

- **관심사 분리**: 페이지 수준 컴포넌트와 재사용 컴포넌트를 구분
- **확장성**: 페이지가 늘어날 때 관리하기 쉬움
- **명확성**: 폴더 구조만 봐도 어떤 페이지들이 있는지 파악 가능

---

## 🔧 구현 상세

### 1. `main.tsx` - BrowserRouter 설정

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename="/practice">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

**핵심 포인트:**

#### `<BrowserRouter>`

- React Router의 최상위 컴포넌트
- HTML5 History API를 사용하여 URL 동기화
- 앱 전체를 감싸야 라우팅 기능 사용 가능

#### `basename="/practice"`

- **중요!** GitHub Pages 배포를 위한 설정
- GitHub Pages URL: `https://username.github.io/practice/`
- basename을 설정하면 모든 라우트가 `/practice`를 기준으로 동작
- 예: `<Link to="/about">` → 실제 URL: `/practice/about`

**basename 없이 배포하면?**

```
❌ https://username.github.io/about (404 에러)
✅ https://username.github.io/practice/about (정상)
```

---

### 2. `App.tsx` - 라우트 정의

```typescript
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Posts from "./pages/Posts";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
```

**컴포넌트 설명:**

#### `<Routes>`

- 여러 `<Route>`를 감싸는 컨테이너
- 현재 URL과 매칭되는 **첫 번째** Route만 렌더링

#### `<Route>`

- `path`: URL 경로 패턴
- `element`: 해당 경로에서 렌더링할 컴포넌트

#### 특수 경로

- `path="/"`: 루트 경로 (홈)
- `path="*"`: 모든 경로 (404 처리용, 가장 마지막에 배치)

---

### 3. 페이지 컴포넌트 - `Home.tsx`

```typescript
import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  return (
    <div className="App">
      <header className="header">
        <h1>🚀 Practice Blog</h1>
        <p>공부를 위한 프로젝트</p>
      </header>

      <main className="main">
        <section className="navigation">
          <h3>페이지 둘러보기</h3>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Link to="/about">About</Link>
            <Link to="/posts">Posts</Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
```

**핵심: `<Link>` 컴포넌트**

#### `<Link>` vs `<a>` 태그

| 특징            | `<Link>`                     | `<a>`               |
| --------------- | ---------------------------- | ------------------- |
| 페이지 새로고침 | ❌ 없음 (SPA 유지)           | ✅ 발생             |
| 속도            | ⚡️ 빠름 (클라이언트 사이드) | 🐢 느림 (서버 요청) |
| 상태 유지       | ✅ 유지                      | ❌ 초기화           |
| 사용            | 내부 링크                    | 외부 링크           |

```typescript
// ✅ 좋은 예 - 내부 링크는 Link 사용
<Link to="/about">About</Link>

// ❌ 나쁜 예 - 내부 링크에 a 태그 사용 (페이지 새로고침 발생)
<a href="/about">About</a>

// ✅ 외부 링크는 a 태그 사용
<a href="https://google.com" target="_blank">Google</a>
```

---

### 4. About 페이지 - `About.tsx`

```typescript
import { Link } from "react-router-dom";
import "../App.css";

function About() {
  return (
    <div className="App">
      <header className="header">
        <h1>📖 About</h1>
        <p>프로젝트 소개</p>
      </header>

      <main className="main">
        <section className="intro">
          <h2>이 프로젝트는?</h2>
          <p>공부를 위한 연습 프로젝트입니다...</p>
        </section>

        <div style={{ marginTop: "2rem" }}>
          <Link to="/">← 홈으로</Link>
        </div>
      </main>
    </div>
  );
}

export default About;
```

**특징:**

- 프로젝트 소개 및 기술 스택 설명
- 홈으로 돌아가기 링크 제공

---

### 5. Posts 페이지 - `Posts.tsx`

```typescript
import { Link } from "react-router-dom";
import "../App.css";

function Posts() {
  const posts = [
    {
      id: 1,
      title: "Vite + React 프로젝트 가이드",
      date: "2024-10-02",
      category: "ai-summaries",
      description: "Vite의 특징과 프로젝트 파일 구조 설명",
    },
    // ...
  ];

  return (
    <div className="App">
      <header className="header">
        <h1>📝 Posts</h1>
        <p>블로그 포스트 목록</p>
      </header>

      <main className="main">
        <section className="posts-list">
          <h2>전체 포스트</h2>

          {posts.map((post) => (
            <article key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <Link to={`/posts/${post.id}`}>읽기 →</Link>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Posts;
```

**특징:**

- 블로그 포스트 목록 표시
- 각 포스트로 이동하는 링크 제공 (향후 구현 예정)
- 카테고리별 구분 (학습 노트 vs AI 요약)

---

### 6. 404 페이지 - `NotFound.tsx`

```typescript
import { Link } from "react-router-dom";
import "../App.css";

function NotFound() {
  return (
    <div className="App">
      <header className="header">
        <h1>404</h1>
        <p>페이지를 찾을 수 없습니다</p>
      </header>

      <main className="main">
        <section className="intro">
          <h2>🔍 페이지를 찾을 수 없습니다</h2>
          <p>요청하신 페이지가 존재하지 않습니다.</p>

          <div style={{ marginTop: "2rem" }}>
            <Link to="/">🏠 홈으로 가기</Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default NotFound;
```

**특징:**

- 존재하지 않는 경로 접근 시 표시
- 사용자에게 친절한 안내 메시지
- 홈으로 돌아갈 수 있는 링크 제공

---

## 🚀 라우팅 작동 방식

### 1. 기본 라우팅 플로우

```
사용자가 /about 클릭
    ↓
<Link to="/about"> 클릭 이벤트 발생
    ↓
React Router가 URL 변경 (페이지 새로고침 없이)
    ↓
<Routes>가 현재 URL (/about)과 매칭되는 <Route> 찾기
    ↓
<About /> 컴포넌트 렌더링
    ↓
화면 업데이트 (부드러운 전환)
```

### 2. URL 매칭 우선순위

```typescript
<Routes>
  <Route path="/" element={<Home />} /> // 1. 정확히 "/" 매칭
  <Route path="/about" element={<About />} /> // 2. 정확히 "/about" 매칭
  <Route path="/posts" element={<Posts />} /> // 3. 정확히 "/posts" 매칭
  <Route path="*" element={<NotFound />} /> // 4. 위의 모든 것과 매칭 안되면
</Routes>
```

**예시:**

- URL: `/` → `<Home />` 렌더링
- URL: `/about` → `<About />` 렌더링
- URL: `/hello` → `<NotFound />` 렌더링 (매칭되는 route 없음)

---

## 🔥 React Router의 주요 기능

### 1. 프로그래매틱 네비게이션

컴포넌트 내부에서 코드로 페이지 이동:

```typescript
import { useNavigate } from "react-router-dom";

function MyComponent() {
  const navigate = useNavigate();

  const handleClick = () => {
    // 프로그래밍 방식으로 페이지 이동
    navigate("/about");
  };

  const goBack = () => {
    // 뒤로 가기
    navigate(-1);
  };

  return (
    <>
      <button onClick={handleClick}>About으로 이동</button>
      <button onClick={goBack}>뒤로 가기</button>
    </>
  );
}
```

### 2. URL 파라미터

동적 경로 매칭:

```typescript
// App.tsx
<Route path="/posts/:id" element={<PostDetail />} />;

// PostDetail.tsx
import { useParams } from "react-router-dom";

function PostDetail() {
  const { id } = useParams();
  // URL이 /posts/123이면 id = "123"

  return <div>포스트 ID: {id}</div>;
}
```

### 3. 쿼리 스트링

URL의 쿼리 파라미터 읽기:

```typescript
import { useSearchParams } from "react-router-dom";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q"); // ?q=react → "react"

  return <div>검색어: {query}</div>;
}
```

### 4. 중첩 라우팅 (Nested Routes)

레이아웃 컴포넌트와 함께 사용:

```typescript
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="posts" element={<Posts />} />
  </Route>
</Routes>;

// Layout.tsx
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <nav>네비게이션</nav>
      <Outlet /> {/* 중첩된 라우트가 여기에 렌더링 */}
      <footer>푸터</footer>
    </div>
  );
}
```

---

## 🎨 개선된 사용자 경험

### Before (React Router 없이)

```typescript
// 조건부 렌더링만 가능
function App() {
  const [page, setPage] = useState("home");

  return (
    <>
      <button onClick={() => setPage("home")}>Home</button>
      <button onClick={() => setPage("about")}>About</button>

      {page === "home" && <Home />}
      {page === "about" && <About />}
    </>
  );
}
```

**문제점:**

- ❌ URL이 변경되지 않음
- ❌ 뒤로 가기 버튼 작동 안함
- ❌ 특정 페이지로 직접 접근 불가
- ❌ 북마크 불가

### After (React Router 사용)

```typescript
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
```

**장점:**

- ✅ URL이 변경됨 (`/`, `/about`)
- ✅ 뒤로 가기/앞으로 가기 작동
- ✅ `/about`로 직접 접근 가능
- ✅ 북마크 가능
- ✅ 브라우저 히스토리에 기록

---

## 🚨 주의사항 및 트러블슈팅

### 1. GitHub Pages 배포 시 주의사항

#### 문제: 404 에러 발생

```
https://username.github.io/practice/about
→ GitHub Pages가 about.html 파일을 찾으려 함
→ 파일이 없으므로 404 에러
```

#### 해결책 1: Hash Router 사용

```typescript
// main.tsx
import { HashRouter } from "react-router-dom";

<HashRouter>
  <App />
</HashRouter>;

// URL이 https://username.github.io/practice/#/about 형태로 변경
// # 뒤의 내용은 서버로 전송되지 않아 404 방지
```

#### 해결책 2: 404.html fallback (권장)

```html
<!-- docs/404.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Redirecting...</title>
    <script>
      // 404 페이지를 index.html로 리다이렉트
      sessionStorage.redirect = location.href;
      location.replace(
        location.pathname.split("/").slice(0, -1).join("/") + "/index.html"
      );
    </script>
  </head>
  <body></body>
</html>
```

### 2. 개발 서버에서는 잘 되는데 빌드 후 404?

Vite 개발 서버는 자동으로 fallback을 처리하지만, 프로덕션에서는 수동 설정 필요:

```typescript
// vite.config.ts
export default defineConfig({
  // ... 기존 설정
  preview: {
    port: 4173,
    // 프리뷰 서버에서도 fallback 활성화
  },
});
```

### 3. 상대 경로 vs 절대 경로

```typescript
// ✅ 절대 경로 (권장)
<Link to="/about">About</Link>

// ⚠️ 상대 경로 (중첩 라우팅에서 주의 필요)
<Link to="about">About</Link>
```

---

## 📊 성능 최적화

### 1. 코드 스플리팅 (Lazy Loading)

페이지별로 번들을 분리하여 초기 로딩 속도 개선:

```typescript
import { lazy, Suspense } from "react";

// 동적 import
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Posts = lazy(() => import("./pages/Posts"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </Suspense>
  );
}
```

**효과:**

- 초기 번들 크기 감소
- 필요한 페이지만 로드
- 빠른 첫 화면 로딩

### 2. Prefetching

사용자가 링크에 마우스를 올렸을 때 미리 로드:

```typescript
<Link to="/about" onMouseEnter={() => import("./pages/About")}>
  About
</Link>
```

---

## 🎯 다음 단계

현재 기본적인 라우팅이 구현되었습니다. 다음 개선 사항:

### 1. 공통 레이아웃 컴포넌트

- 네비게이션 바 추가
- 푸터 추가
- 모든 페이지에 공통 적용

### 2. 포스트 상세 페이지

- `/posts/:id` 동적 라우팅
- 마크다운 파일 읽기 및 렌더링

### 3. 네비게이션 바

- 현재 페이지 하이라이트 (`useLocation` 활용)
- 모바일 반응형 메뉴

### 4. 페이지 전환 애니메이션

- Framer Motion 등의 라이브러리 활용
- 부드러운 페이지 전환 효과

---

## 📚 참고 자료

- [React Router 공식 문서](https://reactrouter.com/)
- [React Router Tutorial](https://reactrouter.com/en/main/start/tutorial)
- [GitHub Pages SPA 배포 가이드](https://github.com/rafgraph/spa-github-pages)

---

## 💡 결론

React Router를 도입하여 다음을 달성했습니다:

✅ **SPA 라우팅 구현**

- 페이지 새로고침 없는 부드러운 전환
- URL 기반 네비게이션

✅ **프로젝트 구조 개선**

- 페이지별 컴포넌트 분리
- 확장 가능한 구조

✅ **사용자 경험 향상**

- 브라우저 뒤로/앞으로 가기 지원
- 북마크 및 직접 URL 접근 가능
- 404 페이지 처리

✅ **GitHub Pages 배포 준비**

- basename 설정으로 서브 경로 지원
- 프로덕션 빌드 최적화

이제 블로그의 기본 골격이 완성되었으며, 포스트 상세 페이지와 마크다운 렌더링을 추가할 준비가 되었습니다! 🎉

---

**작성일:** 2024-10-02  
**버전:** React Router 7, React 19, Vite 7
