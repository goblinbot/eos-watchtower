# eos-watchtower
Node/Express API with the purpose of enabling communication between tools on the LAIT/LARP Eos.

Originally eos-beacon was a single nodeJS instance that ran websockets, the frontend and every other service on it's own. It was made in a time where NodeJS was very new to me and I'm still pretty proud of it, but it's time to split the front and backend.

**Eos-watchtower** is to become my reusable backend, opening the possibility of connecting the several standalone applications with a central API.

## How to setup WatchTower

Make sure you have NodeJS installed. Use your terminal/command prompt of choice and... :

```
git clone git@github.com:goblinbot/eos-watchtower.git     (or clone on your own)
cd eos-watchtower
npm install
```

Before you can start, make sure to create a **config.json** file in the "_config" folder. You can just rename the config.sample.json file if you don't want any setting changed.

When that is done, you can start Watchtower using one of the following commands:

`npm run dev`
or
`npm run prod`

### Feature roadmap | NOW
> Mostly parts of eos-beacon to split-off and refactor heavily.

- Security levels
- Weather API for location
- Portal status
- Broadcast API
- Websockets

### Features | NEXT
> Old & New parts that require a bit more thinking or effort.

- Video (broadcast) solution
- Sound (broadcast) solution
- Mission API
- Transport API
- User input filter service

### Features | POTENTIALS
> Ideas & requests that might just work, or are planned for later-later.

- 'Global' WatchTower API (for example for reactor power levels)
- Broadcast queue
- Real-Date To Ingame-Date conversion service
- Transport Custom Upgrades / Modifications


#### Extra Credits

**Weather Api:**
Dutch weather data (KNMI) obtained through [weerlive.nl](http://weerlive.nl/delen.php)

To use a different weather API than WeerLive's, these are the files to modify:
- /_config/config.json
- /lib/bin/models/weather.ts
- /lib/modules/weather/weather.controller.ts
- /lib/routes/external.routes.ts
