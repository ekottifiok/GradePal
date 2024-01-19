import {Box} from "@mui/material";
import type {ReactNode} from "react";
import type {BgGradientResponse} from "@components/interface/theme";
import {useSystemModeIsDark} from "@components/hooks";

export function Loader({background}: { background?: BgGradientResponse }): ReactNode {

  const bgColor = useSystemModeIsDark() ? 'black' : 'white'

  return (
    <Box
      sx={{
        position: "fixed",
        overflow: "show",
        margin: "auto",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        alignItems: "center",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        width: "100%",
        backgroundColor: background ? undefined : bgColor,
        ...background
      }}
    >
      <div className="line">
        <div className="round"/>
      </div>
      <div className="line">
        <div className="round"/>
      </div>
      <div className="line">
        <div className="round"/>
      </div>
      <div className="line">
        <div className="round"/>
      </div>
      <div className="line">
        <div className="round"/>
      </div>
      <div className="line">
        <div className="round"/>
      </div>
      <div className="line">
        <div className="round"/>
      </div>
      <div className="line">
        <div className="round"/>
      </div>
    </Box>
  )
}