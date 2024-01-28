State.init({
  faq: [],
});

asyncFetch(
  "https://raw.githubusercontent.com/codingshot/edge-ai-bos/main/content/faq.json"
).then((data) => State.update({ faq: JSON.parse(data.body) }));

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

const Questions = styled.div`
    display:grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2rem;
    padding:2.5rem 0;

    @media screen and (max-width:800px) {
        display:block;
    }
`;

const Question = styled.a`
    display:block;
    transition: all .2s;
    color:#000;
    text-decoration:none!important;

    @media screen and (max-width:800px) {
        margin-bottom:2.5rem;
    }

    :hover {
        .title {
            color:#0A58CA;
        }
        .description {
            opacity:1;
            color:##0A58CA;
            transition: all .2s;
        }
    }

    .title, .price {
        font-size:1.5rem;
        line-height:1.5rem;
        margin-bottom:1.7rem;

        @media screen and (max-width:800px) {
            margin-bottom:.8rem;
        }
    }

    .description {
        font-size:.8rem;
        opacity:.6;
        transition: all .2s;
    }
`;

return (
  <Box id="faq">
    <Wrapper>
      <p className="title">FAQ.</p>
      <p className="subtitle">Answers to your questions</p>
      <Questions>
        {state.faq.map((question) => (
          <Question>
            <p className="title">{question.question}</p>
            <p className="description">{question.answer}</p>
          </Question>
        ))}
      </Questions>
    </Wrapper>
  </Box>
);
