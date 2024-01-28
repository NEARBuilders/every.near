const KeyVerification = styled.div`
    margin: auto;
    width: 100%;
    max-width: 400px;
    border: 1px solid rgba(0,0,0, .15);
    padding: 1.5rem;
    border-radius: .7rem;
    box-shadow: .3rem .3rem 1rem rgba(0,0,0, .1);

    h1 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 2rem;
    }
    .file-button-wrapper {
      position:relative;
      width:100%;
      height: 50px;
    }

    .image-wrapper {
      display: block;
      margin-top: 2rem;
    }

    img {
      width: 350px;
      height: auto;
      border-radius: 5px;
    }
`;

const Button = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    font-weight:bold;
    color:#fff;
    width:100%;
    height:50px;
    border-radius:10px;
    background-color:#2fbc2f;
    text-align:center;
    cursor: pointer;
    user-select: none;
    box-shadow: 0 3px 3px rgba(0,0,0,.3);

    &:active {
      box-shadow: 0 0 0 rgba(0,0,0,0);
      transform: translateY(2px);
    }
`;

State.init({
  img: null,
});

return (
  <KeyVerification>
    <h1>You found a key! 🗝️ </h1>
    <p>
      Congratulations! You're now one step closer to your next destination!
      Before you collect the artifact, please submit a picture of yourself on
      the spot, either alone or with your team.
    </p>
    <div className="file-button-wrapper">
      <IpfsImageUpload image={state.img} />
    </div>
    <div className="image-wrapper">
      {state.img.cid && (
        <img
          src={`https://ipfs.near.social/ipfs/${state.img.cid}`}
          alt="uploaded"
        />
      )}
    </div>
    {state.img.cid && <Button>Submit image</Button>}
  </KeyVerification>
);
