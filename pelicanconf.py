#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'openui'
SITENAME = 'imba吧'
SITEURL = 'http://www.imba.pub/'

DELETE_OUTPUT_DIRECTORY = False
DEFAULT_LANG = u'zh'

SITELOGO = 'images/logo.png'
FAVICON = 'images/logo.png'
SITELOGO_SIZE = 14

ARTICLE_URL = 'posts/{category}/{slug}/'
ARTICLE_SAVE_AS = 'posts/{category}/{slug}/index.html'
PAGE_URL = 'pages/{slug}/'
PAGE_SAVE_AS = 'pages/{slug}/index.html'

DISPLAY_ARTICLE_INFO_ON_INDEX = True
DISPLAY_TAGS_INLINE = False
DISPLAY_RECENT_POSTS_ON_SIDEBAR = True
SHOW_ARTICLE_CATEGORY = True
SHOW_DATE_MODIFIED = True
RELATED_POSTS_TEXT = u'相关文章'


DISPLAY_CATEGORIES_ON_MENU = False
DISPLAY_PAGES_ON_MENU = False
MENUITEMS = (
    ('Home', '/'),
    ('About', '/pages/about.html'),
)

PATH = 'content'

TIME_ZONE = 'Asia/Shanghai'#时区设置
DATE_FORMATS = {'zh':'%Y-%m-%d %H:%M'}

DEFAULT_LANG = 'Chinese (Simplified)'
THEME = "alchemy"
# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (('openui', 'http://www.openui.cn'),
         )

# Social widget
SOCIAL = (('You can add links in your config file', '#'),
          ('Another social link', '#'),)

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True
