import React from "react";

const ArtistProfile = () => {
  return (
    <div className="artist-container">
      <div className="artist-header">
        {/* <h1>Exploring the World Through Art</h1> */}
        <p>Born in Bremen, Germany, the artist finds inspiration in places like Istanbul,
           Berlin, Algarve, and Varna
           Since childhood in Bremen, the artist has always been fascinated by cultural diversity.
            Her travels have shaped her artistic vision, influencing her creations that blend colors,
            textures, and unique forms.</p>
      </div>
      <div className="artist-content">
        <div className="artist-image">
          <img src= "/img/Afrikakreis.jpg" alt="Artista" />
        </div>
      
      </div>
    </div>
  );
};

export default ArtistProfile;




