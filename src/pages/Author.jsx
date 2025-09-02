import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";

const Author = () => {
  const [items, setItems] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [authorData, setAuthorData] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchAuthor() {
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
        );

        if (isMounted) {
          setAuthorData(data);
          setFollowerCount(data.followers)
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch author:", error);
        if (isMounted) {
          setAuthorData(null);
          setLoading(false);
        }
      }
    }

    fetchAuthor();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleFollowToggle = () => {
  setIsFollowing(prev => !prev);
  setFollowerCount(prev => prev + (isFollowing ? -1 : 1));
};
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(
    authorData?.followers || 0
  );

  useEffect(() => {
    let isMounted = true;

    async function fetchAuthorItems() {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
        );
        if (isMounted) {
          setItems(Array.isArray(data.nftCollection) ? data.nftCollection : []);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch author:", error);
        if (isMounted) setItems([]);
        setLoading(false);
      }
    }

    fetchAuthorItems();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return <div>Loading author profile...</div>;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={authorData.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authorData.authorName}
                          <span className="profile_username">
                            @{authorData.tag}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {authorData.address}
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
                      <div className="profile_follower">
                        {followerCount} Followers
                      </div>
                      <button className="btn-main" onClick={handleFollowToggle}>
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    items={authorData.nftCollection || []}
                    loading={loading}
                  />
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
