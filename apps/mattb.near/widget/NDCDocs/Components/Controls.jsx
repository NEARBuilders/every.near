const { previousArticle, nextArticle } = props;

const Controls = styled.div`
  width:100%;
  display:flex;
  justify-content:space-between;
`;

const ControlButton = styled.a`
  display:flex;
  cursor:pointer;
  align-items:center;
  justify-content:center;
  flex-wrap:wrap;
  width:250px;
  height:100px;
  border-radius:10px;
  background-color:rgba(0,0,0,.05);
  border: 1px solid rgba(0,0,0,.05);
  box-sizing:border-box;
  padding:1rem;
  margin-top:20px;
  transition: all .2s;
  color:inherit;

  &:not(:last-of-type) {
    margin-right:20px;
  }

  * {
    opacity: .6;
    transition: all .2s;
  }

  &:hover {
    box-shadow:0 0 0 5px rgba(0,0,0,.02);

    * {
      opacity: .8;
      transition: all .2s;
    }
  }

  &.previous {

    div:nth-child(1) {
      transform:rotate(180deg);
    }

    div + div {
      flex-grow:1;
      text-align:right;

      p {
        padding:0;
        margin:0;
      }

      & p:nth-child(1) {
        font-size:.8rem;
      }

      & p:nth-child(2) {
        font-weight:bold;
      }

    }

  }

  &.next {
    flex-direction:row-reverse;

    div + div {
      flex-grow:1;
      text-align:left;

      p {
        padding:0;
        margin:0;
      }

      & p:nth-child(1) {
        font-size:.8rem;
      }

      & p:nth-child(2) {
        font-weight:bold;
      }

    }

  }
`;

return (
  <>
    {(!!previousArticle.link || !!nextArticle.link) && (
      <Controls>
        {!!previousArticle.link && (
          <ControlButton href={previousArticle.link} className="previous">
            <div>
              <img
                src="https://ipfs.near.social/ipfs/bafkreigygnp234eyi5ljtxf7czp5emmhihjxitbl6e4zzuol3wgxsvkhcu"
                style={{
                  maxWidth: "20px",
                  maxHeight: "20px",
                }}
              />
            </div>
            <div>
              <p>Previous</p>
              <p>{previousArticle.title}</p>
            </div>
          </ControlButton>
        )}
        {!!nextArticle.link && (
          <ControlButton href={nextArticle.link} className="next">
            <div>
              <img
                src="https://ipfs.near.social/ipfs/bafkreigygnp234eyi5ljtxf7czp5emmhihjxitbl6e4zzuol3wgxsvkhcu"
                style={{
                  maxWidth: "20px",
                  maxHeight: "20px",
                }}
              />
            </div>
            <div>
              <p>Next</p>
              <p>{nextArticle.title}</p>
            </div>
          </ControlButton>
        )}
      </Controls>
    )}
  </>
);
