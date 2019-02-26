# ImageCollection

Collects Images from a set list of wordpress websites

## Running natively

npm install

npm start

## Using Docker

docker build -t imagecollect/node-app:1.0 .

docker run -p 3000:3000 -d imagecollect/node-app:1.0

## Accessing the site

Add the header x-secret:1234

[You can use modheader from Chrome here]
(https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj?hl=en)

You can visit the site at:

* localhost:3000

* 127.0.0.1:3000
