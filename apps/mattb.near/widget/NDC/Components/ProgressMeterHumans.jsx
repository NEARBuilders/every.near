const { title, description, limit, backgroundColor, color, width } = props;
color = color || "#000";
backgroundColor = backgroundColor || "#fff";
width = width || 400;
const height = width;
const users = Near.view("registry.i-am-human.near", "sbt_supply", {
  issuer: "fractal.i-am-human.near",
});

const total = limit || 3000;
const percentage = (users / total) * 100;

const Main = styled.div`
    position:relative;
    width:${width}px;
    height:${height}px;
    background-color:${backgroundColor};
`;

const Circle = styled.div`
    z-index:0;
    width:100%;
    height:100%;
    border-radius:100%;
    background-color:#fafafa;
    overflow:hidden;
`;

const Square = styled.div`
    z-index:1;
    position;absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    background:conic-gradient(rgb(255, 213, 13), rgb(242, 155, 192) calc(${percentage}% / 2), rgb(229, 233, 236) 0deg);
    transform: rotate(270deg);
`;

const InnerCircle = styled.div`
    z-index:2;
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    margin: auto;
    width:calc(100% - 35px);
    height:calc(100% - 35px);
    border-radius:100%;
    background-color:${backgroundColor};
    overflow:hidden;
`;

const InnerSquare = styled.div`
    z-index:3;
    position;absolute;
    left:0;
    top:0;
    transform:translateY(-50%);
    width:100%;
    height:100%;
    background-color:${backgroundColor};
`;

const Information = styled.div`
    position:absolute;
    z-index:4;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin: auto;
    height:50%;
    text-align:center;

    h2 {
        font-weight:bold;
        font-size:${width < 350 ? 1.5 : 3}rem;
        margin-bottom:0;
        margin-bottom:.3rem;
        color:${color};
    }

    h3 {
        font-size:${width < 350 ? 1 : 1.6}rem;
        font-weight:normal;
        color:${color};
        opacity:.4;
    }

`;

const Content = styled.div`
    z-index:4;
    position:absolute;
    left:0;
    bottom:0;
    width:100%;
    height:50%;
    background-color:${backgroundColor};
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  margin: 14px auto 4px;
  padding-bottom: 4px;
  z-index: 10;

  a {
    width: 90%;
    max-width:230px;
    font-size: calc(100%);
    text-align:center;
  }
    &:hover {
      text-decoration: none;
      &:after{ 
        width: 100%;
        
      }
    }
  }
  
`;

const Title = styled.p`
  position: relative;
  font-weight: bold;
  font-size: ${width / 15}px;
  color:${color};

  &:after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0%;
    width: 100%; 
    height: 2px;
    background-color: #4498E0;
  }
`;

const Description = styled.p`
  color:${color};
  font-size: ${width / 28}px;
  text-align: center;
  margin: .6rem auto;
  width: 90%;
`;

return (
  <Main>
    <Circle>
      <InnerCircle></InnerCircle>
      <Square></Square>
      <InnerSquare></InnerSquare>
      <Information>
        <h2>{percentage.toFixed(2)}%</h2>
        <h3>
          {users}/{total}
        </h3>
      </Information>
    </Circle>
    <Content>
      <Wrapper>
        <Title>{title || "Humans on NEAR"}</Title>
        <Description>
          {description ||
            "NDC V1 Gov + 1000 Humans on NEAR = Unlock Gov & Community Treasury"}
        </Description>
        <Widget
          src="7418d5cb7d7657e526b8bccf28750939105828d0f5b34a7254bd107477d84a2c/widget/I-am-human-cta"
          props={{ widgetBarWidth: width, currTheme: currTheme }}
        />
      </Wrapper>
    </Content>
  </Main>
);
