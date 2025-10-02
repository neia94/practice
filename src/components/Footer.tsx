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
                  className="footer-link"
                >
                  Vite
                </a>
              </li>
              <li>
                <a
                  href="https://react.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  React
                </a>
              </li>
              <li>
                <a
                  href="https://reactrouter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  React Router
                </a>
              </li>
              <li>
                <a
                  href="https://www.typescriptlang.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  TypeScript
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Project</h4>
            <ul className="footer-links">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="footer-link"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("문서를 준비 중입니다!");
                  }}
                >
                  Documentation
                </a>
              </li>
            </ul>
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
