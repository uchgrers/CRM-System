import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import TodosPage from "./pages/TodosPage/TodosPage";
import { Layout } from "antd";
import Nav from "./components/MainMenu/MainMenu";

function App() {
  const navigate = useNavigate();
  const { Sider, Content } = Layout;
  return (
    <Layout style={{ columnGap: "10px", minHeight: "100vh" }}>
      <Sider
        style={{
          color: "var(--color-bg-secondary)",
          backgroundColor: "var(--color-button-primary)",
        }}
      >
        <Nav />
      </Sider>
      <Layout>
        <Content>
          <Routes>
            <Route path="/" element={<TodosPage />} />
            <Route path="/todos" element={<TodosPage />} />
            <Route path="/profile" element={<div>Hello</div>} />
            <Route path="/*" element={<div>Not found</div>} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
