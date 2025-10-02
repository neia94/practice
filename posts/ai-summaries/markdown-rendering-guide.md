# 포스트 상세 페이지 & 마크다운 렌더링 가이드

## 🎯 목표

마크다운으로 작성된 블로그 포스트를 웹에서 아름답게 렌더링하고, 동적 라우팅을 통해 개별 포스트 페이지를 구현합니다.

---

## 📦 설치된 패키지

```bash
npm install react-markdown remark-gfm rehype-raw rehype-highlight
```

### 패키지 설명

| 패키지             | 용도                                                |
| ------------------ | --------------------------------------------------- |
| `react-markdown`   | 마크다운을 React 컴포넌트로 변환                    |
| `remark-gfm`       | GitHub Flavored Markdown 지원 (테이블, 체크박스 등) |
| `rehype-raw`       | HTML 태그 렌더링 허용                               |
| `rehype-highlight` | 코드 블록 신택스 하이라이팅                         |

---

## 🏗️ 파일 구조

```
src/
├── pages/
│   ├── PostDetail.tsx       ✅ 포스트 상세 페이지
│   ├── PostDetail.css       ✅ 마크다운 스타일
│   └── Posts.tsx            (수정) 링크 추가
├── App.tsx                  (수정) /posts/:id 라우트 추가
public/
└── posts/
    ├── ai-summaries/        ✅ AI 생성 포스트 (*.md)
    └── my-learning/         ✅ 학습 노트 (*.md)
```

---

## 🔧 구현 상세

### 1. PostDetail 컴포넌트 - 핵심 로직

`src/pages/PostDetail.tsx`

```typescript
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  // 포스트 메타데이터
  const post = postsMetadata.find((p) => p.id === Number(id));

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        const response = await fetch(
          `/posts/${post.category}/${post.filename}`
        );
        const text = await response.text();
        setContent(text);
      } catch (err) {
        console.error("마크다운 로드 오류:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMarkdown();
  }, [id, post]);

  return (
    <Layout>
      <div className="post-detail">
        <article className="markdown-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
          >
            {content}
          </ReactMarkdown>
        </article>
      </div>
    </Layout>
  );
}
```

**핵심 개념:**

#### 1. Dynamic Route Parameter (`useParams`)

```typescript
const { id } = useParams<{ id: string }>();
// URL이 /posts/1이면 id = "1"
// URL이 /posts/2면 id = "2"
```

**작동 방식:**

```
사용자 클릭: <Link to="/posts/1">
    ↓
URL 변경: /posts/1
    ↓
React Router가 :id를 "1"로 매칭
    ↓
useParams()가 { id: "1" } 반환
    ↓
포스트 ID 1의 데이터 로드
```

#### 2. 비동기 마크다운 로드 (`fetch`)

```typescript
const response = await fetch(`/posts/${post.category}/${post.filename}`);
const text = await response.text();
setContent(text);
```

**파일 경로 예시:**

```
ID 1 → /posts/ai-summaries/vite-project-guide.md
ID 2 → /posts/ai-summaries/react-router-implementation-guide.md
ID 3 → /posts/ai-summaries/layout-components-guide.md
```

#### 3. 로딩 상태 관리

```typescript
const [loading, setLoading] = useState(true);
const [content, setContent] = useState<string>("");
const [error, setError] = useState<string | null>(null);
```

**상태 흐름:**

```
초기: loading=true, content="", error=null
  ↓
로딩 중: 스피너 표시
  ↓
성공: loading=false, content="# 마크다운...", error=null
  ↓
실패: loading=false, content="", error="오류 메시지"
```

---

### 2. ReactMarkdown 설정

#### Plugins 설명

```typescript
<ReactMarkdown
  remarkPlugins={[remarkGfm]}
  rehypePlugins={[rehypeRaw, rehypeHighlight]}
>
  {content}
</ReactMarkdown>
```

**Remark Plugins (마크다운 파싱):**

- `remarkGfm`: GitHub Flavored Markdown
  - ✅ 테이블: `| 열1 | 열2 |`
  - ✅ 체크박스: `- [ ] 할 일`
  - ✅ 취소선: `~~삭제~~`
  - ✅ 자동 링크

