import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from 'react';

import SearchIcon from '@mui/icons-material/Search';
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

  const searchPlate = () => {
    fetch(`${process.env.NEXT_PUBLIC_API}/api/cars/find`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ plate: plate?.replace(/ /g, '') || '' }),
    })
      .then((res) => res.json())
      .then((data) => {
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
        <title>TRAFİKTEKİ ARABALAR</title>
        <meta name="description" content="Kendini sürücü sanan insanların arabalarını burada bulabilirsiniz" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h1>TRAFİKTEKİ ARABALAR</h1>
        </header>
      </div>
      <p className={styles.description}>Trafikte yaşanan vur kaç, kavga, saldırı veya hatalı sürüş gibi davranışların sosyal medya üzerinde açık olarak paylaşılan videoların kayıt altında tutulduğu platform. Bizimle paylaşmak istediğiniz araç videosu var ise iletişim üzerinden bize gönderebilirsiniz.</p>
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

    </div>
  )
}
