const VideoModel = require("./models/videoModel");
const ChannelModel = require("./models/channelModel");
const mongoose = require("mongoose");
mongoose
      .connect("mongodb://127.0.0.1:27017/techtotube")
      .then(() => {
            console.log("connected to mongodb");
      })
      .catch((e) => {
            console.log(e);
      });
//   type: mongoose.Schema.Types.ObjectId,

const videos = [
      {
            title: "Samsung Tab S9 Ultra: Is the iPad Killer Real?",
            youtubeId: "sl0UUhmaiDU",
            thumbnail:
                  "https://img.youtube.com/vi/sl0UUhmaiDU/maxresdefault.jpg",
            description: "samsungs biggest tablet review",
            uploadedDate: "06/01/1998",
            category: "tablets",
            channel: "64e9c976823c65a88acf8762",
      },
      {
            title: "Driving The New Fastest Car Ever Made!",
            youtubeId: "sF9xYtouZjY",
            thumbnail:
                  "https://img.youtube.com/vi/sF9xYtouZjY/maxresdefault.jpg",
            description:
                  "Rimac Nevera is the quickest/fastest production car ever made (0-60 in 1.74s) and solidifies the future of electricity in automotive",
            uploadedDate: "06/01/1998",
            category: "cars",
            channel: "64e9c976823c65a88acf8762",
      },
      {
            title: "Framework 16 - Performance vs Price...",
            youtubeId: "Zy5MWFrb0Y8",
            thumbnail:
                  "https://img.youtube.com/vi/Zy5MWFrb0Y8/maxresdefault.jpg",
            description:
                  "The Framework 16 with AMD RX 7700S benchmarks. This is the best gaming laptop you can get for modular portable gaming, but we gotta talk about the price of upgrading modules",
            uploadedDate: "20 Jul 2023",
            category: "laptops",
            channel: "64e9c976823c65a88acf8765",
      },
      {
            title: "Nothing Phone (2) - They’ve Changed…",
            youtubeId: "8WNZzhwZcJA",
            thumbnail:
                  "https://img.youtube.com/vi/8WNZzhwZcJA/maxresdefault.jpg",
            description: "First impressions of the Nothing Phone 2.",
            uploadedDate: "11 Jul 2023",
            category: "mobiles",
            channel: "64e9c976823c65a88acf8765",
      },
      {
            title: "15inch M2 MacBook Air Review - FINALLY!",
            youtubeId: "RIphIqHEdxY",
            thumbnail:
                  "https://img.youtube.com/vi/RIphIqHEdxY/maxresdefault.jpg",
            description:
                  "My review of the Apple 15-inch M2 MacBook Air compared against the 13 M2 MacBook Air and 14 MacBook Pro",
            uploadedDate: "12 Jun 2023",
            category: "laptops",
            channel: "64e9c976823c65a88acf8765",
      },
      {
            title: "1 Month with LG’s 5K 49-inch Ultrawide Monitor! | The Tech Chap",
            youtubeId: "F4NsvHNXZBY",
            thumbnail:
                  "https://img.youtube.com/vi/F4NsvHNXZBY/maxresdefault.jpg",
            description:
                  "The LG 49WL95C Super Ultrawide Monitor a productivity dream with a 49-inch, 5K IPS display and ultrawide 32:9 aspect ratio. Plus it offers HDR10, USB C, 2x 10w Speakers and a beautifully designed stand.",
            uploadedDate: "10 May 2019",
            category: "monitors",
            channel: "64e9c976823c65a88acf8767",
      },
      {
            title: "LG 27GN950 Review, Next-Gen 4K 144Hz Monitors Are Here",
            youtubeId: "WEyF9QWH7pw",
            thumbnail:
                  "https://img.youtube.com/vi/WEyF9QWH7pw/maxresdefault.jpg",
            description: "",
            uploadedDate: "4 Nov 2020",
            category: "monitors",
            channel: "64e9c976823c65a88acf8769",
      },
];

// videoCreatorName: "MKBHD",
//             videoCreatrorProfilePicture:
//                   "https://yt3.googleusercontent.com/lkH37D712tiyphnu0Id0D5MwwQ7IRuwgQLVD05iMXlDWO-kDHut3uI4MgIEAQ9StK0qOST7fiA=s176-c-k-c0x00ffffff-no-rj",
//             subscribers: 15,

const channels = [
      {
            name: "MKBHD",
            profilePicture:
                  "https://yt3.googleusercontent.com/lkH37D712tiyphnu0Id0D5MwwQ7IRuwgQLVD05iMXlDWO-kDHut3uI4MgIEAQ9StK0qOST7fiA=s176-c-k-c0x00ffffff-no-rj",

            subscribers: 15.5,
      },

      {
            name: "Dave2d",
            profilePicture:
                  "https://yt3.googleusercontent.com/ytc/AOPolaQMSJwwcYJCD71X-_-nANQQmPUSOgJ9gWEah5jPjQ=s176-c-k-c0x00ffffff-no-rj",
            subscribers: 3.8,
      },

      {
            name: "The teach chap",
            profilePicture:
                  "https://yt3.ggpht.com/g-QZbUHetqAo2wQfbUx8cF2ar7CIb8RAKzDZc6n1DjL_ZP0do7gCV43LfX4uHJOBElkD6Run-Q=s176-c-k-c0x00ffffff-no-rj-mo",
            subscribers: 1.4,
      },
      {
            name: "Hardware unboxed",
            profilePicture:
                  "https://yt3.googleusercontent.com/ytc/AOPolaTfXZ2J2c2fSfjAS8nbds1dKFOi7AnU3A5U3pYZ=s176-c-k-c0x00ffffff-no-rj-mo",
            subscribers: 0.983,
      },
];

const seeding = async () => {
      const channels = [
            "64e9c976823c65a88acf8762",
            "64e9c976823c65a88acf8765",
            "64e9c976823c65a88acf8767",
            "64e9c976823c65a88acf8769",
      ];
      for (let i of videos) {
            const newVideo = new VideoModel(i);
            await newVideo.save();
      }
};

seeding();
