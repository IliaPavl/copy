import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AppRouter from "./components/Routers/AppRouter";
import Bars from "./components/UI/NavigationBar/Bars";
import Footer from "./components/UI/NavigationBar/NavBar/Footer";

function App() {
    return (
        <BrowserRouter>
            <Bars />
            <ToastContainer />
            <AppRouter />
            <Footer />
        </BrowserRouter>
    );
}

export default App;
