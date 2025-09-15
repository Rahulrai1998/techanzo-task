import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import type { FC } from 'react';
import * as React from 'react';
import left from "../assets/leftArrow.png";
import right from "../assets/rightArrow.png";
import type { MyAccountProfileData, TabPanelDataType } from '../store/data';
import ProfilePanel from './ProfilePanel';
import UnderProcessFallback from './UnderProcessFallback';
interface MyAccountPanelProps {
    data: TabPanelDataType | undefined | null
}
interface StyledTabsProps {
    children?: React.ReactNode;
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            style={{ flex: 1 }}
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box >
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const StyledTabs = styled((props: StyledTabsProps) => (
    <Tabs
        {...props}
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
))({
    alignItems: "center",
    '& .MuiTabs-list': {
        justifyContent: "center",
        gap: "0.5rem",
    },
    '& .Mui-focusVisible': {
        display: "none"
    },
    '& .Mui-selected': {
        background: 'linear-gradient(104.11deg, #151C67 -0.52%, #2A38CD 111.07%)',
        color: '#fff',
        '& img': {
            filter: 'invert(100%) !important'
        }
    },
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        display: "none"
    },
});

interface StyledTabProps {
    label: string;
    iconSrc: string
}

const StyledTab = styled((props: StyledTabProps) => (
    <Tab disableRipple icon={<img src={props?.iconSrc} alt={`${props.label} icon`} />} iconPosition='start' {...props} />
))(({ theme }) => ({
    borderRadius: "100px",
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),

    minHeight: "0px",
    backgroundColor: "white",

    '&.Mui-selected': {
        color: '#fff',
    },
    '&.Mui-focusVisible': {
        backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
}));
const MyAccountPanel: FC<MyAccountPanelProps> = ({ data }) => {
    const [value, setValue] = React.useState(0);
    const dataLength = data?.length ?? 0
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log(event?.target)
        setValue(newValue);
    };

    const handleLeft = () => {
        if (value > 0)
            setValue(val => val - 1)

    }
    const handleRight = () => {
        if (value < dataLength - 1)
            setValue(val => val + 1)
    }

    return (
        <Box>
            <Box sx={{ bgcolor: 'rgba(238, 239, 255, 1)', borderRadius: "100px", padding: "5px 9px", width: "fit-content" }}>
                <StyledTabs
                    value={value}
                    onChange={handleChange}
                    aria-label="styled tabs"
                >
                    {data?.map((tab) => {
                        return <StyledTab
                            key={tab?.id}
                            label={tab?.acountTabLable}
                            iconSrc={tab?.icon}
                        />
                    })}
                </StyledTabs>

            </Box>
            {data?.map((tab, index) => {
                return <TabPanel key={tab?.id} value={value} index={index}>
                    {tab?.acountTabLable === "Profile" ? <ProfilePanel initialData={tab?.panelData as MyAccountProfileData} /> : <UnderProcessFallback />}
                </TabPanel>
            }
            )}

            <TabNavBtns>
                <button onClick={handleLeft} hidden={value === 0}><img src={left} alt="Left arrow" /></button>
                <button onClick={handleRight} hidden={value === dataLength - 1}><img src={right} alt="Right Arrow" /></button>
            </TabNavBtns>
        </Box>

    );
}

export default MyAccountPanel

const TabNavBtns = styled("div")({
    display: "flex",
    justifyContent: "flex-start",
    "button": {
        background: "transparent",
        border: "none",
        gap: "2px",
        width: "fit-content",
        cursor: "pointer"
    }
})

// const ButtnGroup = styled("div")({
//     display: 'flex',
//     justifyContent: "flex-end",
//     gap
// })

