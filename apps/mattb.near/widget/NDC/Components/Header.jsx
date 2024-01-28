let { tabs, selectedTab, fallback, darkmode, onRefresh, logo } = props;

State.init({
  tab: selectedTab || fallback || "home",
  darkmode: darkmode || false,
  open: false,
});

tabs = tabs || {
  home: {
    text: "Home",
  },
  docs: {
    text: "NDCDocs",
  },
  nominate: {
    text: "Nominate",
  },
  funding: {
    text: "Funding dashboard",
  },
  sayalot: {
    text: "Say A Lot",
  },
  gigs: {
    text: "Gigs",
  },
  wg: {
    text: "NDC Work Groups",
  },
  easypoll: {
    text: "EasyPoll",
  },
};

const refresh = (data) => {
  State.update(data);

  if (typeof onRefresh == "function") {
    onRefresh(data);
  }
};

const DEFAULT_LOGO_URL = state.darkmode
  ? "https://ipfs.near.social/ipfs/bafkreihbueuso62ltstbcxdhlmdnacomlb2hxun5fxh34f4rvgtgb5pfi4"
  : "https://ipfs.near.social/ipfs/bafkreiavgky7fgrvwl4x4rxcypgew5ou6ahwf6mrcbtyswbvtbnrkrrobu";

const ICON_MOON_URL =
  "https://ipfs.near.social/ipfs/bafkreigilnmekroiee4nehyyipnioxchwzevvp3qc7nkb3njekbaevuzzi";
const ICON_SUN_URL =
  "https://ipfs.near.social/ipfs/bafkreidltnf3vn5na7dl5rdwcpor3yz63suj42xc4h2qxyhpz5ltwfxn7q";

const DEFAULT_BACKGROUND_COLOR = state.darkmode ? "#191919" : "#fff";
const DEFAULT_COMPONENT_COLOR = state.darkmode ? "rgba(0,0,0,.8)" : "#fff";
const DEFAULT_TEXT_COLOR = state.darkmode ? "#fff" : "#000";

const Logo = styled.img`
    cursor:pointer;
    max-width:30px;
`;

const Header = styled.div`
    width:100%;
    background-color:${DEFAULT_BACKGROUND_COLOR};
`;

const Navigation = styled.div`
    position:relative;
    display:flex;
    justify-content:center;
    align-items:center;
    max-width:1300px;
    margin:0 auto;
    padding:1rem;
    color:${DEFAULT_TEXT_COLOR};
    font-size:.9rem;
    letter-spacing:-.5px;
    min-height:70px;

    img {
        position:absolute;
        left:1rem;
        border:1rem;
    }

    ul {
        display:flex;
        align-items:center;
        padding:0;
        margin:0;
        list-style:none;
        flex-wrap:wrap;

        @media screen and (max-width:1000px) {
            z-index:9999;
            display:block;
            position:absolute;
            top:100%;
            width:100%;
            background-color:${DEFAULT_BACKGROUND_COLOR};
            overflow:hidden;
            height:0vh;
            transition: all .2s;

            &.open {
                transition: all .2s;
                height:calc(100vh - 150px);
            }
        }

        li {
            padding:0;
            
            &:not(:last-of-type) {
                margin-right:1rem;
            }

            @media screen and (max-width:1000px) {
                width:100%;
                text-align:center;
                margin-bottom:20px;
            }

            a {
                position:relative;
                cursor:pointer;
                transition:all .2s;
                border-radius:7px;
                background-color:${
                  state.darkmode ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.05)"
                };
                padding:.3rem .8rem;
                font-weight:bold;
                opacity:.6;
                color:${DEFAULT_TEXT_COLOR};
                text-decoration:none;
                border: 2px solid rgba(0,0,0,.0);
                transition: all .2s;
                font-size:.8rem;

                &.selected {
                    transition: all .2s;
                    background: ${DEFAULT_TEXT_COLOR};
                    color:${DEFAULT_BACKGROUND_COLOR};
                    opacity:1;
                }

                &:hover {
                    border: 2px solid rgba(0,0,0,.02);
                    opacity:1;
                }

                @media screen and (max-width:1000px) {
                    background-color:transparent;
                    padding:inherit 0;

                    &:hover {
                        border:2px solid rgba(0,0,0,0);
                    }

                    &.selected {
                        background-color:transparent;
                        color:${DEFAULT_TEXT_COLOR};

                        &:after {
                            content: '';
                            opacity:.1;
                            width:100%;
                            height:2px;
                            background-color:${DEFAULT_TEXT_COLOR};
                            position:absolute;
                            left:0;
                            bottom:0;
                            border-radius:100%;
                        }
                    }
                }
            }
        }
    }
`;

