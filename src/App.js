import NavigationBar from "./components/UI/NavigationBar/NavigationBar";
import Footer from "./components/UI/NavigationBar/Footer";
import {BrowserRouter} from "react-router-dom";
import './App.css';
import AppRouter from "./components/Routers/AppRouter";

function App() {
    return (
        <BrowserRouter>
            <NavigationBar/>
            <AppRouter/>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
