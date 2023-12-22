import {alpha, useTheme} from "@mui/material/styles";
import {Box} from "@mui/material";
import type {ReactNode} from "react";
import {BgGradient} from "@components/theme";
import {IMAGE_PATH} from "@components/constants";

export function Loader(): ReactNode {
  const theme = useTheme();
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        height: "inherit",
        justifyContent: "center",
        width: "inherit",
        ...BgGradient({
          color: alpha(theme.palette.background.default, 0.7),
          imgUrl: IMAGE_PATH.concat('background/overlay_4.jpg')
        }),
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