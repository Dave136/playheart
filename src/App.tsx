import { useState } from 'react';
import { open } from '@tauri-apps/api/dialog';
import { readDir } from '@tauri-apps/api/fs';
import Player from './components/Player';
// import { invoke } from '@tauri-apps/api/tauri';
// import { Colors } from './constants';
import type { SongPath } from './types';

const App = () => {
  const [songs, setSongs] = useState<SongPath[]>();

  const handleOpenDialog = async () => {
    const filesPath = await open({ directory: true });
    const dir = await readDir(filesPath as string);
    const songs = dir.map<SongPath>((file) => ({
      name: file?.name ?? '',
      path: file?.path ?? '',
    }));

    setSongs(songs);

    // invoke('get_songs', { filesPath });
  };

  const playSong = async (selectedSong: SongPath) => {
    const song = songs?.find((song) => song.name === selectedSong.name);

    console.log(song?.path);
  };

  // return (
  //   <div className='grid grid-cols-[270px,1fr] grid-rows-[1fr, 150px] overflow-hidden h-screen w-full'>
  //     <aside className='p-4 flex w-72 bg-hex-ebebeb h-screen flex-col'>
  //       <header className='w-full h-16 flex justify-center items-center'>
  //         <h3 className='text-xl'>Scale</h3>
  //       </header>
  //       <section className='flex flex-col'>
  //         <h5 className='mt-4 ml-5 text-lg'>Library</h5>
  //         <ul className='ml-8 mt-4'>
  //           <li className={`text-[${Colors.Primary}] cursor-pointer`}>
  //             All Music
  //           </li>
  //         </ul>
  //       </section>
  //     </aside>
  //     <main className='max-w-3xl m-auto'>
  //       <div className='border-solid border-dark-900'>
  //         <Player />
  //       </div>
  //       {songs?.length ? (
  //         <button
  //           className='p-3 bg-white rounded-sm hover:(bg-light-200)'
  //           onClick={() => setSongs([])}
  //         >
  //           Clear
  //         </button>
  //       ) : null}
  //       {songs?.length ? (
  //         <ul className='bg-bg-red-200'>
  //           {songs.map((song) => (
  //             <li
  //               className='flex p-2 m-2 bg-gray-700 text-gray-50 rounded-md cursor-pointer'
  //               key={song.name}
  //               onClick={() => playSong(song)}
  //             >
  //               <h1 className='text-lg'>{song.name}</h1>
  //               <p className='text-sm'>location is: {song.path}</p>
  //             </li>
  //           ))}
  //         </ul>
  //       ) : (
  //         <button
  //           className='p-3 hidden bg-dark-600 text-white rounded-sm hover:(bg-light-200)'
  //           onClick={handleOpenDialog}
  //         >
  //           Add songs
  //         </button>
  //       )}
  //     </main>
  //     <footer>
  //       <p>Here goes the player</p>
  //     </footer>
  //   </div>
  // );

  return (
    <div className='grid grid-cols-[270px,1fr] grid-rows-[1fr,6.25rem] overflow-hidden h-screen w-full'>
      <aside className='col-span-1 bg-red-100 p-4'>
        <header>
          <h3>Scale</h3>
        </header>
        <section>
          <h5>Library</h5>
          <ul>
            <li>All Music</li>
          </ul>
        </section>
      </aside>
      <main className='flex justify-center items-center'>
        <p>Here goes the main content</p>
      </main>
      <Player />
    </div>
  );
};

export default App;
