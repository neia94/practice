import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import AnimatedPage from "../components/AnimatedPage";
import "../App.css";

function Home() {
  return (
    <AnimatedPage>
      <Layout>
        <div className="App">
          <header className="header">
            <h1>🚀 Practice Blog</h1>
            <p>공부를 위한 프로젝트</p>
          </header>

          <main className="main">
            <section className="intro">
              <h2>환영합니다!</h2>
              <p>이 블로그는 Vite + React로 만들어졌습니다.</p>
              <p>나중에 Next.js로 마이그레이션할 예정입니다.</p>
            </section>

            <section className="roadmap">
              <h3>학습 로드맵</h3>
              <ul>
                <li>✅ Vite + React 프로젝트 세팅</li>
                <li>✅ React Router로 라우팅 구현</li>
                <li>⏳ 블로그 포스트 기능 구현</li>
                <li>⏳ 마크다운 에디터 구현</li>
                <li>⏳ GitHub Pages 배포</li>
                <li>🎯 Next.js로 마이그레이션</li>
              </ul>
            </section>

            <section className="navigation">
              <h3>페이지 둘러보기</h3>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                }}
              >
                <Link
                  to="/about"
                  style={{
                    padding: "0.5rem 1rem",
                    background: "#646cff",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "4px",
                  }}
                >
                  About
                </Link>
                <Link
                  to="/posts"
                  style={{
                    padding: "0.5rem 1rem",
                    background: "#646cff",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "4px",
                  }}
                >
                  Posts
                </Link>
              </div>
            </section>
          </main>
        </div>
      </Layout>
    </AnimatedPage>
  );
}

export default Home;
