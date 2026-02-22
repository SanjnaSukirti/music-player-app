import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AlbumContextAPI } from "../../context/AlbumContext";

const AlbumDetails = () => {
  let data = useLocation();
  let {
    state: { album },
  } = data;
  //console.log(album)
  let {
    songs,
    setSongs,
    isPlaying,
    setIsPlaying,
    currentSongIndex,
    setCurrentSongIndex,
  } = useContext(AlbumContextAPI);

  let handleClick = (index) => {
    setSongs(album.songs);
    setCurrentSongIndex(index);
    if (currentSongIndex === index) {
      setIsPlaying(!isPlaying);
    } else {
      setIsPlaying(true);
    }
  };

  const formatDuration = (duration) => {
    let minutes = Math.floor(duration / 60);
    let seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <section className="p-6">
      <article className="flex gap-8">
        <aside className="shrink-0">
          <img
            src={album.albumPoster}
            alt=""
            className="h-[370px] w-[300px] rounded-md"
          />
        </aside>
        <aside>
          <h2 className="text-3xl font-semibold">{album.albumTitle}</h2>
          <ul className="mt-4 flex flex-col gap-3 text-lg">
            <li className="flex">
              <span className="w-[160px]">Title</span>
              <span>{album.albumTitle}</span>
            </li>
            <li className="flex">
              <span className="w-[160px]">Number of Tracks</span>
              <span>{album.songs.length}</span>
            </li>
            <li className="flex">
              <span className="w-[160px]">Release Date</span>
              <span>{album.albumReleaseDate}</span>
            </li>
            <li className="flex">
              <span className="w-[160px]">Languages</span>
              <span>{album.albumLanguages}</span>
            </li>
            <li className="flex">
              <span className="w-[160px] shrink-0">Description</span>
              <span>{album.albumDescription}</span>
            </li>
          </ul>
        </aside>
      </article>
      <main
        className={`p-2 mt-4 bg-slate-950 rounded-lg ${
          currentSongIndex !== null && "mb-[120px]"
        }`}
      >
        <h3 className="text-xl px-4">Songs List</h3>
        <table className="w-full mt-4 text-left rounded-lg overflow-hidden">
          <thead className="bg-slate-700 uppercase w-full">
            <tr>
              <th className="px-4 py-3"></th>
              <th className="px-2 py-3">Track</th>
              <th className="px-2 py-3">Song Name</th>
              <th className="px-2 py-3">Singers</th>
              <th className="px-2 py-3">Director</th>
              <th className="px-2 py-3 text-center">Mood</th>
              <th className="px-2 py-3 text-center">Duration</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {album.songs.map((song, index) => {
              return (
                <tr
                  className="border-y-2 border-slate-700 hover:border-slate-500 cursor-pointer"
                  onClick={() => handleClick(index)}
                >
                  <td className="py-2 text-center">{index + 1}</td>
                  <td className="py-2 text-center">
                    <img
                      src={song.songThumbnailURL}
                      alt=""
                      className="h-12 w-[70%] rounded-lg"
                    />
                  </td>
                  <td className="py-2 ">{song.songName}</td>
                  <td className="py-2 ">{song.songSingers}</td>
                  <td className="py-2 ">{song.songDirector}</td>
                  <td className="py-2 text-center">{song.songMood}</td>
                  <td className="py-2 text-center">
                    {formatDuration(song.songDuration)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </section>
  );
};

export default AlbumDetails;
