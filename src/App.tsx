import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import TodosPage from "./pages/TodosPage";
import { Layout } from "antd";
import MainManu from "./components/MainMenu/MainMenu";
import AuthPage from "./pages/AuthPage";

function App() {
  const location = useLocation();
  console.log(location.pathname)
  const { Sider, Content } = Layout;
  return (
    <>
      <Layout style={{ columnGap: "10px", minHeight: "100vh" }}>
        <Sider
          style={{
            color: "var(--color-bg-secondary)",
            backgroundColor: "var(--color-button-primary)",
          }}
          hidden={location.pathname === '/auth' && true}
        >
          <MainManu />
        </Sider>
        <Layout>
          <Content>
            <Routes>
              <Route path="/" element={<TodosPage />} />
              <Route path="/todos" element={<TodosPage />} />
              <Route path="/profile" element={<div>Hello</div>} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/*" element={<div>Not found</div>} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
