import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthorItems from "../author/AuthorItems";

const HotCollections = () => {

  const [collections, setCollections] = useState([])

    async function fetchCollections() {
            const { data } = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
            setCollections(data)
        }
    useEffect(() => {
        setTimeout(() => {
            fetchCollections()
        }, 500)
    }, [])

    function renderCollections() {
        return collections.map((collections) => (
            <Link to = {`/hotCollections/${collections.id}`} key = { collections.id }>
                <AuthorItems
                id = { collections.id }
                title = { collections.title }
                authorImage = { collections.authorImage }
                nftImage = { collections.nftImage }
                />
            </Link>
        ))
    }
    
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
          {new Array(4).map((collections, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={collections.nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
                    <img className="lazy pp-coll" src={collections.authorImage} alt="" />
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
        </div>
      </div>
    </section>
  );
};


export default HotCollections;
