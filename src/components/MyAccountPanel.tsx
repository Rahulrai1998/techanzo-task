import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import type { MyAccountData, TabPanelDataType } from '../store/data'
import type { FC } from 'react';

interface MyAccountPanelProps {
    data: TabPanelDataType | undefined | null
}
interface StyledTabsProps {
    children?: React.ReactNode;
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
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

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (

        <Box sx={{ bgcolor: 'rgba(238, 239, 255, 1)', borderRadius: "100px", padding: "0.5rem", width: "fit-content" }}>
            <StyledTabs
                value={value}
                onChange={handleChange}
                aria-label="styled tabs"
            >
                {data?.map((tab, index) => {
                    return <StyledTab
                        key={tab?.id}
                        label={tab?.acountTabLable}
                        iconSrc={tab?.icon}
                    />
                })}
            </StyledTabs>
        </Box>

    );
}

export default MyAccountPanel