import "./App.css";
import GlobalStyles from "~/components/GlobalStyles";
import MainRoutes from "./MainRoutes";
function App() {
    return (
        <GlobalStyles>
            <div className="wrapper">
                <MainRoutes />
            </div>
        </GlobalStyles>
    );
}
export default App;
