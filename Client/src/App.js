import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { CodeBlock } from "./pages/CodeBlock";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import TextSession from "./pages/TextSession";
import { NotFound } from "./pages/NotFound";
import PrivateRoutes from "./components/PrivateRoutes";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 5, justifyContent: "center" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* Protected only for "mentor" users */}
          <Route element={<PrivateRoutes />}>
            <Route path="/codeBlock" element={<CodeBlock />} />
          </Route>
          <Route path="/textSession" element={<TextSession />} />
          <Route path="*" element={<NotFound />} />
        </Routes>{" "}
      </Box>
    </Container>
  );
}
