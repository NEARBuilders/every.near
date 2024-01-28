const { message, onRefresh } = props;
const DEFAULT_TITLE = "Message";

const Message = styled.div`
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

    textarea {
        width:100%;
        height:300px;
        border:0;
        border-radius:10px;
        resize:none;
        box-sizing:border-box;
        font-size:1rem;
        outline-style:none;
        margin-top:.5rem;

        :disabled {
          background-color:transparent;
          color:#000;
          user-select:all;
        }
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

    :disabled {
      background-color:transparent;
      color:#000;
      user-select:all;
    }
`;

return (
  <Message>
    <Header>
      <p>{state.message.subject || DEFAULT_TITLE}</p>
      <p onClick={() => onRefresh({ displayMessage: null })}>Close</p>
    </Header>
    <Body>
      <Input
        type="text"
        placeholder="From"
        value={`From: ${message.from}`}
        disabled={true}
      />
      <Input
        type="text"
        placeholder="To"
        value={`To: ${message.to}`}
        disabled={true}
      />
      <Input
        type="text"
        placeholder="Subject"
        value={`Subject: ${message.subject}`}
        disabled={true}
      />
      <textarea
        placeholder="Message is empty"
        value={message.body}
        disabled={true}
      />
    </Body>
  </Message>
);
