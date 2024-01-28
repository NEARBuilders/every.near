const WIDGET_OWNER = "mattb.near";

State.init({
    init: false
});

const Box = styled.div`
    z-index:0;
    position:relative;
    width:100%;
    height:100vh;
    background-color:#fff;
    overflow:hidden;
`;

const Shape = styled.div`
    @keyframes colorize {
        50% {
            transform: translateX(15%);
        }
        100% {
            filter: blur(60px) hue-rotate(180deg);transform: translateX(-15%);
        }
    }

    position:absolute;
    z-index:1;
    opacity:.6;
    top:0;
    left:0;
    bottom:0;
    right:0;
    margin:auto;
    width:400px;
    height:400px;
    transform:rotate(30deg);
    filter:blur(200px);
    animation-name:colorize;
    animation-duration:15s;
    animation-iteration-count:infinite;
    animation-fill-mode:both;
    animation-direction: alternate;
`;

const Content = styled.div`
    z-index:2;
    max-width:1080px;
    margin:0 auto;
`;

const Header = styled.div`
    z-index:4;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:20px;

    ul {
        display:flex;
        flex-grow:1;
        padding:0;
        margin:0;
        list-style:none;
        align-items:center;
        justify-content:center;

        li {
            :not(:last-of-type) {
                margin-right:40px;
            }
        }
    }
`;

const Logo = styled.h1`
    display:flex;
    align-items:center;
    justify-content:center;
    font-weight:bold;
    font-size:2rem;

    span {
        position:relative;
        color:#B3E0F9;
        font-size:2.4rem;
        top:3px;

        :first-of-type {
            margin-right:5px;
        }

        :last-of-type {
            margin-left:5px;
        }

        @keyframes color {
            100% {
                filter: hue-rotate(180deg);
            }
        }
        animation-name:color;
        animation-duration:10s;
        animation-iteration-count:infinite;
        animation-fill-mode:both;
        animation-direction: alternate;
    }
`;

const ConnectWallet = styled.div`
    .btn-outline-primary {
        font-size:.9rem;
        height: 48px;
        color: #fff;
        text-transform: none;
        background-color: #2142e7;
        border-radius: 8px;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        padding: 0 1rem;
        font-weight: 600;
        line-height: 1;
        text-decoration: none;
        display: flex;
        transition: all .2s;

        :hover {
            opacity:.9;
            transition: all .2s;
        }
    }

    &.secondary {
        .btn-outline-primary {
            background-color:transparent;
            color:#000;
            border: 3px solid #2142e7!important;
            color: #2142e7;

            :hover {
                opacity:.8;
                background-color:#2142e7;
                color:#fff;
            }
        }
    }
`;

const Jumbotron = styled.div`
    width:100%;
    height:calc(100vh - 200px);
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

    * {
        z-index:3;
    }

    p {
        font-size:3rem;
        font-weight:bold;
        text-align:center;
        margin:0;

        + p {
            font-size:1.5rem;
            font-weight:normal;
            margin: .5rem 0 1.3rem;
        }
    }

    .actions {
        display:flex;

        .secondary {
            margin-right:20px;
        }

        .btn-outline-primary {
            padding: 0 2rem;
            margin-top:1rem;
            border:0;
        }
    }

`;

let views = {
    home: <>
        <Box>
    <Shape
      style={{
        left: "-20%",
        backgroundColor: "#B3E0F9",
      }}
    />
    <Shape
      style={{
        right: "-20%",
        transform: "rotate(50deg)",
        backgroundColor: "#B9CCF8",
      }}
    />
    <Content>
      <Widget
        src={`${WIDGET_OWNER}/widget/NearBook.Components.Commons.Header`}
      />
      <Jumbotron>
        <p>Decentralized Web3 Docs.</p>
        <p>Free. For everyone.</p>
        <div className="actions">
          <ConnectWallet className="secondary">
            <Web3Connect connectLabel="Explore docs" />
          </ConnectWallet>
          <ConnectWallet onClick={() => State.update({init: true})}>
            <Web3Connect connectLabel="Create  document" />
          </ConnectWallet>
        </div>
      </Jumbotron>
    </Content>
  </Box>
    </>,
    app: <Widget src={`${WIDGET_OWNER}/widget/NearBook.Components.App.Editor`} />
}

return <>
    {state.init ? views["app"] : views["home"]}
</>;
