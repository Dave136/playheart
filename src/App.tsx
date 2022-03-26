import { open } from '@tauri-apps/api/dialog';
import { readDir } from '@tauri-apps/api/fs';
// import { invoke } from '@tauri-apps/api/tauri';
import { useState } from 'react';

type SongPath = {
  name: string;
  path: string;
};

const App = () => {
  const [songs, setSongs] = useState<SongPath[]>();

  const handleOpenDialog = async () => {
    const filesPath = await open({ directory: true });
    const dir = await readDir(filesPath as string);
    const songs = dir.map(({ name, path }) => ({
      name,
      path,
    })) as unknown as SongPath[];

    setSongs(songs);

    // invoke('get_songs', { filesPath });
  };

  return (
    <div className='bg-gray-600 h-screen'>
      <main className='max-w-3xl m-auto'>
        <h1 className='text-2xl text-white text-center pt-5'>
          Playheart App 🎵
        </h1>
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
              <li className='flex p-2 m-2 bg-gray-700 text-gray-50 rounded-md'>
                <h1 className='text-lg'>{song.name}</h1>
                <p className='text-sm'>location is: {song.path}</p>
              </li>
            ))}
          </ul>
        ) : (
          <button
            className='p-3 bg-white rounded-sm hover:{bg-light-200}'
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
