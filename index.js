const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const colors = require('./colors.json');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const data = {
    name: "v1PeW",
    cube: 84,
    glow: true
};



const url = 'http://www.boomlings.com/database/getGJUserInfo20.php';

async function getProfile(id) {
    let headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": " ",
        "Accept-Encoding": "*",
        "Accept": "*/*"
    }

    let data = {
        secret: 'Wmfd2893gb7',
        targetAccountID: id
    };

    let r = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: new URLSearchParams(data)
    });

    let res = await r.text();

    return {
        data: res,
        status: r.status
    };
}


app.get('/profile/:profileId', (req, res) => {
    id = req.params.profileId;
    
    getProfile(id).then(profile => {
    let spl = profile.data.split(':');
    console.log(profile.data);
    let userInfo = [];
    for(let i=0;i<spl.length;i++) {
        if(i%2!=0) {
            userInfo.push(spl[i-1]+':'+spl[i]);
        }
    }

    console.log(userInfo);

    let username = userInfo[0].split("1:")[1];
    let col1 = userInfo[4].split("10:")[1];
    let col2 = userInfo[5].split("11:")[1];
    let stars = userInfo[7].split("3:")[1];
    let demons = userInfo[10].split("4:")[1];
    let cube = userInfo[16].split("21:")[1];
    let ship = userInfo[17].split("22:")[1];
    let rank = userInfo[27].split("30:")[1];
    let glow = userInfo[22].split("28:")[1];
    let glowCol = userInfo[6].split("51:")[1];

    const result = {
        username: username,
        stars: Number(stars),
        demons: Number(demons),
        rank: Number(rank),
        col1: colors[col1],
        col2: colors[col2],
        glow: Boolean(Number(glow)),
        glowCol: colors[glowCol],
        cube: cube,
        ship: ship
    };

    res.json(result);
});
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


