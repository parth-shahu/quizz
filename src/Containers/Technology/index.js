import React from "react";
import { connect } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import Quizz from "../../Config/quizz";
import CardComponent from "./Card";
import { selectTechnology } from "../../Stores/Quizz/actions";

const Technology = ({ isAuthenticated }) => {
  const history = useHistory();

  const onSelectTech = (data) => {
    selectTechnology(data);
    history.push(`/technology/${data}`);
  };

  function createEntry(data) {
    return (
      <CardComponent
        id={data.id}
        title={data?.technology}
        onSelect={onSelectTech}
      />
    );
  }
  return (
    <>
      {!isAuthenticated && <Redirect to="/" />}
      <div>
        <dl className="dictionary">{Quizz.map(createEntry)}</dl>
      </div>
    </>
  );
};

const mapStateToProps = ({ AuthReducer }) => ({
  isAuthenticated: AuthReducer?.isAuthenticated,
});
const mapDispatchToProps = (dispatch) => ({
  selectTechnology: (data) => dispatch(selectTechnology(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Technology);
