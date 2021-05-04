import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

export const ArtistSearch = (props) => {
  const { token } = props;
  const [searchArtistName, setSearchArtistName] = useState("");
  const [resultArtistDatas, setResultArtistDatas] = useState([]);

  const handleSearchInputChanges = (e) => setSearchArtistName(e.target.value);

  // 検索実行
  const onClickSearchArtist = async () => {
    await axios
      .get(
        `https://api.spotify.com/v1/search?q=${searchArtistName}&type=artist&limit=20`,
        {
          headers: { Authorization: "Bearer " + token },
          data: {}
        }
      )
      .then((res) => {
        const result = [res.data.artists.items];
        setResultArtistDatas(result);
        console.log(resultArtistDatas[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <input
        value={searchArtistName}
        onChange={handleSearchInputChanges}
        type="text"
        placeholder="アーティスト名を入力"
      />
      <button onClick={onClickSearchArtist} type="submit">
        検索
      </button>
      {resultArtistDatas.length ? (
        resultArtistDatas[0].map((artist) => (
          <SDl key={artist.id}>
            <img
              height={160}
              width={160}
              src={artist?.images[1]?.url || ""}
              alt={artist.name}
            />
            <dd>{artist.name}</dd>

            <dt>ポピュラリティ</dt>
            <dd>{artist.popularity}</dd>
            <dt>ジャンル</dt>
            <dd>
              {artist.genres &&
                artist.genres.map((genreName) => `${genreName}, `)}
            </dd>
            <dt>uri</dt>
            <dd>{artist.uri}</dd>
          </SDl>
        ))
      ) : (
        <div></div>
      )}
    </>
  );
};

const SDl = styled.dl`
  text-align: left;
  margin-bottom: 0;
  dt {
    float: left;
  }
  dd {
    padding-left: 32px;
    padding-bottom: 8px;
    overflow-wrap: break-word;
  }
`;
