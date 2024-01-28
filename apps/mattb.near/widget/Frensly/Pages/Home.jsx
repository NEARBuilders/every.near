const NEARFRENS_LOGO =
  "https://ipfs.near.social/ipfs/bafkreibmkg7wbgfnliss4ow7uy4tn2trd7qejpfjzblhf45p2ffw2ppryu";

const Main = styled.div`
    border-radius:15px;
    overflow:hidden;
    background: #fff7e9;
`;

const Wrapper = styled.div`
    position:relative;
    min-height:100vh;
`;

const Toolbar = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:1.8rem 1.8rem 0;

    button {
      border-radius:30px;
      border:0;
      font-size:.8rem;
      font-weight:bold;
      color:#000;
      background-color: #92dfa7;
      padding:.5rem 1.2rem;
      transition:all .2s;

      :hover {
        box-shadow: 0 0 0 3px rgba(0,0,0,.1);
        background-color: #87B697;
        color:#000;
      }
    }
`;

const Header = styled.div`
    display:flex;
    position:relative;
    padding:2rem 2rem;
    min-width:500px;

    h1 {
      font-weight:bold;
      font-size:3.3rem;
    }

    p {
        max-width:500px;
        margin:10px 0 30px;
    }

    div:first-of-type {
        z-index:1;
    }

    .image {

        @keyframes rotate {
            0% {
                transform:rotate(0deg);
            }
            100% {
                transform:rotate(360deg);
            }
        }

        @keyframes keep {
            0% {
                transform:rotate(0deg);
            }
            100% {
                transform:rotate(-180deg);
            }
        }
        
        position:relative;
        width:50%;
        display:flex;
        align-items:center;
        justify-content:flex-start;
        flex-direction:column;
        animation-name: rotate;
        animation-duration: 60s;
        animation-fill-mode:backwards;
        animation-iteration-count:infinite;
        
        * {
            animation-name: keep;
            animation-duration: 60s;
            animation-delay:0;
            animation-fill-mode:backwards;
            animation-iteration-count:infinite;
        }
        
        > img {
            position:absolute;
            top:0;
            left:0;
            right:0;
            bottom:0;
            margin:auto;
            max-width:200px;
            opacity:.1;
            filter:blur(7px);
            transform:rotate(20deg);
        }
    }
`;

const Circle = styled.div`

    @keyframes levitate {
        0% {
            margin-top:3px;
            box-shadow: 0 0 10px 10px #fffdea;
        }

        50% {
            margin-top:-3px;
            box-shadow: 0 0 20px 20px #fffdea;
        }

        100% {
            margin-top:3px;
            box-shadow: 0 0 10px 10px #fffdea;
        }
    }

    position:relative;
    width:100px;
    height:100px;
    border-radius:100%;
    background-color:#fffdea;
    border: 3px solid #87B697;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:8px;
    box-shadow: 0 0 10px 10px #fffdea;
    animation-name: levitate;
    animation-duration: 2s;
    animation-fill-mode:forwards;
    animation-iteration-count:infinite;
    z-index:0;
    
    > img {
      z-index:9999;
    }

    ::after {
      display:block;
      z-index:1;
      content:'';
      width:calc(100% - 4px);
      height:calc(100% - 4px);
      position:absolute;
      border-radius:100%;
      margin:10px;
      border: 1.5px solid #87B697;
      background-color:rgba(255,255,255,.3);
    }

    ::before {
      @keyframes opacity {
        0% {
            opacity:0;
            width:100%;
            height:100%;
        }

        50% {
            opacity:.5;
            width:calc(100% + 20px);
            height:calc(100% + 20px);
        }

        100% {
            opacity:0;
            width:100%;
            height:100%;
        }
    }

      display:block;
      z-index:1;
      content:'';
      width:calc(100% + 20px);
      height:calc(100% + 20px);
      position:absolute;
      border-radius:100%;
      margin:10px;
      border: 2px solid rgba(0,0,0,.05);
      animation-name: opacity;
      animation-duration: 2s;
      animation-fill-mode:forwards;
      animation-iteration-count:infinite;
    }

`;

const ButtonPrimary = styled.a`
    background-color: #92dfa7;
    padding:6.8px 14.8px;
    border-radius:20px;
    font-weight:bold;
    color:#000;
    font-size:13px;
    cursor:pointer;
    transition: all .2s;
    
    :hover {
        box-shadow: 0 0 0 3px rgba(0,0,0,.1);
        transition: all .2s;
        color:#000;
    }
`;

const ButtonSecondary = styled.a`
    border:3px solid #92dfa7;
    padding:4.8px 12.8px;
    border-radius:20px;
    font-weight:bold;
    color:#000;
    font-size:13px;
    cursor:pointer;
    transition: all .2s;
    :hover {
        box-shadow: 0 0 0 3px rgba(0,0,0,.1);
        transition: all .2s;
        color:#000;
    }
`;

const Modal = styled.div`
    position:fixed;
    top:0;
    left:0;
    width:100%;
    z-index:2;
`;

const Logo = styled.div`
    display:flex;
    align-items:flex-end;
    justify-content:flex-end;
    
    img {
       max-width:60px;
    }

    p {
        padding:0;
        margin:0;
        font-size:1.6rem;
        font-weight:bold;
        margin-left:10px;
        text-decoration:underline;
    }
`;

return (
  <>
    <Main>
      {state.displayModal && (
        <Modal>
          <Widget
            src="mattb.near/widget/NearBadger.Components.Modal"
            props={{
              onClose: () => {
                State.update({
                  displayModal: false,
                });
              },
            }}
          />
        </Modal>
      )}
      <Wrapper>
        <Toolbar>
          <Logo>
            <img src={NEARFRENS_LOGO} />
            <p>frensly</p>
          </Logo>
          <Web3Connect
            connectLabel="Connect wallet"
            disconnectLabel="Disconnect"
          />
        </Toolbar>
        <Header>
          <div>
            <h1>
              Frens are Near
              <br />
              using Lens
            </h1>
            <p>
              Discover new frensly people on NEAR Protocol with a verified Lens
              Protocol profile
            </p>
            <ButtonPrimary>Discover frens</ButtonPrimary>
            <ButtonSecondary
              target="_blank"
              href="mattb.near/widget/NearBadger.Pages.Main"
            >
              Verify my profile
            </ButtonSecondary>
          </div>
          <div></div>
        </Header>
        <Widget
          src="mattb.near/widget/NearBadger.Components.RecentlyVerified"
          props={{
            title: "New frens!",
          }}
        />
      </Wrapper>
    </Main>
  </>
);