**Rehype Plugins (HTML 변환):**

- `rehypeRaw`: HTML 태그를 실제 HTML로 렌더링
  - `<strong>`, `<em>` 등
- `rehypeHighlight`: 코드 블록 신택스 하이라이팅
  - `highlight.js` 라이브러리 사용

#### 컴포넌트 커스터마이징

```typescript
components={{
  // 인라인 코드 vs 코드 블록 구분
  code({ inline, children, ...props }) {
    return inline ? (
      <code className="inline-code">{children}</code>
    ) : (
      <code className="code-block">{children}</code>
    );
  },

  // 외부 링크는 새 탭에서 열기
  a({ href, children, ...props }) {
    const isExternal = href?.startsWith("http");
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  },
}}
```

**인라인 코드 vs 코드 블록:**

````markdown
인라인: `const x = 1;` → <code className="inline-code">
블록:

```js
const x = 1;
```
````

→ <pre><code className="code-block">

````

---

### 3. 마크다운 스타일링

`src/pages/PostDetail.css`

#### 제목 스타일

```css
.markdown-content h1 {
  font-size: 2rem;
  font-weight: 700;
  margin: 2.5rem 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #333;
  color: #fff;
}
````

**시각적 계층 구조:**

```
h1: 2rem, 하단 테두리
h2: 1.75rem
h3: 1.4rem
h4: 1.2rem
```

#### 코드 블록 스타일

```css
/* 인라인 코드 */
.markdown-content .inline-code {
  padding: 0.2rem 0.4rem;
  background: rgba(100, 108, 255, 0.15);
  border: 1px solid rgba(100, 108, 255, 0.3);
  border-radius: 4px;
  color: #a5b4fc;
}

/* 코드 블록 */
.markdown-content pre {
  margin: 1.5rem 0;
  padding: 1.25rem;
  background: #1e1e1e;
  border: 1px solid #333;
  border-radius: 8px;
  overflow-x: auto;
}
```

**예시:**

```
인라인: `code` → 파란 배경, 작은 패딩
블록:
```

code

```
→ 어두운 배경, 스크롤 가능
```

#### 테이블 스타일

```css
.markdown-content table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #333;
  border-radius: 8px;
  overflow: hidden;
}

.markdown-content thead {
  background: rgba(100, 108, 255, 0.1);
}

.markdown-content th {
  padding: 0.75rem 1rem;
  border-bottom: 2px solid #646cff;
  font-weight: 600;
  color: #fff;
}

.markdown-content tbody tr:hover {
  background: rgba(100, 108, 255, 0.05);
}
```

**효과:**

- 헤더: 파란 배경, 두꺼운 하단 테두리
- 행 호버: 약간 밝아짐
- 둥근 모서리: 현대적인 느낌

#### 인용구 스타일

```css
.markdown-content blockquote {
  margin: 1.5rem 0;
  padding: 1rem 1.5rem;
  border-left: 4px solid #646cff;
  background: rgba(100, 108, 255, 0.05);
  border-radius: 0 6px 6px 0;
}
```

**시각적 효과:**

```
│ 인용구 내용
│ 왼쪽에 파란 세로선
│ 약간 밝은 배경
```

---

### 4. 로딩 및 에러 처리

#### 로딩 스피너

```css
.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #333;
  border-top-color: #646cff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

**애니메이션:**

```
○ → ◔ → ◑ → ◕ → ○ (회전)
```

#### 에러 화면

```typescript
if (error || !post) {
  return (
    <Layout>
      <div className="error">
        <h2>😕 {error || "포스트를 찾을 수 없습니다"}</h2>
        <Link to="/posts" className="back-button">
          ← 포스트 목록으로
        </Link>
      </div>
    </Layout>
  );
}
```

---

### 5. 포스트 메타데이터 관리

```typescript
interface Post {
  id: number;
  title: string;
  date: string;
  category: string;
  description: string;
  filename: string;
}

const postsMetadata: Post[] = [
  {
    id: 1,
    title: "Vite + React 프로젝트 가이드",
    date: "2024-10-02",
    category: "ai-summaries",
    description: "Vite의 특징과 프로젝트 파일 구조 설명",
    filename: "vite-project-guide.md",
  },
  // ...
];
```

