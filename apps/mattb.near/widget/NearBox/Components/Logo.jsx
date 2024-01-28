const Logo = styled.div`
    display:flex;
    align-items:center;
    font-weight:bold;
    font-size:2rem;
    color:#0178D4;

    p {
        margin:0;
        padding:0;
    }

    span {
        display:block;
        margin-right:.5rem;
        position:relative;
        width:30px;
        height:20px;
        background-color:#0178D4;
        border-radius:4px;
        overflow:hidden;
        z-index:0;
        top:2px;

        &::after {
            content: '';
            z-index:2;
            position:absolute;
            display:block;
            width: 0; 
            height: 0; 
            border-left: 15px solid transparent;
            border-right: 15px solid transparent;
            border-top: 15px solid #0366B4;
            left:0;
            right:0;
            top:-4px;
            margin: auto;
        }

        &::before {
            content: '';
            z-index:1;
            position:absolute;
            display:block;
            width: 0; 
            height: 0; 
            border-left: 15px solid transparent;
            border-right: 15px solid transparent;
            border-bottom: 15px solid rgba(0,0,0,.08);
            left:0;
            right:0;
            bottom:-4px;
            margin: auto;
        }
    }
`;

return (
  <Logo>
    <span></span>
    <p>nearbox</p>
  </Logo>
);
