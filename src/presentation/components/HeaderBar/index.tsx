import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { Container, Search } from "./styles";

const useStyles = makeStyles((theme) => ({
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

type Props = {
  handleSearch: (term: string) => void;
};

const HeaderBar: React.FC<Props> = ({ handleSearch }) => {
  const classes = useStyles();
  const inputRef = useRef({} as HTMLInputElement);

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">GraphQLCountries</Typography>
          <Search onClick={() => inputRef?.current?.focus()}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Pesquise por um país..."
              inputRef={inputRef}
              onChange={(e) => handleSearch(e.target.value)}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{
                "aria-label": "search",
                "data-testid": "search-input",
              }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default HeaderBar;
