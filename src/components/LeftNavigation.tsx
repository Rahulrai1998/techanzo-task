import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { withIds } from '../store/data';
import TabPanelWrapper from './TabPanelWrapper';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function LeftNavigation() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: "100vh" }}
        >
            <Tabs
                orientation="vertical"
                // variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs"
                sx={{ borderRight: 1, borderColor: 'divider', p: "8px 16px", '& .MuiTabs-indicator': { display: 'none' } }}


            >
                {withIds?.map((tab, index) => <Tab key={tab?.id} label={tab?.tabLabel} {...a11yProps(index)} icon={<img src={tab?.icon} alt={`${tab?.tabLabel} icon`} />} iconPosition='start' sx={{
                    margin: "0.6rem",
                    minHeight: "0px",
                    padding: "8px 5rem 8px 8px",

                    borderRadius: "12px",
                    '&.Mui-focusVisible': {
                        display: "none"


                    },
                    '&.Mui-selected': {
                        background: 'linear-gradient(104.11deg, #151C67 -0.52%, #2A38CD 111.07%)',
                        color: '#fff',
                    },
                }} />)}

            </Tabs>
            {withIds?.map((tab, index) =>
                <TabPanel key={tab?.id} value={value} index={index}>
                    <TabPanelWrapper title={tab?.tabLabel} />
                </TabPanel>)}

        </Box>
    );
}

