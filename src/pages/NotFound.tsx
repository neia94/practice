import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import AnimatedPage from "../components/AnimatedPage";
import "../App.css";

function NotFound() {
  return (
    <AnimatedPage>
      <Layout>
        <div className="App">
          <header className="header">
            <h1>404</h1>
            <p>페이지를 찾을 수 없습니다</p>
          </header>

          <main className="main">
            <section className="intro">
              <h2>🔍 페이지를 찾을 수 없습니다</h2>
              <p>요청하신 페이지가 존재하지 않습니다.</p>
              <p>URL을 확인하시거나 홈으로 돌아가세요.</p>

              <div style={{ marginTop: "2rem" }}>
                <Link
                  to="/"
                  style={{
                    padding: "0.75rem 1.5rem",
                    background: "#646cff",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "4px",
                    fontSize: "1.1rem",
                  }}
                >
                  🏠 홈으로 가기
                </Link>
              </div>
            </section>
          </main>
        </div>
      </Layout>
    </AnimatedPage>
  );
}

export default NotFound;
