const { MailChain } = props;
const WIDGET_OWNER = "mattb.near";

State.init({
  user: {
    mail: "",
    phrase: "",
  },
  currentView: "home",
  toast: {
    type: "",
    message: "",
  },
  logged: false,
  disconnected: false,
  loadedCredentials: false,
  sdk: null
});

if (!!MailChain && !state.sdk) {
  State.update({
    sdk: MailChain
  });
}

if (!state.logged && !state.disconnected && !state.loadedCredentials) {
  Storage.privateGet("user");

  setTimeout(() => {
    State.update({
      user: Storage.privateGet("user") || {
        mail: "",
        phrase: "",
      },
      loadedCredentials: true,
    });

    if (!state.logged && state.user.mail && state.user.phrase) {
      login();
    }
  }, 200);
}

const login = () => {
  state.sdk.connect(state.user)
    .then((data) => {
      if (data.address !== state.user.mail) {
        State.update({
          toast: {
            type: "error",
            message: "The email provided doesn't match",
          },
        });
      } else {
        State.update({
          logged: true,
          currentView: "app",
          toast: {
            type: "success",
            message: "Logged in successfully",
          },
        });
      }
    })
    .catch((data) => {
      State.update({
        toast: {
          type: "error",
          message:
            "An error occurred while trying to connect. Please, try again.",
        },
      });
    });
};

const Main = styled.div`
    width:100%;
    height:100vh;
    background-color:rgba(0,0,0,.02);
`;

const Header = styled.div`
    display:flex;
    justify-content:center;
    width:100%;
    padding:.5rem 1rem;
    box-sizing:border-box;
    border-top:5px solid #0178D4;
`;

const Logo = styled.div`
    display:flex;
    align-items:center;
    font-weight:bold;
    font-size:2rem;
    color:#0178D4;

    p {
        margin:0;
        padding:0;
    }

    span {
        display:block;
        margin-right:.5rem;
        position:relative;
        width:30px;
        height:20px;
        background-color:#0178D4;
        border-radius:4px;
        overflow:hidden;
        z-index:0;
        top:2px;

        &::after {
            content: '';
            z-index:2;
            position:absolute;
            display:block;
            width: 0; 
            height: 0; 
            border-left: 15px solid transparent;
            border-right: 15px solid transparent;
            border-top: 15px solid #0366B4;
            left:0;
            right:0;
            top:-4px;
            margin: auto;
        }

        &::before {
            content: '';
            z-index:1;
            position:absolute;
            display:block;
            width: 0; 
            height: 0; 
            border-left: 15px solid transparent;
            border-right: 15px solid transparent;
            border-bottom: 15px solid rgba(0,0,0,.08);
            left:0;
            right:0;
            bottom:-4px;
            margin: auto;
        }
    }
`;

const Content = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
`;

const Login = styled.div`
    margin-top:1rem;
    width:300px;
    background-color:#fff;
    box-shadow: 0 0 10px 5px rgba(0,0,0,.05);
    padding:1.5rem;
    border-radius:5px;

    h1 {
        font-size:1.5rem;
        font-weight:bold;
    }
`;

const Input = styled.input`
    margin-top:1.2rem;
    width:100%;
    border:0;
    border-bottom: 3px solid rgba(0,0,0,.1);
    padding:.2rem 0;
    font-size:.8rem;
    outline-style:none;
    transition: all .2s;

    :placeholder {
        font-size:.8rem;
    }

    :hover {
        border-color: rgba(0,0,0,.2);
        transition: all .2s;
    }

    :focus {
        border-color: #0178D4;
        transition: all .2s;
    }
`;

const ConnectButton = styled.button`
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    height:50px;
    background-color: #0178D4;
    border:0;
    font-weight:bold;
    color:#fff;
    margin-top:2rem;
    border-radius:5px;
    font-size:.9rem;
`;

const CreateButton = styled.a`
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    height:50px;
    background-color: #0178D4;
    border:0;
    font-weight:bold;
    color:#fff;
    border-radius:5px;
    font-size:.9rem;
    text-decoration:none;

    :hover, :focus {
        color:#fff;
    }
`;

const Powered = styled.div`
    opacity:.5;
    margin-top:3rem;
    font-size:.8rem;
    text-align:center;
    vertical-align:top;

    span {
      display:inline-block;
      position:relative;
      top: -2px;
      width:5px;
      height:5px;
      border-radius:100%;
      margin-left:3px;
    }

    .enabled {
      background-color:green;
    }

    .disabled {
      background-color:red;
    }
`;

const Division = styled.div`
    position:relative;
    width:100%;
    max-width:300px;
    padding:2rem 0;
    text-align:center;
    z-index:0;

    p {
        display:inline-block;
        padding:0;
        margin:0;
        background-color:#fafafa;
        padding:0 .5rem;
        color:rgba(0,0,0,.5);
    }

    ::after {
        z-index:-1;
        content:'';
        position:absolute;
        width:100%;
        height:2px;
        top:0;
        bottom:0;
        left:0;
        right:0;
        margin:auto;
        background-color:rgba(0,0,0,.05);
    }
`;

const NewAccount = styled.div`
    width:100%;
    max-width:300px;
`;

const views = {
  home: (
    <Main>
      <Header>
        <Widget src={`${WIDGET_OWNER}/widget/NearBox.Components.Logo`} />
      </Header>
      <Content>
        <Login>
          <h1>Sign in</h1>
          <Input
            type="text"
            placeholder="user@mailchain.com"
            value={state.user.mail}
            onChange={(e) =>
              State.update({
                user: {
                  ...state.user,
                  mail: e.target.value,
                },
              })
            }
          />
          <Input
            type="text"
            placeholder="Secret Recovery Phrase"
            value={state.user.phrase}
            onChange={(e) =>
              State.update({
                user: {
                  ...state.user,
                  phrase: e.target.value,
                },
              })
            }
          />
          <ConnectButton
            onClick={() => {
              Storage.privateSet("user", state.user);
              login();
            }}
          >
            Connect
          </ConnectButton>
        </Login>
        <Division>
          <p>or</p>
        </Division>
        <NewAccount>
          <CreateButton
            target="_blank"
            href="https://app.mailchain.com/register"
          >
            Create an account
          </CreateButton>
        </NewAccount>
        <Powered>
          Powered by <strong>MailChain</strong>
          <span
            className={
              typeof MailChain !== "undefined" ? "enabled" : "disabled"
            }
          ></span>
        </Powered>
      </Content>
    </Main>
  ),
  app: (
    <Widget
      src={`${WIDGET_OWNER}/widget/NearBox.Views.App`}
      props={{
        MailChain: state.sdk,
        onMessageSent: () => {
          State.update({
            toast: {
              type: "success",
              message: "Email sent",
            },
          });
        },
        onLogout: () => {
          State.update({
            currentView: "home",
            user: {
              mail: "",
              phrase: "",
            },
            logged: false,
            disconnected: true,
          });
          MailChain.disconnect();

          State.update({
            toast: {
              type: "success",
              message: "Your account has been disconnected",
            },
          });
        },
      }}
    />
  ),
};

return (
  <>
    <Widget
      src={`${WIDGET_OWNER}/widget/NearBox.Components.Toast`}
      props={{
        message: state.toast.message,
        type: state.toast.type,
        onClose: () => {
          State.update({
            toast: {
              ...toast,
              message: "",
            },
          });
        },
      }}
    />
    {state.currentView in views ? views[state.currentView] : views["home"]}
  </>
);
