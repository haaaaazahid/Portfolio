import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import AchievementsPage from "./pages/AchievementsPage";
import ContactPage from "./pages/ContactPage";
import SkillsPage from "./pages/SkillsPage";
import Footer from "./components/Footer";

function App(){

return(

<BrowserRouter>

<Navbar/>

<Routes>

<Route path="/" element={<Home/>}/>

<Route path="/about"
element={<AboutPage/>}/>

<Route path="/projects"
element={<ProjectsPage/>}/>

<Route path="/achievements"
element={<AchievementsPage/>}/>

<Route path="/contact"
element={<ContactPage/>}/>

<Route path="/skills"
element={<SkillsPage/>}/>

</Routes>

<Footer/>

</BrowserRouter>

)

}

export default App;