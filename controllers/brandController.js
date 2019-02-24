"use strict";
const fs = require('fs');
const axios = require('axios');
const NodeCache = require( "node-cache" );
const responseCache = new NodeCache( { stdTTL: 60, checkperiod: 70 } );


let posts = [];
let promises = [];

let controller = {
    getData: async function (req, res) {
        try
        {
            await fetchBrandPosts();
            let postsToRender = [];
            axios.all(promises).then(function() {
                for(let key in posts)
                {
                    postsToRender.push(posts[key]);
                }

                postsToRender = postsToRender.sort(function (postA, postB) {
                   return Date.parse(postB.date) - Date.parse(postA.date)
                });

                res.render('index', {
                    title: "posts",
                    body: postsToRender.slice(0, 10)
                });
            });


        }
        catch(e)
        {
            console.error(e);
        }


    }

};

let helpers = {
    buildRequestString(page=1,per_page=20,order_by="date",order="desc") {
        return "page="+page+"&per_page="+per_page+"&orderby="+order_by+"&order="+order;
    },

};

function fetchBrandPosts()
{
    brands.forEach( function(brand_uri)
    {

        try
        {
            let value = responseCache.get( brand_uri, true );
            value.forEach(function(post){
                posts[post.id+""+brand_uri] = post;
            });
        }
        catch( err ){
            let promise = axios.get("https://"+brand_uri+'/wp-json/wp/v2/posts?'+helpers.buildRequestString())
                .then((response) => {
                    response.data.forEach(function(post){
                        posts[post.id+""+brand_uri] = post;
                    });
                    responseCache.set(brand_uri, response.data, 60);
                })
                .catch((error) => {
                        console.error(error);
                    }
                );
            promises.push(promise);
        }

    });

}


const brands = [
    "www.teknikensvarld.se",
    "www.alltommat.se",
    "www.skonahem.com",
    "mama.nu"
];
module.exports = controller;