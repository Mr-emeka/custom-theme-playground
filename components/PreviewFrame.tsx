import React, { useEffect, useRef } from "react";
import { IFrame } from "./Iframe";
import Preview from "./Preview";

function PreviewFrame({ theme, text }: any) {
  return (
    <IFrame theme={theme}>
      <Preview text={text}/>
    </IFrame>
  );
}

export default PreviewFrame;
