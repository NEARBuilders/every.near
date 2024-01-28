State.init({
  partners: [],
});

asyncFetch(
  "https://raw.githubusercontent.com/codingshot/edge-ai-bos/main/content/partners.json"
).then((data) => State.update({ partners: JSON.parse(data.body) }));

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

const Partners = styled.div`
    display:grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
    padding:4rem 0;
`;

const Partner = styled.a`
    text-align:center;
    cursor:pointer;
    color:#000;

    .title {
        font-size:1.3rem;
        line-height:1.3rem;
        margin:1rem;
    }

    .description {
        font-size:.8rem;
        opacity:.6;
    }

    :hover {
        color:#000;

        img {
            filter:grayscale(0);
        }
        p {
            opacity:1;
        }
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
    filter:grayscale(100%);
    transition: all .2s;

    + p {
        opacity:0;
        transition: all .2s;
    }
`;

return (
  <Box id="partners">
    <Wrapper>
      <p className="title">Partners.</p>
      <p className="subtitle">Backed by the bests</p>
      <Partners>
        {state.partners.map((partner) => (
          <Partner href={partner?.url} target="_blank">
            <Background src={partner.image} />
            <p className="title">{partner.name}</p>
          </Partner>
        ))}
      </Partners>
    </Wrapper>
  </Box>
);
