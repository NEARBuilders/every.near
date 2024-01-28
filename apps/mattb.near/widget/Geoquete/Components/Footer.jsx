const FooterBox = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    width:100%;
    background-color: #595959;
    color: #fff;
    padding: 3rem;

    h5 {
        font-weight: 500;
        position: relative;
        left: 2rem;
    }
    hr {
        position: relative;
        left: 2rem;
    }
    ul {
    list-style: none;
    }

    a {
        &:link,
        &:visited {
            color: #fff;
            text-decoration: none;
            display: inline-block;
            font-weight: 500;
        }
        &:hover {
            color: #2fbc2f;
        }
    }
    .footer-word {
        width: 600px;
    }
    

`;

return (
  <FooterBox>
    <div>
      <h5>GeoQuêter Life</h5>
      <hr />
      <ul>
        <li>
          <a href="#">Support the community</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Best Quest records</a>
        </li>
      </ul>
    </div>
    <div>
      <p className="footer-word">
        Built by <a>AwesomeDevs</a> &copy; as devoted lovers of travelling. For
        more information about our community, visit our social media.
      </p>
    </div>
  </FooterBox>
);
