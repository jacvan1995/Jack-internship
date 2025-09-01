import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";

const Author = () => {
  const authors = [
  { name: "Monica Lucas", id: "83937449" },
  { name: "Lori Hart", id: "73855012" },
  { name: "Gayle Hicks", id: "49986179" },
  { name: "Stacy Long", id: "90432259" },
  { name: "Mamie Barnett", id: "40460691" },
  { name: "Jimmy Wright", id: "87818782" },
  { name: "Claude Banks", id: "52045866" },
  { name: "Ida Chapman", id: "39623982" },
  { name: "Fred Ryan", id: "18556210" },
  { name: "Nicholas Daniels", id: "55757699" },
  { name: "Karla Sharp", id: "31906377" },
  { name: "Frankiln Greer", id: "72378156" }
];

  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchCollections() {
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
      );
      setCollections(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch collections:", error);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchCollections();
  }, []);



  const SkeletonCard = () => (
    <div>
      
    </div>
  );
  
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${collection.authorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={collection.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          Monica Lucas
                          <span className="profile_username">@monicaaaa</span>
                          <span id="wallet" className="profile_wallet">
                            UDHUHWudhwd78wdt7edb32uidbwyuidhg7wUHIFUHWewiqdj87dy7
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">573 followers</div>
                      <Link to="#" className="btn-main">
                        Follow
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
