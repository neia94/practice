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
