import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

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

function App() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            
            <Route index element={<Login />} />
            <Route path="home" element={<Home />} />

            <Route path="user">
              <Route index element={<UserList />} />
              <Route path=":userId" element={<UserSingle />} />
              {/* <Route path="update/:userId" element={<Update inputs={categoryInputs} title="Update User" />}/> */}
              {/* <Route
                path="new"
                element={<New inputs={categoryInputs} title="Add New Category" />}
              /> */}
            </Route>

            <Route path="categories">
              <Route index element={<List />} />
              <Route path=":categoryId" element={<Single />} />
              <Route path="update/:categoryId" element={<Update inputs={categoryInputs} title="Update Category" />}/>
              <Route
                path="new"
                element={<New inputs={categoryInputs} title="Add New Category" />}
              />
            </Route>
            
            <Route path="quiz">
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

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;