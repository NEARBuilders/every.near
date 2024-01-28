State.init({
  programs: [],
});

asyncFetch(
  "https://raw.githubusercontent.com/codingshot/edge-ai-bos/main/content/program.json"
).then((data) => State.update({ programs: JSON.parse(data.body) }));

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

const Programs = styled.div`
    max-width:800px;
    margin:0 auto;
`;

const Program = styled.div`
    text-align:center;
    padding: 1rem;

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

const Schedule = styled.div`
    .title {
        text-align:left;
        margin:0;
        margin:1rem 0;
    }

    ul {
        padding:0;
        margin:0;
        margin-bottom:2rem;
        list-style:none;
        padding:1rem;

        @media screen and (max-width:800px) {
            padding:1rem 0;
        }

        li {
            display:flex;
            padding:.5rem;
            transition: all .2s;

            @media screen and (max-width:800px) {
                font-size:.8rem;
            }

            &:hover {
                background-color:#000;
                color:#fff;
                transition: all .2s;
            }

            &:not(:last-of-type) {
                margin-bottom:1rem;
            }

            div:first-of-type {
                min-width:180px;
                margin-right:20px;
                text-align:right;

                @media screen and (max-width:800px) {
                    min-width:130px;
                    margin-right:10px;
                    text-align:left;
                }
            }
            
            div + div {
                text-align:left;
                p {
                    padding:0;
                    margin:0;

                    &:first-of-type {
                        font-weight:bold;
                    }

                    + p {
                        opacity:.5;
                    }

                    &.speakers {
                        font-weight:bold;
                        margin-top:.2rem;
                        font-size:.8rem;
                    }
                }
            }
        }
    }
`;

return (
  <div id="programs">
    {state.programs.map((program, idx) => (
      <Box>
        <Wrapper>
          <p className="title">Program {idx + 1}.</p>
          <p className="subtitle">{program.name}</p>
          <p className="subtitle">
            {`${program.date}`}, {program.time}
          </p>
          <Programs>
            <Program>
              {program.schedule.map((schedule) => (
                <Schedule>
                  <p className="title">{schedule.name}</p>
                  <ul>
                    {schedule.activities.map((activity) => (
                      <li>
                        <div>
                          {activity.start_time} - {activity.end_time}
                        </div>
                        <div>
                          <p>{activity.name}</p>
                          <p>{activity.topic}</p>
                          <p className="speakers">
                            {activity.speakers.length > 0 && "-"}{" "}
                            {activity.speakers.join(", ")}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Schedule>
              ))}
            </Program>
          </Programs>
        </Wrapper>
      </Box>
    ))}
  </div>
);
