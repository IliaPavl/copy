import NavigationBar from "./components/UI/NavigationBar/NavigationBar";
import Footer from "./components/UI/NavigationBar/Footer";
import {BrowserRouter} from "react-router-dom";
import './App.css';
import AppRouter from "./components/Routers/AppRouter";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <BrowserRouter>
            <NavigationBar/>
            <ToastContainer />
            <AppRouter/>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
