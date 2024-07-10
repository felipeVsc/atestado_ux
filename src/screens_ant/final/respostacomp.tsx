import React, { ReactNode } from "react";
import { Typography } from "@mui/material";

interface PreviewCampoProps {
  campo: string;
  resposta: string;
}

function PreviewCampo({ campo, resposta }: PreviewCampoProps) {
  return (
    <div>
      <p>
        <Typography
          variant="body1"
          component="div"
          sx={{ flexGrow: 1, textAlign: "center", fontWeight: "bold" }}
        >
          {campo}
        </Typography>
      </p>

      <p>
        <Typography
          variant="body2"
          component="div"
          sx={{ flexGrow: 1, textAlign: "center" }}
        >
          {resposta}
        </Typography>
      </p>
    </div>
  );
}

export default PreviewCampo;
