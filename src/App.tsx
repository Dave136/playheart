import { useState } from 'react';
import { open } from '@tauri-apps/api/dialog';
import { readDir } from '@tauri-apps/api/fs';
// import { invoke } from '@tauri-apps/api/tauri';
import Player from './components/Player';

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

  return (
    <div>
      <main className='max-w-3xl m-auto'>
        <div className='border-solid border-dark-900'>
          <Player />
        </div>
        {songs?.length ? (
          <button
            className='p-3 bg-white rounded-sm hover:{bg-light-200}'
            onClick={() => setSongs([])}
          >
            Clear
          </button>
        ) : null}
        {songs?.length ? (
          <ul className='bg-bg-red-200'>
            {songs.map((song) => (
              <li
                className='flex p-2 m-2 bg-gray-700 text-gray-50 rounded-md cursor-pointer'
                key={song.name}
                onClick={() => playSong(song)}
              >
                <h1 className='text-lg'>{song.name}</h1>
                <p className='text-sm'>location is: {song.path}</p>
              </li>
            ))}
          </ul>
        ) : (
          <button
            className='p-3 hidden bg-dark-600 text-white rounded-sm hover:{bg-light-200}'
            onClick={handleOpenDialog}
          >
            Add songs
          </button>
        )}
      </main>
    </div>
  );
};

export default App;
