import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import AnimatedPage from "../components/AnimatedPage";
import SearchBar from "../components/SearchBar";
import "../App.css";

function Posts() {
  const [searchQuery, setSearchQuery] = useState("");

  // 나중에 실제 포스트 데이터로 대체될 예정
  const allPosts = [
    {
      id: 1,
      title: "Vite + React 프로젝트 가이드",
      date: "2024-10-02",
      category: "ai-summaries",
      description: "Vite의 특징과 프로젝트 파일 구조 설명",
    },
    {
      id: 2,
      title: "React Router 도입 가이드",
      date: "2024-10-02",
      category: "ai-summaries",
      description: "React Router를 활용한 SPA 라우팅 구현",
    },
    {
      id: 3,
      title: "공통 레이아웃 컴포넌트 구현",
      date: "2024-10-02",
      category: "ai-summaries",
      description: "Navigation, Footer, Layout 컴포넌트로 일관된 UI 구축",
    },
    {
      id: 4,
      title: "마크다운 렌더링 & 포스트 상세 페이지",
      date: "2024-10-02",
      category: "ai-summaries",
      description: "react-markdown으로 블로그 포스트를 아름답게 렌더링",
    },
    {
      id: 5,
      title: "검색 기능 & 페이지 전환 애니메이션",
      date: "2024-10-02",
      category: "ai-summaries",
      description: "실시간 검색과 Framer Motion으로 부드러운 페이지 전환",
    },
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
    <AnimatedPage>
      <Layout>
        <div className="App">
          <header className="header">
            <h1>📝 Posts</h1>
            <p>블로그 포스트 목록</p>
          </header>

          <main className="main">
            <SearchBar onSearch={handleSearch} />

            <section className="posts-list">
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
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    maxWidth: "800px",
                    margin: "0 auto",
                  }}
                >
                  {filteredPosts.map((post) => (
                    <article
                      key={post.id}
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        padding: "1.5rem",
                        textAlign: "left",
                        background: "#1a1a1a",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "start",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <h3 style={{ margin: 0 }}>{post.title}</h3>
                        <span
                          style={{
                            fontSize: "0.85rem",
                            color: "#888",
                            padding: "0.25rem 0.5rem",
                            background: "#2a2a2a",
                            borderRadius: "4px",
                          }}
                        >
                          {post.category === "my-learning"
                            ? "📖 학습"
                            : "🤖 AI"}
                        </span>
                      </div>
                      <p
                        style={{
                          margin: "0.5rem 0",
                          color: "#aaa",
                          fontSize: "0.9rem",
                        }}
                      >
                        {post.description}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: "1rem",
                        }}
                      >
                        <span style={{ fontSize: "0.85rem", color: "#666" }}>
                          {post.date}
                        </span>
                        <Link
                          to={`/posts/${post.id}`}
                          style={{
                            padding: "0.5rem 1rem",
                            background: "#646cff",
                            color: "white",
                            textDecoration: "none",
                            borderRadius: "4px",
                            fontSize: "0.9rem",
                          }}
                        >
                          읽기 →
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </main>
        </div>
      </Layout>
    </AnimatedPage>
  );
}

export default Posts;
