import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CountdownTimer from "../tools/timer";
import axios from "axios";

const ExploreItems = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);
  const [sortOption, setSortOption] = useState("");

  async function fetchCollections() {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
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
    <div
      className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
      style={{ display: "block", backgroundSize: "cover" }}
    >
      <div className="nft__item skeleton">
        <div className="author_list_pp">
          <div className="skeleton-circle pp-author" />
          <i className="fa fa-check skeleton-icon"></i>
        </div>

        <div className="skeleton-countdown" />

        <div className="nft__item_wrap">
          <div className="skeleton-box nft__item_preview" />
        </div>

        <div className="nft__item_info">
          <div className="skeleton-text skeleton-title" />
          <div className="skeleton-text skeleton-price" />
          <div className="nft__item_like">
            <i className="fa fa-heart skeleton-heart" />
            <div className="skeleton-text skeleton-likes" />
          </div>
        </div>
      </div>
    </div>
  );

  const sortedCollections = [...collections];

if (sortOption === "price_low_to_high") {
  sortedCollections.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
} else if (sortOption === "price_high_to_low") {
  sortedCollections.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
} else if (sortOption === "likes_high_to_low") {
  sortedCollections.sort((a, b) => b.likes - a.likes);
}

  const visibleItems = sortedCollections.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const renderedItems = visibleItems
    .slice(0, visibleCount)
    .map((collection, id) => (
      <div
        key={collection.id || id}
        className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
        style={{ display: "block", backgroundSize: "cover" }}
      >
        <div className="nft__item">
          <div className="author_list_pp">
            <Link to="/author" data-bs-toggle="tooltip" data-bs-placement="top">
              <img className="lazy" src={collection.authorImage} alt="" />
              <i className="fa fa-check"></i>
            </Link>
          </div>
          <div>
            <CountdownTimer expiryDate={collection.expiryDate} />
          </div>
          <div className="nft__item_wrap">
            <div className="nft__item_extra">
              <div className="nft__item_buttons">
                <button>Buy Now</button>
                <div className="nft__item_share">
                  <h4>Share</h4>
                  <a href="" target="_blank" rel="noreferrer">
                    <i className="fa fa-facebook fa-lg"></i>
                  </a>
                  <a href="" target="_blank" rel="noreferrer">
                    <i className="fa fa-twitter fa-lg"></i>
                  </a>
                  <a href="">
                    <i className="fa fa-envelope fa-lg"></i>
                  </a>
                </div>
              </div>
            </div>
            <Link to="/item-details">
              <img
                src={collection.nftImage}
                className="lazy nft__item_preview"
                alt=""
              />
            </Link>
          </div>
          <div className="nft__item_info">
            <Link to="/item-details">
              <h4>{collection.title}</h4>
            </Link>
            <div className="nft__item_price">{collection.price} ETH</div>
            <div className="nft__item_like">
              <i className="fa fa-heart"></i>
              <span>{collection.likes}</span>
            </div>
          </div>
        </div>
      </div>
    ));

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        Array(8)
          .fill()
          .map((_, i) => (
            <div>
              <SkeletonCard />
            </div>
          ))
      ) : (
        <div
          style={{ display: "flex", backgroundSize: "cover", flexWrap: "wrap" }}
        >
          {renderedItems}
        </div>
      )}
      <div className="col-md-12 text-center">
        <Link
          onClick={handleLoadMore}
          to=""
          id="loadmore"
          className="btn-main lead"
        >
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
