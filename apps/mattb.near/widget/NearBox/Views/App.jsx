const { MailChain, onMessageSent, onLogout } = props;
const WIDGET_OWNER = "mattb.near";

State.init({
  displayMessage: null,
  writeMessage: false,
  dropNft: false,
  messages: [],
  messagesLoaded: false,
});

if (!state.messagesLoaded) {
  Storage.privateGet("messages");

  setTimeout(() => {
    State.update({
      messages: Storage.privateGet("messages") || [],
      messagesLoaded: true,
    });
  }, 200);
}

const Main = styled.div`
    width:100%;
    height:calc(100vh - 70px);
    background-color:#fff;
`;

const Header = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    width:100%;
    padding:.5rem 1rem;
    box-sizing:border-box;
    border-top:5px solid #0178D4;
    background-color:#fff;
`;

const Body = styled.div`
    display:flex;
    max-width:1080px;
    margin:0 auto;
`;

const Logout = styled.div`
  display:flex;
  align-items:center;
  font-size:.8rem;
  padding:.5rem 1rem;
  background-color:#fafafa;
  border-radius:10px;

  * {
    opacity:.6;
    transition: all .2s;

    :hover {
      opacity:1;
      transition: all .2s;
    }
  }

  p {
    margin:0;
    margin-right:.5rem;
    font-weight:bold;
  }

  img {
    cursor:pointer;
    width:17px;
    height:17px;
  }
`;

const MessageCorner = styled.div`
  position:fixed;
  bottom:0;
  right:20px;
`;

const NftOverlay = styled.div`
  position:fixed;
  width:100%;
  height:100%;
  top:0;
  left:0;
  z-index:9999;
`;

const HeaderWrapper = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  width:100%;
  max-width:1080px;
  margin: 0 auto;
  div:first-of-type {
      transform:scale(.8);
      transform-origin: center left;
  }
`;

return (
  <Main>
    <Header>
      <HeaderWrapper>
        <Widget src={`${WIDGET_OWNER}/widget/NearBox.Components.Logo`} />

        <Logout>
          <p>{!!MailChain && MailChain.getUserAddress()}</p>
          <img
            src="https://ipfs.near.social/ipfs/bafkreiem7zs4oxkkgsr2hgret2z2h3fj76kngsbmkdstfijcsyakioklzu"
            onClick={() => onLogout({ logged: false })}
          />
        </Logout>
      </HeaderWrapper>
    </Header>
    <Body>
      <Widget
        src={`${WIDGET_OWNER}/widget/NearBox.Components.Sidebar`}
        props={{
          onRefresh: (state) => State.update(state),
        }}
      />

      <Widget
        src={`${WIDGET_OWNER}/widget/NearBox.Components.MessageList`}
        props={{
          messages: state.messages,
          onRefresh: (data) => State.update(data),
        }}
      />

      {state.dropNft && (
        <NftOverlay>
          <Widget
            src={`${WIDGET_OWNER}/widget/NearBox.Components.DropNFTModal`}
            props={{
              MailChain,
              onClose: () => State.update({ dropNft: false }),
            }}
          />
        </NftOverlay>
      )}

      {state.displayMessage && !state.writeMessage && (
        <MessageCorner>
          <Widget
            src={`${WIDGET_OWNER}/widget/NearBox.Components.ReadMessage`}
            props={{
              message: state.displayMessage,
              onRefresh: (refresh) => {
                State.update(refresh);
              },
            }}
          />
        </MessageCorner>
      )}

      {state.writeMessage && (
        <MessageCorner>
          <Widget
            src={`${WIDGET_OWNER}/widget/NearBox.Components.WriteMessage`}
            props={{
              MailChain: MailChain,
              onMessageSent: (message) => {
                State.update({
                  messages: [...state.messages, message],
                });
                Storage.privateSet("messages", state.messages);
                onMessageSent();
              },
              onRefresh: (refresh) => {
                State.update(refresh);
              },
            }}
          />
        </MessageCorner>
      )}
    </Body>
  </Main>
);
