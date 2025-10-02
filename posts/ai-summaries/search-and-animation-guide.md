# 검색 기능 & 페이지 전환 애니메이션 가이드

## 🎯 구현 목표

1. **검색 기능**: 포스트 제목과 설명에서 실시간 검색
2. **페이지 전환 애니메이션**: 부드러운 페이지 전환 효과

---

## 📦 설치된 패키지

```bash
npm install framer-motion
```

**Framer Motion**: React를 위한 프로덕션 레벨 애니메이션 라이브러리

- 선언적 API
- 제스처 지원
- 레이아웃 애니메이션
- 서버 사이드 렌더링 지원

---

## 🔍 검색 기능 구현

### 1. SearchBar 컴포넌트

`src/components/SearchBar.tsx`

```typescript
import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

function SearchBar({
  onSearch,
  placeholder = "포스트 검색...",
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    // 디바운싱: 300ms 후에 검색 실행
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && <button onClick={handleClear}>✕</button>}
      </div>
    </div>
  );
}
```

**핵심 개념:**

#### 디바운싱 (Debouncing)

```typescript
useEffect(() => {
  const timer = setTimeout(() => {
    onSearch(query);
  }, 300);

  return () => clearTimeout(timer);
}, [query, onSearch]);
```

**작동 방식:**

```
사용자 입력: "r" → 타이머 시작 (300ms)
사용자 입력: "re" → 이전 타이머 취소, 새 타이머 시작
사용자 입력: "rea" → 이전 타이머 취소, 새 타이머 시작
사용자 입력: "reac" → 이전 타이머 취소, 새 타이머 시작
사용자 입력: "react" → 300ms 대기 → 검색 실행!
```

**장점:**

- 불필요한 검색 요청 감소
- 성능 최적화
- 부드러운 사용자 경험

#### 클린업 함수 (Cleanup Function)

```typescript
return () => clearTimeout(timer);
```

- 컴포넌트 언마운트 시 타이머 제거
- 메모리 누수 방지
- 이전 타이머 취소

---

### 2. Posts 페이지에 검색 적용

```typescript
function Posts() {
  const [searchQuery, setSearchQuery] = useState("");

  const allPosts = [
    { id: 1, title: "Vite 가이드", description: "..." },
    // ...
  ];

  // 검색 필터링
  const filteredPosts = allPosts.filter((post) => {
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query)
    );
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Layout>
      <SearchBar onSearch={handleSearch} />

      <h2>
        {searchQuery
          ? `검색 결과 (${filteredPosts.length}개)`
          : `전체 포스트 (${allPosts.length}개)`}
      </h2>

      {filteredPosts.length === 0 ? (
        <p>
          {searchQuery
            ? `"${searchQuery}"에 대한 검색 결과가 없습니다.`
            : "아직 작성된 포스트가 없습니다."}
        </p>
      ) : (
        <div>{/* 포스트 목록 */}</div>
      )}
    </Layout>
  );
}
```

**검색 로직:**

1. **대소문자 구분 없음**: `.toLowerCase()`
2. **제목과 설명 모두 검색**: OR 조건
3. **부분 일치**: `.includes()`

**개선 가능한 점:**

- 태그로 필터링
- 카테고리별 필터
- 정렬 옵션 (날짜, 제목)
- 하이라이트 표시

---

## 🎬 페이지 전환 애니메이션 구현

### 1. AnimatedPage 컴포넌트

`src/components/AnimatedPage.tsx`

```typescript
import { motion } from "framer-motion";
import { ReactNode } from "react";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

function AnimatedPage({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  );
}
```

**애니메이션 단계:**

1. **initial (초기 상태)**

   - opacity: 0 (투명)
   - y: 20 (아래로 20px)

2. **animate (진입 애니메이션)**

   - opacity: 1 (불투명)
   - y: 0 (원래 위치)
   - duration: 0.4초
   - easing: easeOut (점점 느리게)

3. **exit (퇴장 애니메이션)**
   - opacity: 0 (투명)
   - y: -20 (위로 20px)
   - duration: 0.3초
   - easing: easeIn (점점 빠르게)

**시각적 효과:**

```
진입: 아래에서 위로 페이드 인 ↑
퇴장: 위로 사라지며 페이드 아웃 ↑
```

