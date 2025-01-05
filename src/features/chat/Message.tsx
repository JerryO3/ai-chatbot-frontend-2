import { useState } from "react"

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Box, Typography, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import '../../styles.css'

export default function Message(prop:{response: string, source: Object|null}) {
    return prop.source
        ? 
        <MessageWithSource response={prop.response} source={prop.source}></MessageWithSource>
        : 
        <div className="MessageBox">
        <CustomAccordion response={prop.response}></CustomAccordion>
        </div>
}

function MessageWithSource(prop:{response: string, source: Object|null}) {
    const [isHidden, setIsHidden] = useState(true)
    return (
        <div className="MessageBox">
        <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
        >
            <Typography variant="body2">
                {prop.response}
            </Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Typography variant="body2">
                Sources:
                {Object.keys(prop.source!).map(
                    (key, index) => <div key={index}>
                                <div>{index + 1}. {key}</div>
                                <div>{prop.source?(prop.source as any)[key]:""}</div>
                            </div>
                )}
            </Typography>
        </AccordionDetails>
        </Accordion>
        </div>
    )
}

const CustomAccordion = (prop:{response: string}) => {
  return (
    <Paper
      elevation={1}
      sx={{
        borderRadius: 1,
        overflow: 'auto',
        border: '1px solid',
        borderColor: 'divider',
        '&:hover': {
          boxShadow: 3,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <Typography variant="body2">
            {prop.response}
        </Typography>
      </Box>
    </Paper>
  );
};

