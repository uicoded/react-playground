export type Album = {
  id: number
  title: string
  year: number
}

export const prodigyAlbums: Album[] = [
  { id: 1, title: "Experience", year: 1992 },
  { id: 2, title: "Music for the Jilted Generation", year: 1994 },
  { id: 3, title: "The Fat of the Land", year: 1997 },
  { id: 4, title: "Always Outnumbered, Never Outgunned", year: 2004 },
  { id: 5, title: "Invaders Must Die", year: 2009 },
  { id: 6, title: "The Day Is My Enemy", year: 2015 },
  { id: 7, title: "No Tourists", year: 2018 }
];


export const albumService = async (query: string): Promise<Album[]> => {

  // Return empty array if query is empty or less than 1 character
  if (query.length === 0) {
    return [];
  }

  // fake delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // filter albums by query
  return prodigyAlbums.filter(album => album.title.toLowerCase().includes(query.toLowerCase()));
}
