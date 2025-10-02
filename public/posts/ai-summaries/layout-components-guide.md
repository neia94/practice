# 공통 레이아웃 컴포넌트 구현 가이드

## 🎯 목표

모든 페이지에서 공통으로 사용되는 레이아웃 요소(네비게이션 바, 푸터)를 컴포넌트로 분리하여 코드 중복을 제거하고 일관된 UI를 제공합니다.

---

## 📁 생성된 파일 구조

```
src/
├── components/
│   ├── Layout.tsx          # 레이아웃 컨테이너
│   ├── Layout.css
│   ├── Navigation.tsx      # 네비게이션 바
│   ├── Navigation.css
│   ├── Footer.tsx          # 푸터
│   └── Footer.css
└── pages/
    ├── Home.tsx           # Layout으로 감싸짐
    ├── About.tsx          # Layout으로 감싸짐
    ├── Posts.tsx          # Layout으로 감싸짐
    └── NotFound.tsx       # Layout으로 감싸짐
```

---

## 🔧 구현 상세

### 1. Layout 컴포넌트 - 전체 구조

`src/components/Layout.tsx`

```typescript
import { ReactNode } from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import "./Layout.css";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <Navigation />
      <main className="layout-main">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
```

**핵심 개념:**

#### `children` prop

- React의 특수한 prop으로, 컴포넌트 사이에 있는 내용을 전달
- `ReactNode` 타입: 모든 렌더링 가능한 React 요소

#### 레이아웃 구조

```
┌─────────────────────────┐
│     <Navigation />      │  ← 고정 네비게이션
├─────────────────────────┤
│                         │
│      {children}         │  ← 페이지별 콘텐츠
│                         │
├─────────────────────────┤
│       <Footer />        │  ← 고정 푸터
└─────────────────────────┘
```

#### Flexbox 레이아웃 (`Layout.css`)

```css
.layout {
  min-height: 100vh; /* 전체 화면 높이 */
  display: flex;
  flex-direction: column; /* 세로 방향 배치 */
}

.layout-main {
  flex: 1; /* 남은 공간 모두 차지 */
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
```

**작동 원리:**

- `min-height: 100vh`: 콘텐츠가 적어도 푸터가 화면 하단에 고정
- `flex: 1`: main 영역이 남은 공간을 모두 차지하여 푸터를 아래로 밀어냄

---

### 2. Navigation 컴포넌트 - 네비게이션 바

`src/components/Navigation.tsx`

