import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { Container, Search, AutoComplete, SearchList, Toolbar } from "./styles";
import { BasicCountry } from "@/domain/models";
import { setSearchInput } from "@/presentation/redux/actions";
import { selectSearchItems } from "@/presentation/redux/selectors";

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
  listItem: {
    "&:hover": {
      cursor: "pointer",
      background: "#f3f3f3",
    },
  },
}));

const HeaderBar: React.FC = () => {
  const classes = useStyles();
  const inputRef = useRef({} as HTMLInputElement);
  const history = useHistory();
  const dispatch = useDispatch();
  const searchItems = useSelector(selectSearchItems);

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
              onChange={(e) => dispatch(setSearchInput(e.target.value))}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{
                "aria-label": "search",
                "data-testid": "search-input",
              }}
            />
            {searchItems.length && (
              <AutoComplete data-testid="autocomplete">
                <CardContent>
                  <SearchList data-testid="search-list">
                    {searchItems.map(({ id, flag, name, capital }) => (
                      <>
                        <ListItem
                          data-testid="list-item"
                          key={id}
                          className={classes.listItem}
                          alignItems="flex-start"
                          onClick={() => history.push(`/country/${id}`)}
                        >
                          <ListItemAvatar>
                            <Avatar
                              imgProps={{ title: "search-flag" }}
                              alt="Nome do país"
                              src={flag}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={name}
                            primaryTypographyProps={{
                              title: "search-name",
                            }}
                            secondary={
                              <Typography
                                component="span"
                                variant="body2"
                                style={{ display: "inline" }}
                                color="textPrimary"
                                title="search-capital"
                              >
                                {capital}
                              </Typography>
                            }
                          />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </>
                    ))}
                  </SearchList>
                </CardContent>
              </AutoComplete>
            )}
          </Search>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default HeaderBar;