---

### 2. App.tsx 설정

```typescript
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}
```

**핵심 포인트:**

#### `AnimatePresence`

- exit 애니메이션을 가능하게 함
- 컴포넌트가 DOM에서 제거되기 전에 애니메이션 실행

#### `mode="wait"`

- 현재 페이지가 완전히 퇴장한 후 새 페이지 진입
- 페이지 간 겹침 방지

#### `key={location.pathname}`

- URL이 변경되면 새로운 컴포넌트로 인식
- 애니메이션 트리거

#### `location={location}`

- React Router와 Framer Motion 동기화

---

### 3. 페이지에 애니메이션 적용

```typescript
function Home() {
  return (
    <AnimatedPage>
      <Layout>{/* 페이지 내용 */}</Layout>
    </AnimatedPage>
  );
}
```

**모든 페이지에 적용:**

- Home.tsx
- About.tsx
- Posts.tsx
- PostDetail.tsx
- NotFound.tsx

---

## 🎨 애니메이션 커스터마이징

### 1. 다양한 애니메이션 변형

#### 슬라이드 애니메이션

```typescript
const slideVariants = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 100, opacity: 0 },
};
```

#### 스케일 애니메이션

```typescript
const scaleVariants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 1.1, opacity: 0 },
};
```

#### 회전 애니메이션

```typescript
const rotateVariants = {
  initial: { rotateY: -90, opacity: 0 },
  animate: { rotateY: 0, opacity: 1 },
  exit: { rotateY: 90, opacity: 0 },
};
```

### 2. 스태거 애니메이션 (순차 애니메이션)

포스트 카드가 순서대로 나타나는 효과:

```typescript
const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1, // 0.1초 간격으로 순차 애니메이션
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

<motion.div variants={containerVariants} initial="initial" animate="animate">
  {posts.map((post) => (
    <motion.article key={post.id} variants={itemVariants}>
      {/* 포스트 카드 */}
    </motion.article>
  ))}
</motion.div>;
```

### 3. 호버 애니메이션

```typescript
<motion.div
  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
  {/* 내용 */}
</motion.div>
```

---

## 🔧 SearchBar 스타일링

`src/components/SearchBar.css`

```css
.search-input {
  width: 100%;
  padding: 0.875rem 3rem;
  font-size: 1rem;
  background: #1a1a1a;
  border: 2px solid #333;
  border-radius: 12px;
  transition: all 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #646cff;
  box-shadow: 0 0 0 3px rgba(100, 108, 255, 0.1);
}
```

**특징:**

- 둥근 모서리 (12px)
- 포커스 시 파란 테두리와 그림자
- 아이콘과 클리어 버튼 포함
- 반응형 디자인

---

## 🚀 성능 최적화

### 1. 디바운싱으로 검색 최적화

```typescript
// 300ms 디바운스
useEffect(() => {
  const timer = setTimeout(() => {
    onSearch(query);
  }, 300);
  return () => clearTimeout(timer);
}, [query]);
```

**효과:**

- 사용자가 타이핑을 멈춘 후에만 검색 실행
- 불필요한 렌더링 감소
- 성능 향상

### 2. useMemo로 검색 결과 캐싱

```typescript
import { useMemo } from "react";

const filteredPosts = useMemo(() => {
  return allPosts.filter((post) => {
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query)
    );
  });
}, [allPosts, searchQuery]);
```

**효과:**

- searchQuery나 allPosts가 변경될 때만 재계산
- 불필요한 필터링 방지

### 3. 애니메이션 성능

Framer Motion은 자동으로 최적화:

- GPU 가속 (transform, opacity 사용)
- will-change CSS 속성 자동 적용
- 60fps 유지

---

## 🎯 사용자 경험 개선

### 1. 검색 결과 피드백

```typescript
<h2>
  {searchQuery
    ? `검색 결과 (${filteredPosts.length}개)`
    : `전체 포스트 (${allPosts.length}개)`}
</h2>
```

- 현재 검색어 표시
- 검색 결과 개수 표시
- 빈 검색 결과 안내

### 2. 클리어 버튼

```typescript
{
  query && (
    <button className="clear-button" onClick={handleClear}>
      ✕
    </button>
  );
}
```

