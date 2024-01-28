const { messages, onRefresh } = props;
messages = messages ? messages : [];

const Main = styled.div`
    width:100%;
    background-color:#fff;
`;

const Message = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    height:100px;
    border-left:4px solid #0178D4;
    box-sizing:border-box;
    padding:1rem;
    background-color:#fff;
    border-radius:5px;
    cursor:pointer;

    :not(:last-of-type) {
        margin-bottom:10px;
    }
`;

const Subject = styled.h1`
    font-size:1rem;
    font-weight:bold;
    padding:0;
    margin:0;
`;

const To = styled.p`
    font-size:.7rem;
    padding:0;
    margin:0;
`;

const Body = styled.p`
    margin-top:.5rem;
    white-space:nowrap;
`;

const Text = styled.p`
    width:100%;
    text-overflow:ellipsis;
    max-height:50px;
    font-size:.8rem;
    max-width:400px;
    overflow:hidden;
`;

const Wrapper = styled.div`
  background-color:#fafafa;
  border-radius:10px;
  min-height:calc(100vh - 70px - 2rem);
  padding:1rem;

  h3 {
    opacity:.3;
    text-align:center;
    span {
      display:block;
      img {
        width:100px;
      }
    }
  }
`;

return (
  <Main>
    <Wrapper>
      {messages.map((message, idx) => (
        <Message onClick={() => onRefresh({ displayMessage: message })}>
          <Subject>{message.subject}</Subject>
          <To>To {message.to}</To>
          <Body>
            <Text>{message.body}</Text>
          </Body>
        </Message>
      ))}

      {!messages.length && (
        <h3>
          <span>
            <img src="https://ipfs.near.social/ipfs/bafkreif3t7pxszn5yk25u2vgxit6n4556thqgni7aoxr4e2qvd5ycs4w7a" />
          </span>
          This folder is empty
        </h3>
      )}
    </Wrapper>
  </Main>
);
