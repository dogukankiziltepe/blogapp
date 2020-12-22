import './App.css';
import Login from './components/User/Login';
import EMailVertification from './components/EMailVertification/EMailVertification'
import AddArticle from './components/Article/AddArticle';
import {Route, Switch} from "react-router-dom"
import Navi from './components/Navi/Navi';
import Home from './components/Home';
import SignIn from './components/User/SignIn';
import SearchResultList from './components/Article/SearchResultList'
import EditArticleTable from './components/EditorPage/EditArticleTable';
import EditArticle from './components/EditorPage/EditArticle';
import UserPage from './components/UserPage/UserPage';
import CategoryList from './components/Category/CategoryList';
import ArticleDetailPage from './components/Article/ArticleDetailPage';
import Logout from "./components/User/Logout";


function App() {
  return (
    <div className="App">
      <Navi/>
      <Switch>
        <Route exact path ="/" component={Home}/>
        <Route exact path = "/login" component ={Login}/>
        <Route exact path = "/signup" component = {SignIn}/>
        <Route exact path = "/addArticle" component = {AddArticle}/>
        <Route exact path = "/EMailVertification/:id" component = {EMailVertification}/>
        <Route exact path = "/Article/:id" component = {ArticleDetailPage}/>
        <Route exact path = "/Search/:searchitem" component = {SearchResultList}/>
        <Route exact path = "/EditArticles" component = {EditArticleTable}/>
        <Route exact path = "/EditArticle/:id" component ={EditArticle}/>
        <Route exact path = "/UserPage/:username" component = {UserPage}/>
        <Route exact path = "/Category/:categoryName" component ={CategoryList}/>
        <Route exact path = "/logout" component = {Logout}/>
      </Switch>
    </div>
  );
}

export default App;
