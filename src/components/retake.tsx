import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

export interface Props {
    onClose: () => void; // Function that closes the alert
}

export default function TransitionAlerts(props: Props) {
    const { onClose } = props;

    return (
        <Box sx={{ width: '30%' }}>
            <Collapse in={true}>
                <Alert severity="warning"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={onClose}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    You have 2 consecutive wrong answers. You may want to rewatch the video course and try again.
                </Alert>
            </Collapse>

        </Box>
    );
}