- 검색어가 있을 때만 표시
- 한 번의 클릭으로 초기화

### 3. 부드러운 페이지 전환

```typescript
mode = "wait"; // 현재 페이지가 완전히 사라진 후 새 페이지 진입
```

- 페이지 간 깜빡임 없음
- 자연스러운 흐름

---

## 📊 Before & After

### Before (검색 & 애니메이션 없음)

```
포스트 목록 → 클릭 → 페이지 즉시 전환 (깜빡임)
필터링 없음
```

### After (검색 & 애니메이션 추가)

```
검색바 → 실시간 필터링 → 부드러운 애니메이션
포스트 목록 → 클릭 → 페이드 아웃 → 페이드 인 (부드러움)
```

**개선된 점:**

- ✅ 빠른 포스트 검색
- ✅ 실시간 결과 업데이트
- ✅ 부드러운 페이지 전환
- ✅ 현대적인 느낌의 UI

---

## 🐛 트러블슈팅

### 문제 1: 애니메이션이 작동하지 않음

**증상:**

```
페이지 전환 시 애니메이션이 보이지 않음
```

**원인:**

- AnimatePresence에 key가 없음
- mode 설정 누락

**해결:**

```typescript
<AnimatePresence mode="wait">
  <Routes location={location} key={location.pathname}>
```

### 문제 2: 검색 시 너무 많은 렌더링

**증상:**

```
타이핑할 때마다 컴포넌트가 재렌더링됨
```

**원인:**

- 디바운싱이 없음

**해결:**

```typescript
useEffect(() => {
  const timer = setTimeout(() => {
    onSearch(query);
  }, 300); // 300ms 디바운스 추가
  return () => clearTimeout(timer);
}, [query]);
```

### 문제 3: 애니메이션이 너무 느림/빠름

**해결:**

```typescript
transition: {
  duration: 0.4, // 숫자 조정 (0.2 ~ 0.6 권장)
  ease: "easeOut", // easeIn, easeOut, easeInOut
}
```

---

## 🎯 다음 개선 사항

### 1. 고급 검색

```typescript
- 태그 필터링
- 카테고리별 검색
- 날짜 범위 검색
- 정렬 옵션 (날짜, 제목, 인기도)
```

### 2. 검색 하이라이트

```typescript
// 검색어 하이라이트 표시
const highlightText = (text: string, query: string) => {
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i}>{part}</mark>
    ) : (
      part
    )
  );
};
```

### 3. 검색 히스토리

```typescript
// localStorage에 검색 기록 저장
const [searchHistory, setSearchHistory] = useState<string[]>([]);

useEffect(() => {
  const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
  setSearchHistory(history);
}, []);

const addToHistory = (query: string) => {
  const updated = [query, ...searchHistory.filter((q) => q !== query)].slice(
    0,
    5
  );
  setSearchHistory(updated);
  localStorage.setItem("searchHistory", JSON.stringify(updated));
};
```

### 4. 애니메이션 설정 옵션

```typescript
// 사용자가 애니메이션 끄기 가능
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

const pageVariants = prefersReducedMotion.matches
  ? {} // 애니메이션 없음
  : {
      /* 애니메이션 설정 */
    };
```

---

## 📚 참고 자료

- [Framer Motion 공식 문서](https://www.framer.com/motion/)
- [React 디바운싱 패턴](https://dmitripavlutin.com/react-throttle-debounce/)
- [CSS 애니메이션 성능](https://web.dev/animations-guide/)

---

## 💡 결론

검색 기능과 페이지 전환 애니메이션을 구현하여 다음을 달성했습니다:

✅ **검색 기능**

- 실시간 필터링
- 디바운싱으로 최적화
- 직관적인 UI

✅ **페이지 전환 애니메이션**

- 부드러운 페이드 인/아웃
- Framer Motion 활용
- 60fps 성능 유지

✅ **향상된 UX**

- 빠른 포스트 검색
- 자연스러운 페이지 전환
- 현대적인 느낌

이제 블로그는 더욱 인터랙티브하고 사용하기 편리해졌습니다! 🎉

---

**작성일:** 2024-10-02  
**버전:** React 19, Framer Motion 11, Vite 7
