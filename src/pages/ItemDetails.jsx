import React, { useState, useEffect } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import nftImage from "../images/nftImage.jpg";
import axios from "axios";
import Aos from "aos";
/*
"id"
"title"
"tag"
"description"
"nftImage"
"nftId"
"ownerName"
"ownerId"
"ownerImage"
"creatorName"
"creatorId"
"creatorImage"
*/

const ItemDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { nftId } = useParams();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(null);

  async function fetchItem() {
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
      );
      console.log(data);
      setItem(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch collections:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchItem();
  }, [nftId]);

  const Skeleton = () => (
  <div className="container">
    <div className="row">
      <div className="col-md-6 text-center">
        <div className="skeleton-box skeleton-image" />
      </div>

      <div className="col-md-6">
        <div className="item_info">
          <div className="skeleton-text skeleton-title" />
          <div className="item_info_counts">
            <div className="skeleton-text skeleton-count" />
            <div className="skeleton-text skeleton-count" />
          </div>
          <div className="skeleton-text skeleton-description" />

          <div className="d-flex flex-row">
            <div className="mr40">
              <div className="skeleton-text skeleton-subtitle" />
              <div className="item_author">
                <div className="skeleton-circle skeleton-avatar" />
                <div className="skeleton-text skeleton-name" />
              </div>
            </div>
          </div>

          <div className="de_tab tab_simple">
            <div className="de_tab_content">
              <div className="skeleton-text skeleton-subtitle" />
              <div className="item_author">
                <div className="skeleton-circle skeleton-avatar" />
                <div className="skeleton-text skeleton-name" />
              </div>
            </div>
            <div className="spacer-40" />
            <div className="skeleton-text skeleton-subtitle" />
            <div className="nft-item-price">
              <div className="skeleton-box skeleton-eth-icon" />
              <div className="skeleton-text skeleton-price" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

  if (loading) {
    return <Skeleton/>;
  }
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={item.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>
                    {item.title} #{item.tag}
                  </h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {item.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {item.likes}
                    </div>
                  </div>
                  <p>{item.description}</p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.ownerId}`}>
                            <img
                              className="lazy"
                              src={item.ownerImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.ownerId}`}>{item.ownerName}</Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.creatorId}`}>
                            <img
                              className="lazy"
                              src={item.creatorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.creatorId}`}>{item.creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{item.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
