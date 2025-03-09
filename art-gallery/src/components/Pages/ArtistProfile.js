import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";
import { HiOutlinePaintBrush } from "react-icons/hi2";

const Spacer = ({ height = "20px" }) => {
  return (
    <div className="spacer-container" style={{ "--spacer-height": height }}>
      <div className="spacer-inner"></div>
    </div>
  );
};

const ArtistProfile = () => {
  return (
    <div className="artist-container">
      <div className="artist-header">
        <div className="artist-content">
          <div className="artist-image">
            <img
              src="https://res.cloudinary.com/dpilz4p6g/image/upload/v1741212727/galeria/galeria/Pallas%20Galaxy%20Collection/2019-2022/mczc7lwgqergchuuzvkw.jpg"
              alt="Artista"
            />
          </div>
          <div className="about-title">
            
            <h1>About the Art </h1>
          </div>
          <section className="text-container">
            <div className="text-block-left">
            
              <p><FaQuoteLeft className="quote-icon" /> 
                The art of Maria Pallas is a captivating fusion of surrealism,
                symbolism, and emotional depth. Each piece tells a story,
                inviting viewers into a world where the boundaries between
                reality and imagination blur.
              </p>
              <p>
                The compositions often juxtapose the whimsical with the
                profound, blending dreamlike elements with stark emotional
                contrasts. Through this interplay, the artwork explores themes
                of solitude, love, identity, and the passage of time, creating a
                visual dialogue that resonates on multiple levels.
              </p>
              <p>
                A hallmark of Maria Pallas’s work is the masterful use of color
                and composition. Whether through bold, striking palettes or
                subdued monochrome tones, each choice is intentional, amplifying
                the atmosphere and emotions within the scene.
              </p>
              <p>
                Rich textures and intricate details enhance the depth of the
                work, drawing the viewer deeper into its narrative layers.
                Figures—both human and animal—are often placed in surreal or
                unexpected contexts, sparking curiosity and inviting
                interpretation. <FaQuoteRight className="quote-icon" />
              </p>
            </div>
            <div className="line">
              <span className="icon" style={{ left: "20%" }}>
                <HiOutlinePaintBrush />
              </span>
              <span className="icon" style={{ left: "50%" }}>
                <HiOutlinePaintBrush />
              </span>
              <span className="icon" style={{ left: "80%" }}>
                <HiOutlinePaintBrush />
              </span>
            </div>

            <div className="text-block-right">
              <p><FaQuoteLeft className="quote-icon" /> 
                Symbolism plays a significant role in Maria Pallas’s artistic
                language. Recurring motifs such as tigers, birds, and enigmatic
                objects serve as metaphors, reflecting themes of power,
                vulnerability, transformation, or the subconscious mind.
              </p>
              <p>
                This interplay between familiar and fantastical elements
                challenges viewers to reflect on their own perceptions of
                reality, human nature, and the unseen forces that shape our
                emotions.
              </p>
              <p>
                Beyond the visual impact, Maria Pallas’s work resonates on an
                emotional level. Some pieces exude a quiet melancholy, while
                others burst with playful energy, yet all share a sense of
                introspection. The narratives woven into each artwork invite
                viewers to pause, question, and connect with their own emotions
                and experiences.
              </p>
              <p>
                Ultimately, the art of Maria Pallas is not just about
                aesthetics—it is an exploration of the human condition through
                surreal storytelling.
              </p>
              <p>
                It exists in that delicate space between beauty and unease,
                where meaning is fluid, and each observer is free to find their
                own truth within the imagery.
                <FaQuoteRight className="quote-icon" />
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;
