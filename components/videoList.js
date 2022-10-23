import styles from "../styles/Video.module.css";

import * as React from 'react';
import VideoModal from "./videoDetail";
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Grid } from "@mui/material";

const VideoList = ({ videoList }) => {
    const [selectedVideo, setSelectedVideo] = React.useState({});
    const [showVideo, setShowVideo] = React.useState(false);

    const setSelectedModal = (video) => {
        setSelectedVideo(video);
        setShowVideo(true);
    };

    return (
        <div className={styles.container}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                {videoList.map((video) =>
                    <Grid item xs={12} md={3} justifyContent="center" key={'videoCard' + video.plate}>
                        <Card component="li" sx={{ maxWidth: 300, flexGrow: 1, cursor: 'pointer', margin: 'auto' }} onClick={() => { setSelectedModal(video) }}>
                            <CardCover>
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    poster="https://assets.codepen.io/6093409/river.jpg"
                                >
                                    <source
                                        src={video.videos}
                                        type="video/mp4"
                                    />
                                </video>
                            </CardCover>
                            <CardContent>
                                <Typography
                                    level="h6"
                                    fontWeight="lg"
                                    textColor="#fff"
                                    mt={{ xs: 12, sm: 18 }}
                                    className={styles.title}
                                >
                                    {video.plate}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>)}
            </Grid>
            <VideoModal open={showVideo} handleClose={() => { setShowVideo(false) }} video={selectedVideo} />
        </div>
    );
};

export default VideoList;