
// let  venues = []
// let lat = 48.8655747
// let lng = 2.3209916

// //INIT Foursquare date param and fetch data
// yyyymmdd(dateIn) {
//     const yyyy = dateIn.getFullYear();
//     const mm = dateIn.getMonth()+1; // getMonth() is zero-based
//     const dd  = dateIn.getDate();
//     return String(10000*yyyy + 100*mm + dd); // Leading zeros for mm and dd
// }


// initFourSquare (lat, long) {
//         const CLIENT_ID = 'VEIX15AQ0VBBHLMJFG2JIF34OMRTXQF2PYWKFMXJ2ZY2TZSV';
//         const CLIENT_SECRET = 'F4Q15NFEVSNTCVRO2LU12NGM2SQMQANMCJEZYW2NWUPSR20N';
//         const DATE = '20180728';//new Date();
//         return fetch(`https://api.foursquare.com/v2/venues/search?ll=${lat},${long}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${DATE}&query=Mc Donald's`).then((res) => {
//         return res.json();
//     })
//     .then((res) => {
//         const venuesData = res.response["venues"];
//         this.setState({venues: venuesData});
//     })
// }