**향후 개선 방안:**

#### 1. JSON 파일로 분리

```typescript
// public/posts-metadata.json
import metadata from "/posts-metadata.json";
```

#### 2. 프론트매터 파싱

```markdown
---
title: Vite + React 프로젝트 가이드
date: 2024-10-02
category: ai-summaries
---

# 본문 시작
```

```typescript
import matter from "gray-matter";

const { data, content } = matter(markdownText);
// data: { title, date, category }
// content: 본문
```

#### 3. CMS 연동

- Contentful, Sanity 등의 Headless CMS
- API로 포스트 데이터 가져오기

---

## 🎨 신택스 하이라이팅

### Highlight.js 테마

```typescript
import "highlight.js/styles/github-dark.css";
```

**다른 테마 옵션:**

```typescript
// 다크 테마
import "highlight.js/styles/github-dark.css";
import "highlight.js/styles/monokai.css";
import "highlight.js/styles/atom-one-dark.css";

// 라이트 테마
import "highlight.js/styles/github.css";
import "highlight.js/styles/atom-one-light.css";
```

### 코드 하이라이팅 예시

**마크다운:**

````markdown
```typescript
function hello(name: string) {
  console.log(`Hello, ${name}!`);
}
```
````

**렌더링 결과:**

```typescript
function hello(name: string) {
  console.log(`Hello, ${name}!`);
}
```

- `function`, `console.log`: 키워드 색상
- `name`, `string`: 변수/타입 색상
- `"Hello, ${name}!"`: 문자열 색상

---

## 🔄 라우팅 흐름

### 전체 흐름

```
1. Posts 페이지에서 포스트 클릭
   <Link to="/posts/1">Vite 가이드</Link>

2. URL 변경: /posts/1

3. React Router가 매칭:
   <Route path="/posts/:id" element={<PostDetail />} />

4. PostDetail 컴포넌트 렌더링:
   - useParams()로 id="1" 추출
   - 메타데이터에서 post 찾기
   - 마크다운 파일 로드: /posts/ai-summaries/vite-project-guide.md
   - ReactMarkdown으로 렌더링

5. 사용자가 마크다운 콘텐츠 확인
```

### 코드 흐름

```typescript
// Posts.tsx
<Link to={`/posts/${post.id}`}>읽기 →</Link>

// App.tsx
<Route path="/posts/:id" element={<PostDetail />} />

// PostDetail.tsx
const { id } = useParams(); // "1"
const post = postsMetadata.find(p => p.id === Number(id));

const response = await fetch(`/posts/${post.category}/${post.filename}`);
const text = await response.text();

<ReactMarkdown>{text}</ReactMarkdown>
```

---

## 📱 반응형 디자인

```css
@media (max-width: 768px) {
  .post-title {
    font-size: 1.75rem; /* 2.5rem → 1.75rem */
  }

  .markdown-content h1 {
    font-size: 1.5rem; /* 2rem → 1.5rem */
  }

  .markdown-content pre {
    font-size: 0.85rem; /* 0.9rem → 0.85rem */
  }
}
```

**모바일 최적화:**

- 제목 크기 축소
- 코드 폰트 크기 축소
- 테이블 스크롤 가능

---

## 🚀 성능 최적화

### 1. 코드 스플리팅

```typescript
import { lazy, Suspense } from "react";

const PostDetail = lazy(() => import("./pages/PostDetail"));

<Suspense fallback={<div>Loading...</div>}>
  <Route path="/posts/:id" element={<PostDetail />} />
</Suspense>;
```

**효과:**

- PostDetail 번들을 별도 파일로 분리
- 포스트 페이지 방문 시에만 로드
- 초기 번들 크기 감소

### 2. 마크다운 캐싱

```typescript
const markdownCache = new Map<string, string>();

const loadMarkdown = async (url: string) => {
  if (markdownCache.has(url)) {
    return markdownCache.get(url);
  }

  const response = await fetch(url);
  const text = await response.text();
  markdownCache.set(url, text);
  return text;
};
```

