# KiwiIRC - Gravatar Plugin

### Status - In development

This plugin adds Gravatar to KiwiIRC. 

This plugin requires yarn.

### Installation

    $ git clone https://github.com/MrGrays/Gravatar.git
    $ cd kiwiirc-plugin-gravatar
    $ yarn && yarn build

Copy the built `dist/*.js` file to your kiwi plugins folders.

Next, add the following config parameter to /your/kiwi/folder/static/config.json

    "plugins": [
        {"name": "gravatar", "url": "static/plugins/plugin-gravatar.min.js"} 
    ],
    "gravatar": {
      "default": "mp",
      "rating": "g"
    }
