Alt Text: Engaged prevents alt/title
text tooltips from getting in your way
until you explicitly ask for them. And
when you ask for them by holding down
(what else?) the ALT key, it shows them
*immediately*.

Feature Summary:

* During normal browsing
  - hide all alt text tooltips
* When ALT is down
  - show alt text tooltips (bottom-right
    corner)
  - highlight every part of the page
    that contains alt text
* When ALT is released
  - hide all alt text tooltips and
    highlighting

Alt Text: Engaged addresses three
frustrations:

1. When alt text is annoying: Tooltips
   on major news websites are
   delightful.  Their hobbies include
   covering up text you're trying to
   read and gleefully staying put until
   you figure out how far you need to
   move your mouse to get them to go
   away. Ever tried moving your mouse
   over one of them in the vain hope
   that it would disappear? Oh, good,
   that nudged it a barely perceptible
   distance.  And look, it's *still*
   over the text you're trying to read!
   But at least when they're off to the
   side of the screen they don't do
   anything distracting. Like
   fade-animate in.
2. When alt text is useful but hard to
   get at: Sometimes you're actually
   wanting alt text to show up. Maybe
   you read web comics. Nerd. You place
   your mouse over the stick figures...
   wait for it... nothing. Oh, the
   window lost focus. Okay. Click. Oh
   no, you clicked a link! Go back, go
   back! Hover...  wait for it... oh,
   this tooltip's content is actually
   pretty insightful. I especially like
   his earlier point about... Wait,
   what? Why'd it vanish??  Crap.
   Hover... wait for it...
3. In all cases: Thankfully it's obvious
   where and when alt text will pop up.
   Apart from every single situation in
   history.

We can do better. Alt Text: Engaged
probably does, in fact. Here's how it
deals with the above problems:

1. Chrome will never again show alt text
   until you're holding down the ALT
   key.  It will always display in the
   same place: the bottom-right of the
   screen (next to that other
   rarely-needed text: link URLs).
2. As soon as the ALT key hits, Chrome
   will immediately show the alt text of
   whatever's directly under your mouse
   (if alt text exists). If your window
   has lost focus, you'll know within
   milliseconds because:
3. When the ALT key is down, the
   location of every element on the
   screen which contains alt text is
   highlighted in semi-transparent
   yellow. Hovering over any highlighted
   area will update the bottom-right alt
   text display. All input not relating
   to alt text is blocked until you
   release the ALT key, so that the
   FaceTube ads don't have a chance to
   pop out and get in the way of your
   now-important alt text hunting.

Alt Text: Engaged is open source (MIT)
and available on GitHub
(https://github.com/zship/chrome-alt-text-engaged),
so you have to ability to see
everything. Please let me know if you
notice any particularly heinous crimes
against computing.
