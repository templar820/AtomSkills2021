import {createMuiTheme} from "@material-ui/core/styles";
import colors from "./colors.modules.scss";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.primary
    }
  }
});

theme.overrides.MuiIconButton = {
  root: {
    padding: 0,
  },
}

export default theme;