---
title: Garmin Vivoactive 4 with Home Assistant
description:
slug: garmin-vivoactive-homeassistant
date: 2023-08-04
---

# Garmin Vivoactive 4 with Home Assistant

![fancy leather watch](https://assets.vrite.io/64974cb888e8beebeb2c925b/ypIBOf5RMeeAnGBfdTyBv.jpeg)

This morning I saw a [Reddit post](https://libreddit.kieranklukas.com/r/flipperzero/comments/ybjsvt/flipper_control_via_smartwatch/) where someone connected their flipper zero to a Fossil HR through [Gadgetbridge](https://gadgetbridge.org/). I immediately started [ducking,](https://libreddit.kieranklukas.com/r/duckduckgo/wiki/index#wiki_what_is_searching_on_duckduckgo_called.3F) trying to find out if I could do the same with my Garmin Vivoactive 4 but ended up realizing that there was no apparent way to connect the two. I did however find a widget compatible with my watch named [APICall](https://apps.garmin.com/en-US/apps/ac9a81ab-a52d-41b3-8c14-940a9de37544) on the Connect IQ store.

This widget interested me because it allowed me to call any webhook I wanted utilizing the onboard Wi-Fi as well as through the Connect IQ app. This was a very important feature for me because I can’t get the app to run on LineageOS as it keeps asking for the location permission even though it was already granted.

My first idea was to try to broadcast a message to the Google home using [ismarslomic/google-assistant-broadcast,](https://github.com/ismarslomic/google-assistant-broadcast) but it ended up being broken. I decided, therefore, that since the project was unmaintained to try Home Assistant with the [Google Assistant SDK](https://www.home-assistant.io/integrations/google_assistant_sdk#configuration).

The setup was amazingly quick, using the [linuxserver/docker-homeassistant](https://github.com/linuxserver/docker-homeassistant) image and their sample compose file, I was able to get it fully running in under 10 minutes.

Now for the Google Assistant SDK / APICall / Home Assistant tutorial. The first thing you want to do is follow this guide, [Google Assistant SDK - Home Assistant](https://www.home-assistant.io/integrations/google_assistant_sdk#configuration), to install the Assistant SDK. Once you have completed that, go to Settings / Automations & Services.

![Settings](https://assets.vrite.io/64974cb888e8beebeb2c925b/Yha1bUhOH_iuWK30QR0F1.png)![Automations & Services](https://assets.vrite.io/64974cb888e8beebeb2c925b/RR0VzZqsU7uTxiNlqVGum.png)

This is where you can create the action that you want to trigger with your smartwatch. The first thing you need to do is to create a new automation. Save and name the automation you just created. Now add a trigger, scroll to the bottom of the list and select webhook. If done successfully, it will look like the image below.

![new webhook](https://assets.vrite.io/64974cb888e8beebeb2c925b/VqiM4d3wncM9BuoDR_FW7.png)

Now add an action. I decided to use the media player to play a song on Spotify. Also go back to the webhook section and click the settings icon next to the webhook ID. Change the settings to reflect below screenshot.

![webhook settings](https://assets.vrite.io/64974cb888e8beebeb2c925b/Xh3BtyMxA1MhI0rHuo3WG.png)![play media example](https://assets.vrite.io/64974cb888e8beebeb2c925b/rAbDGMrBS5fcGo7AzPT-O.png)

Now for the fun part. Download [APICall](https://apps.garmin.com/en-US/apps/ac9a81ab-a52d-41b3-8c14-940a9de37544) onto your Garmin smartwatch and go to the configuration section for the app.

> Note: I’ll be using Garmin Express on my MacBook, but you can also use the Garmin Connect app on a phone.

![garmin connect iq on desktop](https://assets.vrite.io/64974cb888e8beebeb2c925b/_9DLstJqkgQICI4-5ubDd.png)

If you are using Garmin Express, then you can access the app settings by selecting the 3 dots next to the app. You will have 36 possible API calls that you can enter.

![undefined](https://assets.vrite.io/64974cb888e8beebeb2c925b/-lSqNObL3TGNk0VQc8xOq.png)

```json
    {deviceName: "Broadcast",actionName: "Chores",url: "http://192.168.40.21:8123/api/webhook/Aere",method: "GET",headers:"{"Content-Type":"application/x-www-form-urlencoded"}"}
    {deviceName: "Spotify",actionName: "Discover Weekly",url: "http://192.168.40.21:8123/api/webhook/-djNd5aMidD6Q3w2jgYDu50ix",method: "GET",headers:"{"Content-Type":"application/x-www-form-urlencoded"}",actionIcon:40}
    {deviceName: "Spotify",actionName: "Liked Songs",url: "http://192.168.40.21:8123/api/webhook/liked-songs-6TrVEY-TzVsAeFX8Mt8FUpJN",method: "GET",headers:"{"Content-Type":"application/x-www-form-urlencoded"}",actionIcon:40}
    {deviceName: "Spotify",actionName: "Sleep Songs",url: "http://192.168.40.21:8123/api/webhook/sleep-songs-jA1nrTpc9PuKumvzNDFteBDK",method: "GET",headers:"{"Content-Type":"application/x-www-form-urlencoded"}",actionIcon:51}
    {deviceName: "Media Controls",actionName: "Play/Pause",url: "http://192.168.40.21:8123/api/webhook/playpause-DTNDt-RzOqgGTggOnV_sXMLm",method: "GET",headers:"{"Content-Type":"application/x-www-form-urlencoded"}",actionIcon:43}
    {deviceName: "Media Controls",actionName: "Next",url: "http://192.168.40.21:8123/api/webhook/skip-forward-IvQkjhn2oev7VY0mb_xZDDCK",method: "GET",headers:"{"Content-Type":"application/x-www-form-urlencoded"}",actionIcon:41}
    {deviceName: "Media Controls",actionName: "Previous",url: "http://192.168.40.21:8123/api/webhook/skip-backwards-A9byoXP-QwSv_aoQ2FtX-_Qx",method: "GET",headers:"{"Content-Type":"application/x-www-form-urlencoded"}",actionIcon:42}
```

These are the actions that I configured for my watch so far. To customize for your API calls you need to change the `deviceName`, `actionName`, and `url` fields. The `method` and `headers` need to stay the same across all actions. If you want to add an icon to that action, then you can configure that with the `actionIcon` field. A table with the possible icons is included below, sourced from APICall’s [documentation](https://apicall.dumesnil.net/documentation_en.html).

![APICall icons](https://assets.vrite.io/64974cb888e8beebeb2c925b/119m02PEgn6_wcNGtCnjM.png)

In conclusion, you can use APICall to trigger actions in home assistant from your Garmin smartwatch. I hope this tutorial proved to be useful, and have a great rest of your day (or night).
