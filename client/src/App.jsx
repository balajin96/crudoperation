import Dashboard from "./Dashboard";
import { BrowserRouter, Route, Routes } from "react-router";
import Signup from "./Signup";
import Login from "./Login";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App;
