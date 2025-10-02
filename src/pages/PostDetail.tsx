import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import Layout from "../components/Layout";
import "./PostDetail.css";
import "highlight.js/styles/github-dark.css";

interface Post {
  id: number;
  title: string;
  date: string;
  category: string;
  description: string;
  filename: string;
}

// 포스트 메타데이터 (실제로는 API나 JSON 파일에서 가져올 수 있음)
const postsMetadata: Post[] = [
  {
    id: 1,
    title: "Vite + React 프로젝트 가이드",
    date: "2024-10-02",
    category: "ai-summaries",
    description: "Vite의 특징과 프로젝트 파일 구조 설명",
    filename: "vite-project-guide.md",
  },
  {
    id: 2,
    title: "React Router 도입 가이드",
    date: "2024-10-02",
    category: "ai-summaries",
    description: "React Router를 활용한 SPA 라우팅 구현",
    filename: "react-router-implementation-guide.md",
  },
  {
    id: 3,
    title: "공통 레이아웃 컴포넌트 구현",
    date: "2024-10-02",
    category: "ai-summaries",
    description: "Navigation, Footer, Layout 컴포넌트로 일관된 UI 구축",
    filename: "layout-components-guide.md",
  },
  {
    id: 4,
    title: "마크다운 렌더링 & 포스트 상세 페이지",
    date: "2024-10-02",
    category: "ai-summaries",
    description: "react-markdown으로 블로그 포스트를 아름답게 렌더링",
    filename: "markdown-rendering-guide.md",
  },
];

function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const post = postsMetadata.find((p) => p.id === Number(id));

  useEffect(() => {
    if (!post) {
      setError("포스트를 찾을 수 없습니다.");
      setLoading(false);
      return;
    }

    // 마크다운 파일 로드
    const loadMarkdown = async () => {
      try {
        setLoading(true);

        // 개발 환경과 프로덕션 환경에서 올바른 경로 생성
        const basePath = import.meta.env.BASE_URL; // Vite의 base 경로 (/practice/)
        const filePath = `${basePath}posts/${post.category}/${post.filename}`;

        console.log("Fetching markdown from:", filePath); // 디버깅용

        const response = await fetch(filePath);

        if (!response.ok) {
          throw new Error(`파일을 불러올 수 없습니다. (${response.status})`);
        }

        const text = await response.text();
        setContent(text);
        setError(null);
      } catch (err) {
        console.error("마크다운 로드 오류:", err);
        setError("포스트를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadMarkdown();
  }, [id, post]);

  if (loading) {
    return (
      <Layout>
        <div className="post-detail">
          <div className="loading">
            <div className="spinner"></div>
            <p>포스트를 불러오는 중...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div className="post-detail">
          <div className="error">
            <h2>😕 {error || "포스트를 찾을 수 없습니다"}</h2>
            <Link to="/posts" className="back-button">
              ← 포스트 목록으로
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="post-detail">
        <div className="post-header">
          <button onClick={() => navigate(-1)} className="back-button">
            ← 뒤로 가기
          </button>

          <div className="post-meta">
            <span
              className={`category-badge ${
                post.category === "my-learning" ? "learning" : "ai"
              }`}
            >
              {post.category === "my-learning" ? "📖 학습" : "🤖 AI"}
            </span>
            <time className="post-date">{post.date}</time>
          </div>

          <h1 className="post-title">{post.title}</h1>
          <p className="post-description">{post.description}</p>
        </div>

        <article className="markdown-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
            components={{
              // 코드 블록 커스터마이징
              code({ node, inline, className, children, ...props }) {
                return inline ? (
                  <code className="inline-code" {...props}>
                    {children}
                  </code>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              // 링크는 외부 링크면 새 탭에서 열기
              a({ node, href, children, ...props }) {
                const isExternal =
                  href?.startsWith("http") || href?.startsWith("https");
                return (
                  <a
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    {...props}
                  >
                    {children}
                  </a>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </article>

        <div className="post-footer">
          <Link to="/posts" className="back-to-list">
            📝 포스트 목록으로 돌아가기
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default PostDetail;
