import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./styles/theme";
import Todo from "./components/Todo";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Todo/>
    </ThemeProvider>
  );
}

export default App;