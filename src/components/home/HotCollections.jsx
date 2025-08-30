import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
window.$ = $;
window.jQuery = $;

/*
id
title
authorImage
nftImage
nftId
authorId
code
*/

const HotCollections = () => {
  const options = {
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 4 },
    },
  };

  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const SkeletonCard = () => (
    <div className="keen-slider__slide">
      <div className="nft__coll--skeleton">
        <div className="nft_wrap">
          <div className="skeleton__box--image" />
        </div>
        <div className="nft_coll_pp">
          <div className="skeleton__box--avatar" />
        </div>
        <div className="nft_coll_info">
          <div className="skeleton__box--title" />
          <div className="skeleton__box--subtitle" />
        </div>
      </div>
    </div>
  );

  async function fetchCollections() {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      setCollections(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch collections:", error);
      setLoading(false);
    }
  }
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 5000);
    fetchCollections();
    return () => clearTimeout(timeout);
  }, []);
  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>
        <OwlCarousel className="owl-theme" {...options}>
          {loading
            ? Array(4)
                .fill()
                .map((_, i) => (
                  <div className="item" key={i}>
                    <SkeletonCard />
                  </div>
                ))
            : collections.map((collection, id) => (
                <div className="item" key={id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img
                          src={collection.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{collection.title}</h4>
                      </Link>
                      <span>{collection.code}</span>
                    </div>
                  </div>
                </div>
              ))}
        </OwlCarousel>
      </div>
    </section>
  );
};

export default HotCollections;