const Toolbox = styled.div`
    position:absolute;
    display:flex;
    right:1rem;
    height:40px;

    & > div:not(:last-of-type) {
        margin-right:10px;
    }
`;

const DarkModeButton = styled.div`
    cursor:pointer;
    width:40px;
    height:40px;
    border-radius:10px;
    background-color:${
      state.darkmode ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.05)"
    };
    background-image:url("${state.darkmode ? ICON_SUN_URL : ICON_MOON_URL}");
    background-position:center;
    background-repeat:no-repeat;
    background-size:30px 30px;
    transition: all .2s;
    border: 2px solid ${
      state.darkmode ? "rgba(255,255,255,.0)" : "rgba(0,0,0,.0)"
    };

    &:hover {
        transition: all .2s;
        box-shadow: 0 0 10px 5px rgba(0,0,0,.02);
        border: 2px solid ${
          state.darkmode ? "rgba(255,255,255,.02)" : "rgba(0,0,0,.02)"
        };
    }
`;

const MenuButton = styled.div`
    cursor:pointer;
    width:40px;
    height:40px;
    border-radius:10px;
    background-color:${
      state.darkmode ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.05)"
    };
    background-image:url("${
      state.darkmode
        ? "https://ipfs.near.social/ipfs/bafkreievkvxtk6d5c3nx5zs663j5dqo3y3h4rdesvr25k632dbrux3zhra"
        : "https://ipfs.near.social/ipfs/bafkreiexzn4c2sc53i5k5u7zaazdkf6j2zhzvifsxp7skcucwaxm46aggi"
    }");
    background-position:center;
    background-repeat:no-repeat;
    background-size:20px 20px;
    transition: all .2s;
    border: 2px solid ${
      state.darkmode ? "rgba(255,255,255,.0)" : "rgba(0,0,0,.0)"
    };

    &:hover {
        transition: all .2s;
        box-shadow: 0 0 10px 5px rgba(0,0,0,.02);
        border: 2px solid ${
          state.darkmode ? "rgba(255,255,255,.02)" : "rgba(0,0,0,.02)"
        };
    }

    @media screen and (min-width:1000px) {
        display:none;
    }
`;

return (
  <Header>
    <Navigation>
      {!logo && (
        <Logo
          src={DEFAULT_LOGO_URL}
          onClick={() => refresh({ tab: "home", currentView: "home" })}
        />
      )}
      {logo && logo()}
      <ul className={state.menuOpen ? "open" : ""}>
        {Object.keys(tabs).map((key) => (
          <li>
            <a
              className={key == state.tab ? "selected" : ""}
              onClick={() => {
                refresh({ tab: key, currentView: key });

                if (state.menuOpen) {
                  State.update({ menuOpen: false });
                }
              }}
            >
              {tabs[key].text}
            </a>
          </li>
        ))}
      </ul>
      <Toolbox>
        <DarkModeButton
          onClick={() => refresh({ darkmode: !state.darkmode })}
        ></DarkModeButton>
        <MenuButton
          onClick={() => State.update({ menuOpen: !state.menuOpen })}
        />
      </Toolbox>
    </Navigation>
  </Header>
);
