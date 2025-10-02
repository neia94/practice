import Layout from "../components/Layout";
import "../App.css";

function About() {
  return (
    <Layout>
      <div className="App">
        <header className="header">
          <h1>📖 About</h1>
          <p>프로젝트 소개</p>
        </header>

        <main className="main">
          <section className="intro">
            <h2>이 프로젝트는?</h2>
            <p>
              공부를 위한 연습 프로젝트입니다. Vite + React로 시작하여
              점진적으로 기능을 추가하고, 최종적으로 Next.js로 마이그레이션할
              예정입니다.
            </p>
          </section>

          <section className="tech-stack">
            <h3>기술 스택</h3>
            <ul
              style={{ textAlign: "left", maxWidth: "600px", margin: "0 auto" }}
            >
              <li>
                <strong>Frontend:</strong> React 19 + TypeScript
              </li>
              <li>
                <strong>Build Tool:</strong> Vite 7
              </li>
              <li>
                <strong>Routing:</strong> React Router 7
              </li>
              <li>
                <strong>Styling:</strong> CSS
              </li>
              <li>
                <strong>Deployment:</strong> GitHub Pages
              </li>
            </ul>
          </section>

          <section className="goals">
            <h3>학습 목표</h3>
            <ul
              style={{ textAlign: "left", maxWidth: "600px", margin: "0 auto" }}
            >
              <li>React 및 TypeScript 실전 경험</li>
              <li>SPA 라우팅 구현 (React Router)</li>
              <li>마크다운 기반 블로그 시스템 구축</li>
              <li>GitHub Pages 배포 자동화</li>
              <li>Next.js 마이그레이션 경험</li>
            </ul>
          </section>
        </main>
      </div>
    </Layout>
  );
}

export default About;
