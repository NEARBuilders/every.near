const { MailChain, onRefresh, onMessageSent } = props;
const DEFAULT_TITLE = "New message";

State.init({
  message: {
    from: MailChain.user.address,
    to: "",
    subject: "",
    body: "",
  },
  userReachable: null,
  timeout: null
});

const checkAddress = () => {
  clearTimeout(state.timeout);

  State.update({
    timeout: setTimeout(() => {
    MailChain.addressIsReachable(state.message.to).then((reachable) => State.update({ userReachable: reachable }) );
  }, 1500)
  });
};

const WriteMessage = styled.div`
  width:100%;
  min-width:500px;
  background-color:#fff;
  overflow:hidden;
`;

const Header = styled.div`
    display:flex;
    justify-content:space-between;
    width:100%;
    padding:.8rem;
    box-sizing:border-box;
    background-color:#000;
    border: 1px solid rgba(255,255,255,.1);
    border-bottom:0;
    border-top-left-radius:10px;
    border-top-right-radius:10px;

    p {
        margin:0;
        padding:0;
        font-weight:bold;
        max-width:200px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        color:#fff;
        font-size:.9rem;

        + p {
          font-weight:normal;
          cursor:pointer;
        }
    }
`;

const Body = styled.div`
    box-sizing:border-box;
    padding:1rem;
    border:2px solid rgba(0,0,0,.05);
    border-top:0;
    border-bottom-left-radius:7px;
    border-bottom-right-radius:7px;

    input {
        margin-bottom:1.5rem;
    }

    span {
      padding:0 1rem;
      border-radius:20px;
      position:absolute;
      right:0;
      font-size:.8rem;
      color:#fff;
    }

    .reachable {
      background-color:#4ab54a;
    }

    .unreachable {
      background-color:#d12323;
    }

    textarea {
        width:100%;
        height:300px;
        border:0;
        border-radius:10px;
        resize:none;
        box-sizing:border-box;
        font-size:1.2rem;
        outline-style:none;
        margin-top:.5rem;
    }
`;

const Input = styled.input`
    width:100%;
    border:0;
    border-bottom: 1px solid rgba(0,0,0,.1);
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

const ToolBox = styled.div`
  border-top:2px solid rgba(0,0,0,.05);
  padding-top:.3rem;
`;

const SendButton = styled.button`
    max-width:100px;
    margin-top:10px;
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    height:30px;
    background-color: #000;
    border:0;
    color:#fff;
    border-radius:30px;
    font-size:.9rem;

    :disabled {
      opacity:.5;
    }
`;

return (
  <WriteMessage>
    <Header>
      <p>{state.message.subject || DEFAULT_TITLE}</p>
      <p onClick={() => onRefresh({ writeMessage: false })}>Cancel</p>
    </Header>
    <Body>
      <div style={{
        position: "relative"
      }}>
      {state.userReachable !== null && state.message.to && <span className={`${state.userReachable ? "reachable" : "unreachable"}`}>{state.userReachable ? "Available" : "Unavailable"}</span>}
      <Input
        type="text"
        placeholder="To (user.near)"
        value={state.message.to}
        onChange={(e) => {
          State.update({
            message: {
              ...state.message,
              to: e.target.value,
            }
          });
          checkAddress();
        }}
      />
      </div>
      <Input
        type="text"
        placeholder="Subject"
        value={state.message.subject}
        onChange={(e) => {
          State.update({
            message: {
              ...state.message,
              subject: e.target.value,
            },
          });
        }}
      />
      <textarea
        placeholder="Type your message here..."
        value={state.message.body}
        onChange={(e) => {
          State.update({
            message: {
              ...state.message,
              body: e.target.value,
            },
          });
        }}
      />
      <ToolBox>
        <SendButton
          disabled={!state.message.body || !state.userReachable}
          onClick={() => {
            MailChain.send(
              state.message.to,
              state.message.subject,
              state.message.body
            ).then((response) => {
              if (response) {
                onRefresh({ writeMessage: false });
                onMessageSent(state.message);
              }
            });
          }}
        >
          Send
        </SendButton>
      </ToolBox>
    </Body>
  </WriteMessage>
);
