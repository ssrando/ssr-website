import React from "react";
import Typography from "@mui/material/Typography";
import { AppBar, Box, Toolbar } from "@mui/material";

class Footer extends React.Component {
  render() {
    return (
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
            <Toolbar sx={{flexDirection: 'column'}}>
                <Box sx={{ flexGrow: 1 }}/>
                <Typography variant="h6">
                    Skyward Sword Randomizer
                </Typography>
                <Typography variant="body2">
                    In-game imagery and system logos Copyright © Nintendo, 2011-2021 - The Skyward Sword Randomizer communnity does <b>not</b> share copyrighted material
                </Typography>
                <Box sx={{ flexGrow: 1 }}/>
            </Toolbar>
        </AppBar>
    );
  }
}

export default Footer;
