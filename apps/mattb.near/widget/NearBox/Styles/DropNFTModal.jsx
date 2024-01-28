const DarkOverlay = styled.div`
    z-index:9999;
    display:flex;
    align-items:flex-start;
    justify-content:center;
    width:100%;
    height:100vh;
    background-color:rgba(0,0,0,.6);
    backdrop-filter:blur(5px);
    overflow-y:scroll;
    box-sizing:border-box;
    padding-top:5rem;
`;

const Box = styled.div`
    position:relative;
    width:100%;
    max-width:500px;
    border-radius:20px;
    background-color:#fff;
    box-shadow: 0 0 10px 10px rgba(0,0,0,.1);
    padding:1.5rem;
`;

const Title = styled.h1`
    font-size:1.6rem;
    font-weight:bold;
    margin-bottom:1.5rem;
`;

const Text = styled.p`

`;

const ImageUploadCard = styled.div`
    display:flex;
    cursor:pointer;
    flex-flow: column nowrap;
    align-items: center;
    justify-content:center;
    width:100%;
    height:100%;
    max-width:300px;
    max-height:300px;
    border: 4px dashed rgba(0,0,0,.1);
    border-radius: 1rem;
    margin:30px auto;
    padding:1.5rem;
    text-align: center;
    background:#fff;
    transition: all .2s;

    &:hover {
        max-width:310px;
        max-height:310px;
        transform:scale(1.01);
        transition: all .2s;
        border-color:rgba(0,0,0,.3);
    }
`;

const Elipse = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  border: 4px solid rgba(0,0,0,.1);
  background:#fff;
  height: 100px;
  width: 100px;
  border-radius: 20px;
`;

const Controls = styled.div`
    width:100%;
    margin-top:2.5rem;
`;

const StepButton = styled.button`
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    height:50px;
    background-color: #0178D4;
    border:0;
    font-weight:bold;
    color:#fff;
    margin-top:.5rem;
    border-radius:5px;
    font-size:.9rem;

    :disabled {
      opacity:.6;
    }
`;

const Input = styled.input`
    width:100%;
    border:0;
    border-bottom: 1px solid rgba(0,0,0,.1);
    padding:.2rem 0;
    font-size:.8rem;
    outline-style:none;
    transition: all .2s;
    
    :not(:first-of-type) {
      margin-top:1.5rem;
    }

    :placeholder {
        font-size:.8rem;
    }

    :hover {
        border-color: rgba(0,0,0,.2);
        transition: all .2s;
    }

    :focus {
        border-color: #0178D4;
        transition: all .2s;
    }
`;

const Details = styled.div`
  textarea {
        width:100%;
        height:200px;
        border:0;
        border-radius:10px;
        resize:none;
        box-sizing:border-box;
        font-size:1.2rem;
        outline-style:none;
        margin-top:2rem;
        border:1px solid rgba(0,0,0,.1);
        padding:1rem;
    }
`;

const NFT = styled.div`
  position:relative;
  width:100%;
  margin-bottom:2rem;
  text-align:center;

  img {
      width:100%;
      max-width:300px;
      border-radius:.8rem;
  }
  .replace-btn {
      position:absolute;
      bottom:0;
      right:0;

      img {
          display:none!important;
      }

  }
`;

return {
    DarkOverlay,
    Box,
    Title,
    Text,
    ImageUploadCard,
    Elipse,
    Controls,
    StepButton,
    Input,
    Details,
    NFT
};