**효과:**

- 같은 포스트 재방문 시 캐시에서 로드
- 네트워크 요청 감소

### 3. 이미지 최적화

```typescript
// Vite의 이미지 최적화
import image from "./image.jpg?w=800&format=webp";

<img src={image} loading="lazy" />;
```

---

## 🎯 GitHub Flavored Markdown 기능

### 1. 테이블

```markdown
| 특징 | Vite | Webpack |
| ---- | ---- | ------- |
| 속도 | 빠름 | 느림    |
```

### 2. 체크박스

```markdown
- [x] 완료된 작업
- [ ] 진행 중인 작업
```

### 3. 취소선

```markdown
~~삭제된 텍스트~~
```

### 4. 자동 링크

```markdown
https://vitejs.dev → 자동으로 링크 생성
```

---

## 🔍 SEO 최적화 (향후)

### 1. 메타 태그 추가

```typescript
import { Helmet } from "react-helmet-async";

<Helmet>
  <title>{post.title} | Practice Blog</title>
  <meta name="description" content={post.description} />
  <meta property="og:title" content={post.title} />
  <meta property="og:description" content={post.description} />
</Helmet>;
```

### 2. 구조화된 데이터

```typescript
<script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Your Name",
    },
  })}
</script>
```

---

## 🐛 트러블슈팅

### 문제 1: 마크다운 파일을 찾을 수 없음

**증상:**

```
GET http://localhost:5173/posts/ai-summaries/guide.md 404
```

**원인:**

- 마크다운 파일이 `public/` 폴더에 없음

**해결:**

```bash
# 포스트 폴더를 public으로 복사
cp -r posts/ public/
```

### 문제 2: 코드 하이라이팅이 안 됨

**증상:**

- 코드 블록이 회색 배경만 있고 색상이 없음

**원인:**

- highlight.js CSS를 import하지 않음

**해결:**

```typescript
import "highlight.js/styles/github-dark.css";
```

### 문제 3: HTML 태그가 텍스트로 표시됨

**증상:**

```
<strong>강조</strong> → 텍스트로 그대로 표시
```

**원인:**

- rehypeRaw 플러그인이 없음

**해결:**

```typescript
rehypePlugins={[rehypeRaw, rehypeHighlight]}
```

### 문제 4: 테이블이 깨짐

**원인:**

- remarkGfm 플러그인이 없음

**해결:**

```typescript
remarkPlugins={[remarkGfm]}
```

---

## 📚 참고 자료

- [react-markdown 공식 문서](https://github.com/remarkjs/react-markdown)
- [remark 플러그인 목록](https://github.com/remarkjs/remark/blob/main/doc/plugins.md)
- [rehype 플러그인 목록](https://github.com/rehypejs/rehype/blob/main/doc/plugins.md)
- [highlight.js](https://highlightjs.org/)
- [GitHub Flavored Markdown 스펙](https://github.github.com/gfm/)

---

## 💡 결론

포스트 상세 페이지와 마크다운 렌더링을 구현하여 다음을 달성했습니다:

✅ **동적 라우팅**

- `/posts/:id`로 개별 포스트 접근
- useParams로 URL 파라미터 추출

✅ **마크다운 렌더링**

- react-markdown으로 마크다운 파싱
- GFM 지원 (테이블, 체크박스 등)
- 신택스 하이라이팅

✅ **아름다운 스타일**

- 가독성 높은 타이포그래피
- 코드 블록 하이라이팅
- 반응형 디자인

✅ **로딩 및 에러 처리**

- 스피너 애니메이션
- 친절한 에러 메시지
- 404 처리

✅ **확장 가능한 구조**

- 메타데이터 중앙 관리
- 컴포넌트 커스터마이징
- 플러그인 확장 가능

이제 블로그는 실제로 포스트를 읽을 수 있는 완전한 기능을 갖추게 되었습니다! 🎉

---

**작성일:** 2024-10-02  
**버전:** React 19, React Router 7, react-markdown 9
