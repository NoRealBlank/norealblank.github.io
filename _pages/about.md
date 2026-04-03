---
layout: about
title: About
permalink: /
subtitle: # <a href='#'>Affiliations</a>. Address. Contacts. Motto. Etc.

profile:
  align: right
  image: rzhang.png
  image_circular: false # crops the image to make it circular
  more_info: # >
    # <p>555 your office number</p>
    # <p>123 your address street</p>
    # <p>Your City, State 12345</p>

selected_papers: true # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page

announcements:
  enabled: false # includes a list of news items
  scrollable: true # adds a vertical scroll bar if there are more than 3 news items
  limit: 5 # leave blank to include all the news in the `_news` folder

latest_posts:
  enabled: false
  scrollable: true # adds a vertical scroll bar if there are more than 3 new posts items
  limit: 3 # leave blank to include all the blog posts
---

<style>
  /* 针对页尾社交链接的图标进行缩小 */
  .social {
    text-align: center;
    margin-top: 20px;
  }

  .social .one {
    display: inline-block;
    margin: 0 10px; /* 图标之间的水平间距 */
  }

  .social .one a i, 
  .social .one a span {
    font-size: 1.5rem !important; /* 这是关键！你可以把 1.5 改成 1.2 会更小 */
    color: #424242; /* 让颜色稍微淡一点，看起来更高级 */
  }

  /* 悬停时的颜色变化（可选） */
  .social .one a:hover i,
  .social .one a:hover span {
    color: #8b008b; /* 悬停时变成紫色，匹配你的 About 字体颜色 */
  }
</style>

Write your biography here. Tell the world about yourself. Link to your favorite [subreddit](https://www.reddit.com). You can put a picture in, too. The code is already in, just name your picture `prof_pic.jpg` and put it in the `img/` folder.

Put your address / P.O. box / other info right below your picture. You can also disable any of these elements by editing `profile` property of the YAML header of your `_pages/about.md`. Edit `_bibliography/papers.bib` and Jekyll will render your [publications page](/al-folio/publications/) automatically.

Link to your social media connections, too. This theme is set up to use [Font Awesome icons](https://fontawesome.com/) and [Academicons](https://jpswalsh.github.io/academicons/), like the ones below. Add your Facebook, Twitter, LinkedIn, Google Scholar, or just disable all of them.
