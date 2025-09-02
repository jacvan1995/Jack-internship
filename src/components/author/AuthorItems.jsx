import React from "react";
import { Link } from "react-router-dom";

const AuthorItems = ( {items, loading} ) => {

  const SkeletonCard = () => (
  <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
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
  

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading ? (
            Array.from({ length: 8 }, (_, i) => <SkeletonCard key={i} />)
            ) : items && items.length > 0 ? (
            items.map((collection, id) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={collection.id || id}
              >
                <div className="nft__item">
                  <div>
                    <Link to="">
                      <img
                        className="lazy"
                        src={collection.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
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
                    <div className="nft__item_price">
                      {collection.price} ETH
                    </div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{collection.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No items found for this author</div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
