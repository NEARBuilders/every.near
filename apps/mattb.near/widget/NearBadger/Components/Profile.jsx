const { accountId, name } = props;

const Profile = styled.div`
  width:240px;
  background-color:#fff;
  border:1px solid rgba(0,0,0,.05);
  border-radius:20px;
  box-shadow: 0 0 5px 5px rgba(0,0,0,.01);
  padding: 1rem;
  text-align:center;
  display:flex;
  flex-direction:column;

  * {
      flex-grow:0;
      align-self:center;
  }

  h1 {
    font-size:1.3rem;
  }

  p {
    position:relative;
    display:inline-block;
    border-radius:20px;
    padding:.4rem 2rem .4rem 20%;
    color:#000;
    font-size:.8rem;
    overflow:hidden;
    border:1px solid rgba(0,0,0,.1);
    z-index:0;
    cursor:pointer;
    transition:all .2s;
    background-color:rgba(0,0,0,.05);
    min-width:160px;

    :hover {
        box-shadow: 0 0 0 3px rgba(0,0,0,.1);
    }

    .badge, .verified {
      border-radius:0;
      display:flex;
      align-items:center;
      justify-content:center;
      width:20%;
      min-width:35px;
      height:100%;
      position:absolute;
      left:0;
      top:0;
      border-right:1px solid rgba(0,0,0,.1);
      background-color:#fff;

      img {
        display:block;
        position:relative;
        padding:0;
        margin:0;
        left:1px;
        width:20px;
        pointer-events:none;
      }
    }

    .verified {
        left:unset;
        right:0;
        background-color:transparent;
        border:0;
    }
  }

  button {
    border-radius:20px;
    padding:.3rem 2rem;
    font-weight:bold;
    background-color:#388909;
    border:1px solid rgba(0,0,0,.1);
    transition:all .2s;

    :hover {
        box-shadow: 0 0 0 3px rgba(0,0,0,.1);
        background-color:#388909;
    }
  }
`;

const ProfileHeader = styled.div`
  height:30%;
  display:flex;
  justify-content:center;
  align-items:center;
  margin-bottom:.8rem;
`;

const Image = styled.div`
  width:70px;
  height:70px;
  background-color:rgba(0,0,0,.05);
  border-radius:100%;
`;

return (
  <Profile>
    <ProfileHeader>
      <Image></Image>
    </ProfileHeader>
    <h1>{accountId}</h1>
    <p>
      <span className="badge">
        <img
          src="https://ipfs.near.social/ipfs/bafkreifco6er77ctlxxsbou36ga7yrdysgov5eqfam3vzpfbpsy7icpw4u"
          width="100%"
        />
      </span>
      {name}
      <span className="verified">
        <img
          src="https://ipfs.near.social/ipfs/bafkreidfh7bolog2hy6zfgre4tasxrsbaen6xmc6ottccvnf4db3gch3oi"
          width="100%"
        />
      </span>
    </p>
    <button>FOLLOW</button>
  </Profile>
);
