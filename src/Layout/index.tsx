import { ReactNode } from "react";
import "./index.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <div className='layoutContainer'>{children}</div>;
};

export default Layout;
