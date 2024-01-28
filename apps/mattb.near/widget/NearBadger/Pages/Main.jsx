const LensLib = VM.require("mattb.near/widget/NearBadger.Libs.Lens");

const LOGO_URL =
  "https://ipfs.near.social/ipfs/bafkreiayxdc7zwztpcvtlo4x7axev5racawcl5xh4x7k6mfamidebbqqc4";

const Main = styled.div`
    background-color:#F3FBF6;
`;

const Wrapper = styled.div`
    position:relative;
    min-height:100vh;
    border-top:4px solid #87B697;
    overflow:hidden;
background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(255,255,255,.7) 100%);
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
      background-color: #87B697;
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
    background-color: #87B697;
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
    border:3px solid #87B697;
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
          <img width={"200px"} src={LOGO_URL} />
          <Web3Connect
            connectLabel="Connect wallet"
            disconnectLabel="Disconnect"
          />
        </Toolbar>
        <Header>
          <div>
            <h1>
              Lens x
              <br />
              Near Protocol
            </h1>
            <p>
              Get a badge on NEAR Protocol for owning a verified Lens Protocol
              handle, and connect with other verified users.
            </p>
            <ButtonPrimary>Discover people</ButtonPrimary>
            <ButtonSecondary
              onClick={() => {
                State.update({
                  displayModal: true,
                });

                return;
                Ethers.provider().send("wallet_switchEthereumChain", [
                  { chainId: ethers.utils.hexValue(137) },
                ]);

                Ethers.provider()
                  .send("eth_requestAccounts", [])
                  .then(([address]) => {
                    LensLib.createProof(
                      address,
                      context.accountId,
                      ({ handle, signature }) => {
                        console.log(
                          `Your handle ${handle} has been successfully verified and linked to ${context.accountId}`
                        );
                      }
                    );
                  });
              }}
            >
              Verify my handle
            </ButtonSecondary>
          </div>
          <div class="image">
            <img
              src={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Ethereum_logo.svg/1285px-Ethereum_logo.svg.png"
              }
            />
            <Circle>
              <img
                src="https://ipfs.near.social/ipfs/bafkreid622wknql44yrzupww3bmfgcdxppkwyzmb4upbmpdvgtos2hjhzy"
                width="100%"
              />
            </Circle>
            <Circle
              style={{
                top: "30px",
                left: "60px",
              }}
            >
              <img
                src="https://cryptologos.cc/logos/near-protocol-near-logo.png"
                width="60%"
              />
            </Circle>
          </div>
        </Header>
        <Widget src="mattb.near/widget/NearBadger.Components.RecentlyVerified" />
      </Wrapper>
    </Main>
  </>
);
