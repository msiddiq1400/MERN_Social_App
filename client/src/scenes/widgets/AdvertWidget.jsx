import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
    const {palette} = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography color={dark} variant="h5" fontWeight="500">Sponsored</Typography>
                <Typography color={medium}>Create Add</Typography>
            </FlexBetween>
            <img 
                width="100%"
                height="aut0"
                alt="advert"
                src="http://localhost:3001/assets/info4.jpeg"
                style={{borderRadium: "0.75rem", margin: "0.75rem 0"}}
            />
            <FlexBetween>
                <Typography color={main}>My Cosmetics</Typography>
                <Typography color={medium}>Cosmetics.com</Typography>
            </FlexBetween>
            <Typography color={medium} m="0.5rem 0">
                it is best to work hard and learn new things with time
            </Typography>
        </WidgetWrapper>
    );
};

export default AdvertWidget;