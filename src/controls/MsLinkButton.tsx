import { Route } from 'react-router-dom'
import { Button } from "@fluentui/react-northstar";
import React from "react";

const MsLinkButton = (props: any) => {
  const { disabled, content, url, callback } = props;
  return <Route render={({ history}) => (
    <Button
      content={content}
      disabled={disabled}
      primary
      onClick={async (e) => await callback() && history.push(url)}/>
  )} />
}

export default MsLinkButton;
