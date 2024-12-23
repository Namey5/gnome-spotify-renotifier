GNOME extension to make Spotify notifications trigger banners again.

WARNING
-----
I am not a Javascript or GNOME developer and was not willing to spend more than 30 minutes on this, so it is done in the dumbest way possible.
Extension will automatically register itself to Spotify's notification source on enable and simply increase any incoming `LOW` urgency notifications to `NORMAL` right before the banner is triggered.
This will probably not always work, but I'm uploading because I've seen a few people around asking how to do this.

Installation
-----
First, clone the repo:
```bash
git clone https://github.com/Namey5/gnome-spotify-renotifier.git ~/.local/share/gnome-shell/extensions/spotify-renotifier@namey5
```
Then restart your GNOME session and enable the plugin:
```bash
gnome-extensions enable spotify-renotifier@namey5
```
