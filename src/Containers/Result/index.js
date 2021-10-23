import React from "react";
import { Box, Button, Paper, Typography } from "@material-ui/core";
import { connect, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { Skeleton } from "@mui/material";

const Technology = () => {
  const history = useHistory();

  const { fetchingQuizz, result } = useSelector((state) => state?.QuizzReducer);

  const { isAuthenticated } = useSelector((state) => state?.AuthReducer);

  return (
    <>
      {!isAuthenticated && <Redirect to="/" />}
      {fetchingQuizz ? (
        <Skeleton />
      ) : (
        <Paper style={{ marginBottom: "20px" }}>
          <Box p="20px">
            <div>
              <h2> Result</h2>
            </div>
            <div>
              <Typography>
                Correct Answers : {result?.currectAnswer} of{" "}
                {result?.data?.length}
              </Typography>
              <Typography>
                Result : {(result?.currectAnswer * 100) / result?.data?.length}%
              </Typography>
            </div>
            <div>
              <div
                style={{
                  justifyContent: "space-between",
                  display: "flex",
                  marginTop: 10,
                }}
              >
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  onClick={() => history.push(`/technology/${result?.tech_id}`)}
                >
                  Restart Quizz
                </Button>
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  onClick={() => history.push("/technology")}
                >
                  Go to technology list
                </Button>
              </div>
            </div>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default connect(null, null)(Technology);
