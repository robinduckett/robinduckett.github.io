---
layout: post
title: "Project Release: CLB Tools"
date: "2020-04-30 22:51:51 +0100"
categories: projects
published: true
hero: "/images/clb-pretty.png"
subtitle: "Extracting the background from Creatures 2 (1998)"
---

## Extracting the background from Creatures 2 (1998)

Over the past few days, I felt the urge to dive back into one of my favourite old games: [Creatures 2](https://creatures.wiki/Creatures_2).

![Creatures 2 Cover](/images/clb-c2cover.jpeg)

I wanted to create some artwork in Blender as I've been using it lately to do some simple 3D modelling,
and wanted to reference the original, gorgeous backdrop of the game.

There were some initial headaches in getting the backdrop.

Firstly, I couldn't figure out how to extract it directly from Creatures 2. I figured that there must
have been a copy of the image, maybe even in an old mod for Creatures 3, maybe it would even be in PNG format!

Alas, I was not able retrieve the image easily. I noticed that there was a file here, C2toDS.blk which was over 60mb and probably was large enough to contain the background in BMP format.

I begun work on trying to extract this file, going off the code in [openc2e](https://github.com/ccdevnet/openc2e) (an open source version of the game engine, long since abandoned) and the explanation from the [Creatures wiki](https://creatures.wiki/) (although it hasn't had a meaningful update in years, apart from various community drama).

### Results

Some pretty, but wrong results.

![Image of Broken export](/images/clb-broken.png)

![Image of less broken export](/images/clb-strange.png)

![Image of pretty, but broken, export](/images/clb-pretty.png)

Eventually I was able to pull it off!

![Image of working export](/images/clb-shee.png)

### Whoo!

So here is the program in action in BLK mode

<div class="no-shadow" markdown="1">
![Screenshot of of program in action](/images/clb-terminal.png)
</div>

![Screenshot of of output S16 files as PNG](/images/clb-s16.png)

It can also decode S16 files into multiple different files.

And here is the moneyshot, the entire background exported!

<div class="no-shadow" markdown="1">
[![Screenshot of background](/images/clb-output.png)](/images/clb-output.png)
</div>

## Code

[Take a look at the code](https://github.com/robinduckett/clb-tools) and laugh at how embarrasingly easy it was and how long it took me.

Peace!
