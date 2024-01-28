let { view } = props;

State.init({
  currentView: view || "home",
  render: "",
  darkmode: Storage.privateGet("darkmode") || false,
});

const DEFAULT_BACKGROUND_COLOR = state.darkmode ? "#191919" : "#fff";
const DEFAULT_COMPONENT_COLOR = state.darkmode ? "rgba(0,0,0,.8)" : "#fff";
const DEFAULT_GRADIENT =
  "linear-gradient(90deg, rgb(147, 51, 234) 0%, rgb(79, 70, 229) 100%)";

const DEFAULT_TEXT_COLOR = state.darkmode ? "#fff" : "#000";

const I_AM_HUMAN_LOGO_URL =
  "https://ipfs.near.social/ipfs/bafybeibs7rgjyqlrhqg3o5iiy3i235mtz3nlntswmye32f3myqk4owbxzy";

const BACKGROUND_DECORATION_URL =
  "https://ipfs.near.social/ipfs/bafybeicwdaezq3bnsd7nocof2ktc3rlla6u5s5iqxe5p2c6at2leqnc7wi";

const Main = styled.div`
    width:100%;
    min-height:100vh;
    background-color:${DEFAULT_BACKGROUND_COLOR};
    background-image: url(${BACKGROUND_DECORATION_URL});
    background-size:1200px auto;
    background-repeat: no-repeat;
    background-position: bottom left;

    * {
        font-family: 'Avenir', sans-serif;
    }
`;

const Logo = styled.img`
    max-width:30px;
`;

const Wrapper = styled.div`
    max-width:1300px;
    margin:0 auto;
    padding:1rem;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: 290px calc(100% - 290px);
    gap: 16px;

    @media screen and (max-width: 800px) {
      display:block;
      flex-direction:column;
      & > div:first-of-type {
        display:none;
      }
    }
`;

const Section = styled.div`
`;

const PollContainer = styled.div`
    overflow:hidden;
    border-radius:20px;
`;

const ScoreBoard = styled.a`
    display:flex;
    align-items:center;
    justify-content:center;
    width:100%;
    max-width:300px;
    border-radius:10px;
    box-sizing:border-box;
    padding: .8rem;
    background-color:${DEFAULT_COMPONENT_COLOR};
    border: 2px solid rgba(0,0,0,.05);
    margin-bottom:.8rem;
    cursor:pointer;
    transition: all .2s;
    color:${DEFAULT_TEXT_COLOR};
    text-decoration:none!important;
    
    &:hover {
        transition: all .2s;
        border: 2px solid rgb(79, 70, 229);
        background: linear-gradient(90deg, rgba(147, 51, 234, 0.08) 0%, rgba(79, 70, 229, 0.08) 100%);
        box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 30px;
    }

    & > div {
        h1 {
            font-size:.9rem;
            font-weight:bold;
            letter-spacing:-.5px
        }

        p {
            font-size:.8rem;
            margin:0;
            padding:0;
        }
    }
`;

const Info = styled.div`
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 30px;
    border-radius: 10px;
    border: 1px solid rgb(79, 70, 229);
    background: ${DEFAULT_GRADIENT};
    color: #fff;
    box-sizing:border-box;
    padding:.8rem;
    margin-bottom:.8rem;
    box-shadow:0 0 20px 5px rgba(0,0,0,.1);

    h1 {
        font-size:.9rem;
        font-weight:bold;
        letter-spacing:-.5px
    }

    p {
        font-size:.8rem;
    }

    a {
        font-size:.8rem;
        border:0;
        letter-spacing:-.5px;
        padding:.5rem 1rem;
        text-decoration:none;
    }

    a.primary {
        background-color:#fff!important;
        color:rgb(147, 51, 234)!important;
        border:2px solid #fff;
    }

    a.secondary {
        color:#fff;
        border:2px solid #fff;
    }
`;

const Title = styled.h1`
    color:${DEFAULT_TEXT_COLOR};
    margin:0;
    padding:0;
    font-size:1.5rem;
    font-weight:bold;
`;

const ProgressWrapper = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    margin-top:2rem;
`;

let views = {
  home: (state) => (
    <>
      <Grid>
        <Section>
          <Info>
            <h1>I-AM-HUMAN Onboarding Competition</h1>
            <p>
              Get your personal tracking links to onboard humans and see scores
              here. For more information, join this telegram group for
              competition details.
            </p>
            <a
              className="btn primary"
              target="_blank"
              href="https://t.me/+fcNhYGxK891lMjMx"
            >
              Join the community
            </a>
            <a
              className="btn secondary"
              target="_blank"
              href="https://t.me/+gVXWvooKWzozNmE0"
            >
              Learn more
            </a>
          </Info>
          <ScoreBoard
            href="https://i-am-human.app/community-scoreboard"
            target="_blank"
          >
            <div>
              <h1>
                <Logo
                  src={I_AM_HUMAN_LOGO_URL}
                  style={{
                    maxWidth: "30px",
                  }}
                />{" "}
                Community Scoreboard
              </h1>
              <div></div>
              <p>See which communities are onboarding the most humans</p>
            </div>
          </ScoreBoard>

          <ProgressWrapper>
            <Widget
              src="mattb.near/widget/NDC.Components.ProgressMeterHumans"
              props={{
                width: 250,
                backgroundColor: DEFAULT_BACKGROUND_COLOR,
                color: DEFAULT_TEXT_COLOR,
              }}
            />
          </ProgressWrapper>
        </Section>
        <Section>
          <PollContainer>
            <Widget
              src={`mattb.near/widget/NDCDocs.Components.Article`}
              props={{
                lastEditor: "blaze.near",
                blockHeight: "94478867",
                articleId: "TheNDC",
                embedHeader: false,
              }}
            />
          </PollContainer>
        </Section>
      </Grid>
    </>
  ),
  docs: () => (
    <>
      <Widget
        src={`mattb.near/widget/NDCDocs.Views.Home`}
        props={{
          embedHeader: false,
        }}
      />
    </>
  ),
  nominate: () => (
    <Widget src="nomination.ndctools.near/widget/NDC.Nomination.Page" />
  ),
  funding: () => (
    <>
      <Widget src="frichard5.near/widget/NDC-alldaos_overview" />
    </>
  ),
  sayalot: () => (
    <>
      <Widget src="sayalot.near/widget/SayALot" />
    </>
  ),
  gigs: () => (
    <>
      <Widget src="neardigitalcollective.near/widget/Gigs" />
    </>
  ),
  wg: () => (
    <Widget
      src="mattb.near/widget/NDCDocs.Components.Article"
      props={{
        articleId: "workgroups",
        blockHeight: "94330352",
        lastEditor: "blaze.near",
        embedHeader: false,
      }}
    />
  ),
  easypoll: () => (
    <Widget
      src={`easypoll-v0.ndc-widgets.near/widget/EasyPoll`}
      props={{
        sharedBlockHeight: 0,
      }}
    />
  ),
};

function getSkeleton() {
  return <>Loading...</>;
}

return (
  <Main>
    <Widget
      src="mattb.near/widget/NDC.Components.Header"
      props={{
        onRefresh: (data) => {
          State.update(data);
          Storage.privateSet("darkmode", state.darkmode);
        },
        darkmode: state.darkmode,
        selectedTab: state.currentView,
      }}
    />
    <Wrapper>
      {state.currentView in views ? views[state.currentView]() : "404"}
    </Wrapper>
  </Main>
);
