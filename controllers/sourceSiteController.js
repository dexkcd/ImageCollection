"use strict";
const fs = require('fs');
const axios = require('axios');
let posts = [];

let controller = {
    getData: async function (req, res) {
        try
        {
            let postsPromise = await fetchBrandPosts();
            let postsToRender = [];
            for(let key in posts)
            {
                console.log(key);
                postsToRender.push(posts[key]);
            }
            res.render('index', {
                title: "posts",
                body: postsToRender
            });
        }
        catch(e)
        {
            console.error(e);
        }


    }

};

let helpers = {
    buildRequestString(page=1,per_page=10,order_by="date",order="desc") {
        return "page="+page+"&per_page="+per_page+"&orderby="+order_by+"&order="+order;
    },

};

function fetchBrandPosts()
{
    brands.forEach( function(brand_uri)
    {

        axios.get("https://"+brand_uri+'/wp-json/wp/v2/posts?'+helpers.buildRequestString())
            .then((response) => {
                response.data.forEach(function(post){
                    posts[post.id+""+brand_uri] = post;
                });
            })
            .catch((error) => {
                    console.error(error);
                }
            );
    });

};


const brands = [
    "www.teknikensvarld.se",
    "www.alltommat.se",
    "www.skonahem.com"
];
module.exports = controller;