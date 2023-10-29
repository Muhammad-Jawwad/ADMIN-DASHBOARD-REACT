import Home from "./pages/home/Home";
import TestHome from "./pages/home/TestHome";
import Login from "./pages/login/Login";
import TestLogin from "./pages/login/TestLogin";
import Profile from "./pages/profile/Profile";
import Instruction from "./pages/instruction/Instruction";
import TestQuestion from "./pages/questions/TestQuestion";
import ReviewQuestionsList from "./pages/review/ReviewQuestionsList";
import ReviewQuestion from "./pages/questions/ReviewQuestion";
import EndQuiz from "./pages/endQuiz/EndQuiz";
import NotFoundPage from "./pages/notFound/NotFound";

import List from "./pages/list/List";
import QuizList from "./pages/list/QuizList";
import UserList from "./pages/list/UserList";
import QuestionList from "./pages/list/QuestionList";

import Single from "./pages/single/Single";
import UserSingle from "./pages/single/UserSingle";
import QuizSingle from "./pages/single/QuizSingle";
import QuestionSingle from "./pages/single/QuestionSingle";

import New from "./pages/new/New";
import QuizNew from "./pages/new/QuizNew";
import QuestionNew from "./pages/new/QuestionNew";

import Update from "./components/update/Update";
import QuizUpdate from "./components/update/QuizUpdate";
import QuestionUpdate from "./components/update/QuestionUpdate";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { quizInputs, categoryInputs, questionInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { SidebarProvider } from "./context/sidebarContext";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  localStorage.setItem("selectedOption", "ALL");
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" >

            <Route index element={<Login />} />
            <Route path="quizLogin" element={<TestLogin />} />
            <Route path="home" element={<Home />} />

            <Route path="quiz">
              <Route index element={<TestHome />} />
              <Route path="instruction" element={<Instruction />} />
              <Route path="quizQuestion" element={<TestQuestion />} />
              <Route path="reviewQuestionList" element={<ReviewQuestionsList />} />
              <Route path="reviewQuestion/:questionId" element={<ReviewQuestion />} />
              <Route path="endQuiz" element={<EndQuiz />} />

            </Route>

            <Route path="user">
              <Route index element={<UserList />} />
              <Route path=":userId" element={<UserSingle />} />
            </Route>

            <Route path="categories">
              <Route index element={<List />} />
              <Route path=":categoryId" element={<Single />} />
              <Route path="update/:categoryId" element={<Update inputs={categoryInputs} title="Update Category" />} />
              <Route
                path="new"
                element={<New inputs={categoryInputs} title="Add New Category" />}
              />
            </Route>

            <Route path="quizList">
              <Route index element={<QuizList />} />
              <Route path=":quizId" element={<QuizSingle />} />
              <Route path="update/:quizId" element={<QuizUpdate inputs={quizInputs} title="Update Quiz" />} />
              <Route
                path="new"
                element={<QuizNew inputs={quizInputs} title="Add New Quiz" />}
              />
            </Route>

            <Route path="question">
              <Route index element={<QuestionList />} />
              <Route path=":questionId" element={<QuestionSingle />} />
              <Route path="update/:questionId" element={<QuestionUpdate inputs={questionInputs} title="Update Question" />} />
              <Route
                path="new"
                element={<QuestionNew inputs={quizInputs} title="Add New Question" />}
              />
            </Route>

            <Route path="profile">
              <Route index element={<Profile />} />
            </Route>

            <Route path="notFound">
              <Route index element={<NotFoundPage />} />
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;