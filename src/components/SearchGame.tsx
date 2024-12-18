import React, { useState } from 'react';
import CustomImage from './CustomImage'; // 新增导入

const SearchGame: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = () => {
    if (!query) return;
    setLoading(true);
    setError(null);
    fetch("https://igdb.mbc8482.workers.dev/v4/games", {
      method: 'POST',
      body: `fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,collections,cover.image_id,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites; search "${query}";`,
    })
      .then(response => response.json())
      .then(data => {
        setResults(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('搜索失败，请稍后再试。');
        setLoading(false);
      });
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <div className="flex mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l focus:outline-none"
          placeholder="搜索游戏..."
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
        >
          搜索
        </button>
      </div>
      {loading && <p className="text-gray-500">正在搜索...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="mt-4">
        {results.map((game, index) => (
          <div
            key={index}
            className="mb-2 p-4 border rounded shadow"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', game.cover ? `https://images.igdb.com/igdb/image/upload/t_1080p/${game.cover.image_id}.jpg` : '');
            }}
          >
            <h3 className="text-xl font-bold">{game.name}</h3>
            <p className="text-gray-700">{game.description}</p>
            {game.cover && (
              <CustomImage
                name={game.name}
                imageId={game.cover.image_id}
                altText={`${game.name} 封面`}
                size="1080p"
                classes="mt-2"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchGame;
