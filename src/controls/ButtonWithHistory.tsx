import { Route } from 'react-router-dom'
import { Button } from "@fluentui/react-northstar";
import React from "react";

const ButtonWithHistory = (props: any) => {
  const { disabled, content, onClick } = props;
  return <Route render={({ history}) => (
    <Button
      content={content}
      disabled={disabled}
      primary
      onClick={(e) => onClick(history)}/>
  )} />
}

export default ButtonWithHistory;
