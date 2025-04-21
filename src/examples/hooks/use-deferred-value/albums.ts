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

// Cache for album queries
const albumCache = new Map<string, Promise<Album[]>>();

export const albumService = async (query: string): Promise<Album[]> => {
  // Return empty array if query is empty or less than 1 character
  if (query.length === 0) {
    return [];
  }

  // Check cache first
  if (albumCache.has(query)) {
    return albumCache.get(query)!;
  }

  // Create a new promise for this query
  const albumPromise = new Promise<Album[]>(async (resolve) => {
    // fake delay
    await new Promise(r => setTimeout(r, 500));

    // filter albums by query
    const results = prodigyAlbums.filter(album =>
      album.title.toLowerCase().includes(query.toLowerCase())
    );

    resolve(results);
  });

  // Store in cache
  albumCache.set(query, albumPromise);

  return albumPromise;
}
