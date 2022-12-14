import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import { maskPlate } from '../assets/js/mask';
import VideoList from '../components/videoList';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `1em`,
    marginRight: `1em`,
    backgroundColor: '#d4d4ff',
    borderRadius: '50px',
    transition: theme.transitions.create('width'),
    textTransform: 'uppercase',
    width: '100%',
  },
}));

export default function Home() {
  const [plate, setPlate] = React.useState('');
  const [videos, setVideos] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const searchPlate = () => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API}/api/cars/find`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ plate: plate?.replace(/ /g, '') || '' }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.records) {
          setVideos(data.records);
        }
      }
      );
  };

  React.useEffect(() => {
    searchPlate();
  }, []);



  return (
    <div className={styles.container}>
      <Head>
        <title>TRAF??KTEK?? ARABALAR</title>
        <meta name="description" content="Kendini s??r??c?? sanan insanlar??n arabalar??n?? burada bulabilirsiniz" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1>TRAF??KTEK?? ARABALAR</h1>
        </header>

        <a href="mailto:carsintraffichelp@gmail.com" className={styles.contact}>??leti??im</a>  
      </div>
      <p className={styles.description}>
        Trafikte ya??anan vur ka??, kavga, sald??r?? veya hatal?? s??r???? gibi davran????lar??n sosyal medya
         ??zerinde a????k olarak payla????lan videolar??n kay??t alt??nda tutuldu??u platform. Bizimle payla??mak
          istedi??iniz ara?? videosu veya videolar ile ilgili bir sorunuz var ise ileti??im ??zerinden bize g??nderebilirsiniz.</p>
      <Search>
        <StyledInputBase
          placeholder="34 EBC 123"
          value={plate}
          onChange={(e) => { setPlate(maskPlate(e.target.value)) }}
          onKeyDown={(e) => { if (e.key === 'Enter') { console.log('Enter pressed'); searchPlate(); } }}
          inputPropsSecondary={{
            maxLength: 10,
          }}
          inputProps={{ 'aria-label': 'search', 'maxlength': 10 }}
        />

        <Button variant="contained" onClick={searchPlate}>Ara</Button>
      </Search>

      <VideoList videoList={videos} />

      {loading &&
        <Box sx={{ display: 'flex', placeContent: 'center' }}>
          <CircularProgress />
        </Box>}

    </div>
  )
}
