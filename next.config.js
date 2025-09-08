
module.exports = {
  images: {
    remotePatterns: [
      new URL('https://s3ntp12387.s3.eu-west-2.amazonaws.com/images/**'), 
      new URL ('https://live.staticflickr.com/**'), 
      new URL ('https://upload.wikimedia.org/**')
    ],
  },
  allowedDevOrigins: ['http://local-host*']
}
