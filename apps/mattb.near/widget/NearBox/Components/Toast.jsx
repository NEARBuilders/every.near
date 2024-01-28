let { message, type, onClose } = props;

const Box = styled.div`
    @keyframes moveIn {
        100% {
            transform:translateX(0);
            opacity:1;
        }
    }

    position:absolute;
    z-index:99999;
    opacity:0;
    cursor:pointer;
    top:20px;
    right:20px;
    max-width:400px;
    padding:.5rem .8rem;
    border-radius:10px;
    box-shadow: 0 0 10px 5px rgba(0,0,0,.15);
    border:2px solid rgba(0,0,0,.1);
    color:#fff;
    transform:translateX(calc(100% + 30px));
    animation-name:moveIn;
    animation-duration:.3s;
    animation-fill-mode:forwards;

    &.error {
        background-color:#ea3838;
    }

    &.success {
        background-color:#0B141D;
    }

    &.warning {
        background-color:#FFDF00;
        color:#000;
    }

`;

return (
  <>
    {message && (
      <Box className={type || "error"} onClick={onClose}>
        {message}
      </Box>
    )}
  </>
);
