State.init({
  hosts: [],
});

const HOSTS = asyncFetch(
  "https://raw.githubusercontent.com/codingshot/edge-ai-bos/main/content/hosts.json"
).then((data) => State.update({ hosts: JSON.parse(data.body) }));

const Box = styled.div`
    padding:2rem;
    box-sizing:border-box;
    width:100%;
    min-height:50vh;
    background-color:#fff;
    color:#000;
    max-width:1000px;
    margin:0 auto;

    .title, .subtitle {
        font-family: Times New Roman;
        padding:0;
        margin:0;
    }

    .title {
        font-size:1.875rem;
    }

    .subtitle {
        font-size:1rem;
        opacity:.6;
    }
    
    .content {
        margin-top:1rem;

        .company {
            font-family: Times New Roman;
            font-weight:bold;
            border-bottom: 1px solid rgba(0,0,0,1);
        }
    }
`;

const Wrapper = styled.div`

`;

const Hosts = styled.div`
    display:grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
    padding:2.5rem 0;

    @media screen and (max-width:800px) {
        display:block;
    }
`;

const Host = styled.div`
    text-align:center;
    border: 1px solid rgba(0,0,0,.05);
    padding: 1.5rem;
    transition: all .2s;

    @media screen and (max-width:800px) {
        :not(:last-of-type) {
            margin-bottom:1.5rem;
        }
    }

    :hover {
        background-color:#000;
        color:#fff;
        border-color:#fff;
        box-shadow: 0 0 0 5px #000;
        transition: all .2s;

        img {
            filter:invert(0);
            transition: all .2s;
        }
    }

    .title {
        font-size:1.3rem;
        line-height:1.3rem;
        margin:1rem;
    }

    .description {
        font-size:.8rem;
        opacity:.6;
    }
`;

const Background = styled.img`
    display:block;
    width:100%;
    height:100%;
    max-width:150px;
    max-height:150px;
    margin:0 auto;
    background-position:center;
    background-repeat:no-repeat;
    background-size:cover;
    border-radius:100%;
    filter:invert(100%);
    transition: all .2s;
`;

return (
  <Box>
    <Wrapper>
      <p className="title">Hosts.</p>
      <p className="subtitle">Convening visionary researchers worldwide</p>
      <Hosts>
        {state.hosts.map((host) => (
          <Host>
            <Background src={host.image} />
            <p className="title">{host.name}</p>
            {host.twitter && (
              <a
                href={`https://twitter.com/${host.twitter}`}
                target="_blank"
                className="description"
              >
                @{host.twitter}
              </a>
            )}
            <p className="description">{host.description}</p>
          </Host>
        ))}
      </Hosts>
    </Wrapper>
  </Box>
);