```typescript
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🚀</span>
          <span className="logo-text">Practice Blog</span>
        </Link>

        <ul className="nav-menu">
          <li>
            <Link
              to="/"
              className={`nav-link ${isActive("/") ? "active" : ""}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`nav-link ${isActive("/about") ? "active" : ""}`}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/posts"
              className={`nav-link ${isActive("/posts") ? "active" : ""}`}
            >
              Posts
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
```

**핵심 기능:**

#### 1. 현재 페이지 하이라이트

**`useLocation` Hook**

```typescript
const location = useLocation();
// location.pathname: 현재 URL 경로
// 예: "/" 또는 "/about" 또는 "/posts"
```

**`isActive` 함수**

```typescript
const isActive = (path: string) => {
  return location.pathname === path;
};
```

- 현재 경로와 링크 경로를 비교
- `true`면 `active` 클래스 추가

**동적 클래스명 적용**

```typescript
className={`nav-link ${isActive("/") ? "active" : ""}`}
// 현재 "/" 경로면: "nav-link active"
// 아니면: "nav-link"
```

#### 2. Sticky Navigation

```css
.navigation {
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
}
```

- **`position: sticky`**: 스크롤해도 상단에 고정
- **`top: 0`**: 화면 최상단에 붙음
- **`z-index: 100`**: 다른 요소 위에 표시
- **`backdrop-filter: blur(10px)`**: 반투명 블러 효과

#### 3. 그라디언트 로고 텍스트

```css
.logo-text {
  background: linear-gradient(135deg, #646cff 0%, #747bff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

**작동 원리:**

1. 그라디언트 배경 생성
2. `background-clip: text`: 배경을 텍스트 모양으로 클리핑
3. `text-fill-color: transparent`: 텍스트를 투명하게
4. 결과: 그라디언트가 텍스트 안에만 표시

#### 4. Active 링크 스타일

```css
.nav-link.active {
  color: #646cff;
  background-color: rgba(100, 108, 255, 0.15);
}

.nav-link.active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #646cff, transparent);
}
```

**특징:**

- 배경색과 텍스트 색 변경
- `::after` 가상 요소로 하단에 그라디언트 밑줄 추가
- `transform: translateX(-50%)`: 중앙 정렬

---

### 3. Footer 컴포넌트 - 푸터

`src/components/Footer.tsx`

```typescript
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Practice Blog</h3>
            <p className="footer-description">
              Vite + React로 만든 학습용 블로그 프로젝트
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Links</h4>
            <ul className="footer-links">
              <li>
                <a
                  href="https://vitejs.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vite
                </a>
              </li>
              {/* ... */}
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Project</h4>
            <ul className="footer-links">{/* ... */}</ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Practice Blog. 공부를 위한 프로젝트입니다.
          </p>
          <p className="footer-tech">
            Built with <span className="heart">❤️</span> using Vite + React +
            TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
```

**핵심 기능:**

#### 1. 동적 연도 표시

```typescript
const currentYear = new Date().getFullYear();
// 2024년이면 2024, 2025년이면 2025 자동 업데이트
```

#### 2. 외부 링크 보안

```html
<a href="https://vitejs.dev/" target="_blank" rel="noopener noreferrer"></a>
```

- **`target="_blank"`**: 새 탭에서 열기
- **`rel="noopener"`**: 새 페이지가 원본 페이지에 접근 못하게 (보안)
- **`rel="noreferrer"`**: referrer 정보 전달 안함 (프라이버시)

**보안 이슈 (없으면):**

```javascript
// 악의적인 사이트가 할 수 있는 일:
window.opener.location = "http://phishing-site.com";
```

#### 3. Grid 레이아웃

```css
.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
}
```

**레이아웃:**

```
┌───────────────────┬─────────┬─────────┐
│                   │         │         │
│   2배 너비        │  1배    │  1배    │
│   (소개)          │ (Links) │(Project)│
│                   │         │         │
└───────────────────┴─────────┴─────────┘
```

#### 4. 하트 애니메이션

```css
.heart {
  color: #e25555;
  animation: heartbeat 1.5s ease-in-out infinite;
}

@keyframes heartbeat {
  0%,
  100% {
    transform: scale(1);
  }
  10%,
  30% {
    transform: scale(1.1);
  }
  20%,
  40% {
    transform: scale(1);
  }
}
```

**효과:**

```
❤️ → ❤️ → ❤️ → ❤️ (반복)
1.0   1.1   1.0   1.1 (크기)
```

---

### 4. 반응형 디자인

#### Navigation - 모바일

```css
@media (max-width: 768px) {
  .nav-container {
    flex-direction: column; /* 세로 방향 */
    gap: 1rem;
  }

  .nav-menu {
    width: 100%;
    justify-content: center;
  }

  .logo-text {
    display: none; /* 아이콘만 표시 */
  }
}
```

**변화:**

```
데스크톱:
┌──────────────────────────────────────┐
│ 🚀 Practice Blog    Home About Posts │
└──────────────────────────────────────┘

모바일:
┌──────────────────┐
│       🚀         │
│ Home About Posts │
└──────────────────┘
```

#### Footer - 모바일

```css
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr; /* 1열로 변경 */
    gap: 2rem;
  }
}
```

**변화:**

```
데스크톱:
┌───────┬───────┬───────┐
│   1   │   2   │   3   │
└───────┴───────┴───────┘

모바일:
┌───────┐
│   1   │
├───────┤
│   2   │
├───────┤
│   3   │
└───────┘
```

---

## 🔄 페이지에 Layout 적용

### Before (Layout 없이)

```typescript
function Home() {
  return (
    <div className="App">
      <header>홈 페이지</header>
      <main>콘텐츠</main>
    </div>
  );
}
```

**문제점:**

- ❌ 각 페이지마다 네비게이션/푸터 중복 코드
- ❌ 스타일 일관성 유지 어려움
- ❌ 수정 시 모든 페이지 변경 필요

### After (Layout 사용)

```typescript
import Layout from "../components/Layout";

function Home() {
  return (
    <Layout>
      <div className="App">
        <header>홈 페이지</header>
        <main>콘텐츠</main>
      </div>
    </Layout>
  );
}
```

**장점:**

- ✅ 네비게이션/푸터 코드 한 곳에서 관리
- ✅ 모든 페이지 일관된 레이아웃
- ✅ 한 번 수정하면 모든 페이지 적용
- ✅ 코드 중복 제거

---

## 🎨 CSS 구조 설명

### 1. CSS 변수 활용 (향후 개선)

현재는 하드코딩되어 있지만, 다음과 같이 개선 가능:

```css
:root {
  --primary-color: #646cff;
  --bg-dark: #1a1a1a;
  --border-color: #333;
  --text-muted: #888;
}

.navigation {
  background-color: var(--bg-dark);
  border-bottom: 1px solid var(--border-color);
}
```

**장점:**

- 테마 색상 한 곳에서 관리
- 다크/라이트 모드 전환 쉬움

### 2. BEM 명명 규칙 (부분 적용)

```css
/* Block */
.navigation {
}

/* Block__Element */
.nav-container {
}
.nav-logo {
}
.nav-menu {
}

/* Block__Element--Modifier */
.nav-link {
}
.nav-link.active {
} /* Modifier */
```

---

## 🚀 사용자 경험 개선

### 1. 현재 페이지 표시

```typescript
<Link className={`nav-link ${isActive("/about") ? "active" : ""}`}>About</Link>
```

**효과:**

- 사용자가 현재 어느 페이지에 있는지 명확히 인지
- 시각적 피드백 제공

### 2. Sticky Navigation

```css
position: sticky;
top: 0;
```

**효과:**

- 스크롤해도 네비게이션이 항상 접근 가능
- 페이지 간 이동이 빠르고 편리

### 3. 호버 효과

```css
.nav-link:hover {
  color: #fff;
  background-color: rgba(100, 108, 255, 0.1);
}
```

**효과:**

- 클릭 가능한 요소임을 시각적으로 알림
- 인터랙티브한 느낌

---

## 📊 컴포넌트 재사용성

### 장점

1. **DRY 원칙** (Don't Repeat Yourself)

   - 네비게이션/푸터 코드를 한 번만 작성
   - 수정이 필요하면 한 곳만 변경

2. **일관성**

   - 모든 페이지가 동일한 레이아웃 구조
   - 브랜드 일관성 유지

3. **유지보수성**

   - 레이아웃 변경 시 모든 페이지 자동 업데이트
   - 버그 수정이 한 번에 적용

4. **테스트 용이성**
   - 레이아웃 컴포넌트만 독립적으로 테스트 가능

---

## 🎯 다음 개선 사항

### 1. 모바일 햄버거 메뉴

```typescript
const [isMenuOpen, setIsMenuOpen] = useState(false);

<button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
  ☰
</button>

<ul className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
  {/* 메뉴 항목 */}
</ul>
```

### 2. 다크/라이트 모드 토글

```typescript
const [theme, setTheme] = useState("dark");

<button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
  {theme === "dark" ? "🌙" : "☀️"}
</button>;
```

### 3. 검색 기능

```typescript
<div className="nav-search">
  <input type="search" placeholder="검색..." />
  <button>🔍</button>
</div>
```

### 4. Breadcrumbs (경로 표시)

```typescript
function Breadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="breadcrumbs">
      <Link to="/">Home</Link>
      {paths.map((path, index) => (
        <span key={index}> / {path}</span>
      ))}
    </nav>
  );
}
```

---

## 🔍 트러블슈팅

### 문제 1: Layout이 전체 높이를 차지하지 않음

**증상:**

```
┌─────────────┐
│ Navigation  │
├─────────────┤
│   Content   │
├─────────────┤  ← 여기서 끝남 (화면 중간)
│             │
│   (공백)    │
│             │
└─────────────┘
```

**해결:**

```css
.layout {
  min-height: 100vh; /* 최소 전체 화면 높이 */
  display: flex;
  flex-direction: column;
}

.layout-main {
  flex: 1; /* 남은 공간 모두 차지 */
}
```

### 문제 2: Sticky Navigation이 작동 안 함

**원인:**

- 부모 요소에 `overflow: hidden` 있으면 작동 안 함

**해결:**

```css
/* 부모 요소들에서 제거 */
.parent {
  /* overflow: hidden; ❌ */
  overflow: visible; /* ✅ */
}
```

### 문제 3: Active 링크 스타일이 안 보임

**확인 사항:**

```typescript
// basename 설정 확인
<BrowserRouter basename="/practice">

// isActive 함수 확인
const isActive = (path: string) => {
  console.log('Current:', location.pathname, 'Checking:', path);
  return location.pathname === path;
};
```

---

## 📚 참고 자료

- [React Router - useLocation](https://reactrouter.com/en/main/hooks/use-location)
- [CSS Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [CSS Position Sticky](https://developer.mozilla.org/en-US/docs/Web/CSS/position#sticky)

---

## 💡 결론

공통 레이아웃 컴포넌트를 구현하여 다음을 달성했습니다:

✅ **코드 재사용성**

- Navigation, Footer 컴포넌트 재사용
- DRY 원칙 적용

✅ **일관된 UI**

- 모든 페이지 동일한 레이아웃
- 브랜드 일관성 유지

✅ **향상된 UX**

- Sticky Navigation으로 쉬운 이동
- 현재 페이지 하이라이트
- 반응형 디자인

✅ **유지보수성**

- 레이아웃 변경이 모든 페이지에 자동 적용
- 한 곳에서 관리

✅ **확장 가능한 구조**

- 새로운 페이지 추가가 쉬움
- 레이아웃 커스터마이징 가능

이제 프로젝트는 전문적인 웹 애플리케이션의 구조를 갖추게 되었습니다! 🎉

---

**작성일:** 2024-10-02  
**버전:** React 19, React Router 7, Vite 7
