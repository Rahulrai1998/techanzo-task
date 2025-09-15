import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { withIds } from '../store/data';
import TabPanelWrapper from './TabPanelWrapper';
import MyAccountPanel from './MyAccountPanel';
import UnderProcessFallback from './UnderProcessFallback';
import LeftPanelProfileCard from './LeftPanelProfileCard';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            style={{ flex: 1, overflow: "auto" }}
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
        console.log(event?.target)
        setValue(newValue);
    };
    return (


        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: "100vh", width: "100vw", position: "fixed", top: 0, left: 0, bottom: 0 }}
        >
            <Tabs
                orientation="vertical"
                // variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs"
                sx={{
                    borderRight: 1,
                    borderColor: 'divider', p: "8px 16px",
                    '& .MuiTabs-indicator': { display: 'none' }, '& .MuiTabs-list': {
                        mt: "5rem"
                    },

                }}
            >
                {withIds?.filter(tab => tab?.tabLabel !== "My Account")?.map((tab, index) =>
                    <Tab
                        key={tab?.id} label={tab?.tabLabel}
                        {...a11yProps(index)}
                        icon={<img src={tab?.icon} alt={`${tab?.tabLabel} icon`} />}
                        iconPosition='start'
                        sx={{
                            fontWeight: 400,
                            fontSize: "16px",
                            margin: "0.6rem",
                            minHeight: "0px",
                            padding: "9px 4rem 9px 12px",
                            borderRadius: "12px",
                            color: "rgba(0, 0, 0, 1)",
                            '&.MuiTab-root': {
                                justifyContent: "flex-start !important",
                                textTransform: 'none',
                            },
                            '&.Mui-focusVisible': {
                                display: "none"
                            },
                            '&.Mui-selected': {
                                background: 'linear-gradient(104.11deg, #151C67 -0.52%, #2A38CD 111.07%)',
                                color: '#fff',
                                '& img': {
                                    filter: 'invert(100%) !important'
                                }
                            }
                        }} />
                )}
                <Typography
                    sx={{ fontWeight: 400, fontStyle: "regular", fontSize: "16px", lineHeight: "150%", letterSpacing: "-2%", margin: "0.6rem 0.6rem 0.2rem 0.6rem", }}>SETTINGS
                </Typography>
                <Tab
                    key={withIds[6]?.id} label={withIds[6]?.tabLabel}
                    {...a11yProps(6)}
                    icon={<img src={withIds[6]?.icon} alt={`${withIds[6]?.tabLabel} icon`} />}
                    iconPosition='start'
                    sx={{
                        fontWeight: 400,
                        fontSize: "16px",
                        margin: "0.6rem",
                        minHeight: "0px",
                        padding: "9px 4rem 9px 12px",
                        borderRadius: "12px",
                        color: "rgba(0, 0, 0, 1)",
                        '&.MuiTab-root': {
                            justifyContent: "flex-start !important",
                            textTransform: 'none',
                        },
                        '&.Mui-focusVisible': {
                            display: "none"
                        },
                        '&.Mui-selected': {
                            background: 'linear-gradient(104.11deg, #151C67 -0.52%, #2A38CD 111.07%)',
                            color: '#fff',
                            '& img': {
                                filter: 'invert(100%) !important'
                            }
                        }
                    }} />

            </Tabs>

            {withIds?.filter(tab => tab?.tabLabel !== "My Account").map((tab, index) => {
                return <TabPanel key={tab?.id} value={value} index={index}>
                    <TabPanelWrapper title={tab?.tabLabel} >
                        <UnderProcessFallback />
                    </TabPanelWrapper>
                </TabPanel>
            }
            )}


            <TabPanel key={withIds[6]?.id} value={value - 1} index={6}>
                <TabPanelWrapper title={withIds[6]?.tabLabel} >
                    <MyAccountPanel data={withIds[6]?.tabPanelData} />
                </TabPanelWrapper>
            </TabPanel>

            <LeftPanelProfileCard />
        </Box>


    );
}

