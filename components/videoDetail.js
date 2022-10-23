import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, Card, CardContent, CardActions } from '@mui/material';
import styles from './videoContainer.module.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '90%',
    width: '90%',
    height: '90%',
};

const VideoModal = ({ open, handleClose, video }) => {

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    spacing={0}
                    sx={style}
                >
                    <Grid item xs={12} md={6} className={styles.relative}>
                        <Card sx={{ maxWidth: '100%', flexGrow: 1, cursor: 'pointer' }}>
                            <video
                                autoPlay
                                loop
                                className={styles.video}
                                controls
                                poster="https://assets.codepen.io/6093409/river.jpg"
                            >
                                <source
                                    src={video?.videos}
                                    type="video/mp4"
                                />
                            </video>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    <strong>Plaka: </strong>{video.plate}
                                </Typography>
                                <Typography variant="body2">
                                    <br />
                                    <strong>Açıklama: </strong>{video.description || 'Açıklama yapılmamış'}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={handleClose}>Kapat</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </Modal>
        </div>
    );
}

export default VideoModal;