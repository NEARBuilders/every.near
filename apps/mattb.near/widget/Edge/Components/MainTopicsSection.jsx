const TOPICS = [
  {
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1006,h=1120,fit=crop/mv05earg5BUBeP0L/image-AMqqW4bBVQS86Xr2.png",
    title: "Computing Architecture & Frameworks",
    description:
      "This foundational track explores the optimized computing architectures, hardware, systems, and infrastructure required to enable high-performance edge AI. We will cover the evolution of computing, accelerating AI/ML with specialized hardware, and refining architectures for localized data-centric edge intelligence, and new web primitives.",
  },
  {
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1006,h=1120,fit=crop/mv05earg5BUBeP0L/keszthelyi-timi-JQVX8fkGiC4-unsplash.jpg",
    title: "Models, Learning, and Inferencing",
    description:
      "This track dives deep into innovations in model development, distributed training techniques, and optimization for efficient on-device inference. Sessions will explore democratizing access through open model development, federated learning for on-device personalization, multi-party computation for private inferencing, and collaborative training methods.",
  },
  {
    image:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1006,h=1120,fit=crop/mv05earg5BUBeP0L/justin-schuler-HW_85uPRC1I-unsplash.jpg",
    title: "Cryptography, Privacy, and Humanity in the Age of AI",
    description:
      "This encompasses machine learning, privacy, identity, and the ethical implications of edge AI. Sessions will explore zero-knowledge proofs and homomorphic encryption to enable private on-device ML. We will also discuss identity, biometric authentication, and the rights and responsibilities of advancing AI.",
  },
];

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

const Topics = styled.div`
    display:grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
    padding:4rem 0;
`;

const Topic = styled.div`
    text-align:center;

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
`;

return (
  <Box>
    <Wrapper>
      <p className="title">Main Topics.</p>
      <p className="subtitle">Exploring Uncharted Frontiers</p>
      <Topics>
        {TOPICS.map((topic) => (
          <Topic>
            <Background src={topic.image} />
            <p className="title">{topic.title}</p>
            <p className="description">{topic.description}</p>
          </Topic>
        ))}
      </Topics>
    </Wrapper>
  </Box>
);
