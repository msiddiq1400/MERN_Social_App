import { 
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined
} from "@mui/icons-material";
import { 
    Box, Divider, IconButton, Typography, useTheme
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPost } from "state";
import Friend from "components/Friend";

const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments
}) => {
    return (
        <WidgetWrapper>

        </WidgetWrapper>
    );
}

export default PostWidget;