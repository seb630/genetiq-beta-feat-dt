import { RouterProvider } from "react-router-dom";
import "./Styles/Global.scss";
import Router from "./Routes/Router";

function App() {
	return <RouterProvider router={Router} />;
}

export default App;
