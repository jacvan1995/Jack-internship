import "owl.carousel/dist/assets/owl.theme.default.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
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
    <div className="item">
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

  useEffect(() => {
    fetchCollections().then(data => {
      setCollections(data)
      setLoading(false)
    })
  }, [])

  async function fetchCollections() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setCollections(data);
  }
  useEffect(() => {
    setTimeout(() => {
      fetchCollections();
    }, 500);
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
          <OwlCarousel className="owl-theme" {...options}>
            {loading
              ? Array(4)
                  .fill()
                  .map((_, i) => <SkeletonCard key={i} />)
              : collections.map((collections, id) => (
                  <div className="item" key={id}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img
                            src={collections.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-coll"
                            src={collections.authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{collections.title}</h4>
                        </Link>
                        <span>{collections.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
