import React, { useEffect, useState } from "react";
import { Box, Button, Paper, Typography, Radio } from "@material-ui/core";
import { connect, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";

import { selectTechnology, submitQuizz } from "../../Stores/Quizz/actions";
import { Skeleton } from "@mui/material";

const Technology = ({ isAuthenticated, getData, submitData }) => {
  const history = useHistory();
  const { id } = useParams();

  const { fetchingQuizz, quizzList } = useSelector(
    (state) => state?.QuizzReducer
  );

  const [data, setdata] = useState([]);
  const [index, setIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState("");

  useEffect(() => {
    getData(id);
  }, []);

  useEffect(() => {
    if (quizzList?.length > 0) {
      let { quizz } = quizzList[0];
      let data = JSON.parse(JSON.stringify(quizz));
      setdata(data);
      setCurrentQuestion(data[0]);
    }
  }, [quizzList]);

  const onSubmit = (values) => {
    submitData({ data: values, history, id });
  };

  const onSelectAnswer = (answer) => {
    let tempData = currentQuestion;
    tempData.selected_answer = answer;
    setCurrentQuestion(tempData);
    setSelectedAnswer(answer);
  };

  const onPrev = () => {
    let currentIndex = index;
    setCurrentQuestion(data[currentIndex - 1]);
    setIndex(currentIndex - 1);
  };

  const onNext = () => {
    let currentIndex = index;
    let tempData = data;
    tempData[currentIndex].selected_answer = currentQuestion?.selected_answer;
    setdata(tempData);
    if (data?.length > currentIndex + 1) {
      setCurrentQuestion(data[currentIndex + 1]);

      setIndex(currentIndex + 1);
    } else {
      onSubmit(tempData);
    }
  };

  return (
    <>
      {!isAuthenticated && <Redirect to="/" />}
      {fetchingQuizz ? (
        <Skeleton />
      ) : (
        <Paper style={{ marginBottom: "20px" }}>
          <Box p="20px">
            <div>
              <h2> Quizz</h2>
            </div>

            <div>
              <Typography>{currentQuestion?.question}</Typography>
              {currentQuestion?.options &&
                currentQuestion?.options?.length > 0 &&
                currentQuestion?.options?.map((ele) => (
                  <div key={ele?.i}>
                    <Radio
                      checked={currentQuestion?.selected_answer == ele?.id}
                      onChange={(e) => {
                        onSelectAnswer(e?.target?.value);
                      }}
                      value={ele.id}
                      name="answer"
                    />
                    <span>{ele?.title}</span>
                  </div>
                ))}

              <div
                style={{
                  justifyContent: index == 0 ? "flex-end" : "space-between",
                  display: "flex",
                  marginTop: 10,
                }}
              >
                {index !== 0 && (
                  <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    onClick={() => onPrev()}
                  >
                    Previous
                  </Button>
                )}
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  onClick={() => onNext()}
                >
                  {quizzList[0]?.quizz?.length > index + 1 ? "Next" : "Submit"}
                </Button>
              </div>
            </div>
          </Box>
        </Paper>
      )}
    </>
  );
};

const mapStateToProps = ({ AuthReducer }) => ({
  isAuthenticated: AuthReducer?.isAuthenticated,
});
const mapDispatchToProps = (dispatch) => ({
  getData: (data) => dispatch(selectTechnology(data)),
  submitData: (data) => dispatch(submitQuizz(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Technology);
