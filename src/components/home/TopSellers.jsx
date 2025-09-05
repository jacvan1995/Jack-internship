import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchCollections() {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
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
    <li>
      <div className="author_list_pp">
        <div className="skeleton-circle pp-author" />
        <i className="fa fa-check skeleton-icon"></i>
      </div>
      <div className="author_list_info">
        <div className="skeleton-text skeleton-name" />
        <div className="skeleton-text skeleton-eth" />
      </div>
    </li>
  );

  return (
    <section id="section-popular" className="pb-5">
      <div className="container" data-aos= "fade-up">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading
                ? Array(12)
                    .fill()
                    .map((_, id) => (
                      <div key={id}>
                        <SkeletonCard />
                      </div>
                    ))
                : collections.map((collection, id) => (
                    <li key={id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${collection.authorId}`}>
                          <img
                            className="pp-author"
                            src={collection.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${collection.authorId}`}>{collection.authorName}</Link>
                        <span>{collection.price} ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
