griddles-ui-card
================
## NOTE: The following information is for version 0.2.0.

## Summary
This is a web component wrapper for [griddlesJS](https://github.com/daiz713/griddles) using Polymer. The griddles-ui-card component provides a simple card UI. You can dynamically set and change the contents in the &lt;griddles-ui-card&gt; element.
##### Example:
HTML:
```
<griddles-ui-card wrappedBy="document"></griddles-ui-card>
```
JavaScript:
```
function griddlesAppInit() {
   var griddle = document.querySelector("griddles-ui-card");
   griddle.query = "sample";
}

function griddlesAppCardClicked(card) {
}
```

## Properties
#### wrappedBy
   + string
   + default: `document`
   + This properity requires `document`, `core-scroll-header-panel` or `the id of a parent element` as the value. You can specify any one of them.  These values ​​have the following meanings:

      + `document`： `document`: When you designate this value, your &lt;griddles-ui-card&gt; element will be rendered into the entire browser screen. The scroll-ended event fires when the vertical scroll bar reaches to the lower of browser window. [Demo](http://griddles-card.appspot.com/griddles-ui-card/griddles-ui-card/demos/demo_document.html)

      + `core-scroll-header-panel`: When you write the &lt;griddles-ui-card&gt; element inside Polymer’s &lt;core-scroll-header-panel&gt;, you have to designate this value. *Beware: this specification might be changed in the future.* [Demo](http://griddles-card.appspot.com/griddles-ui-card/griddles-ui-card/yummy/index.html)


      + `the id of a parent element`: You specify this value when the &lt;griddles-ui-card&gt; element is placed inside a block-level parent element like a &lt;div&gt;. The scroll-ended event fires when the vertical scroll bar reaches to the lower of the parent element. A height of the parent element which you have specified in the CSS will be the height of the display area of the &lt;griddles-ui-card&gt;. [Demo](http://griddles-card.appspot.com/griddles-ui-card/griddles-ui-card/demos/demo_div.html)



#### layout
   + object
   + default:
   ```
   {
      cardWidth: 200,
      cardMarginBottom: 16,
      streamMarginLeft: 8,
      streamMarginRight: 8,
      streamPaddingTop: 10,
      numberReadAtOnce: 20,
      displayFromTopLeftToBottomRight: 0.5
   }
   ```

   + The layout of view of the &lt;griddles-ui-card&gt; is written in JSON. This JSON in order to design the layout has key-value pairs of the following:
      + `cardWidth`: Specify the width of the card or stream as a number, in pixels.
      + `cardMarginBottom`: Specify the margin in bottom of cards as a number, in pixels.
      + `streamMarginLeft`: Specify the margin in left of streams as a number, in pixels.
      + `streamMarginRight`: Specify the margin in right of streams as a number, in pixels.
      + `streamPaddingTop`: Specify the margin in the top of the card of the uppermost, in pixels.
      + `numberReadAtOnce`: Specify the number of cards which will be loaded at one time.
      + `displayFromTopLeftToBottomRight`: This number is used to adjust the speed of the animation when displaying the card. A value `1` is interpreted as a reference. This number is smaller, the animation speed will be faster.

#### cards
   + object
   + default:

   ```
   {
      sample: [
        {
         "griddles_type": "card",
         "shadow_depth": 3,
         "src": "",
         "contents": "<span>Hello, world!</span>",
         "className": "text",
         "height": false,
         "stream_index": false,
         "insert_type": "append",
         "border_radius": 2,
         "dataset": {}
        }
      ]
   }
   ```

   + The cards is written in JSON. cards have multiple `query`s as keys. the type of values which are corresponded to these keys are  an array. This array has `card` elements. The `card` is the design document of  the card to be displayed inside &lt;griddles-ui-card&gt; and this is written in JSON.


   #### card
      + object
      + The `card` has key-value pairs of the following:
        + `griddles_type`: The &lt;griddles-ui-card&gt; is able to display two types cards: `card` and `photo_grid`. The `card` is a type that to display the HTML you specify. The `photo_grid`  is a type that to display the Photo tile. You can specify the type of either one for the each `card`.

        + `src`: Specify the URL of the photo to be displayed in the Photo tile. This value is valid only in case that you specify the "photo\_grid" in `griddles_type`.

        + `contents`: Specify the HTML code to be displayed in the card. This value is valid only in case that you specify the "card" in` griddles_type`.

        + `className`: If you want to apply CSS styles of the content in the card, write the class names here.

        + `height`: Specify the height of the card. Set `false` or pixel value. When you set this value to `false`, an original height of the content will be applied as the height of the card.

        + `stream_index`: You can specify the index of streams. Set `false` or index of the stream. A card will be added to the stream at the specified index. When you set this value to `false`, a card will be inserted to the optimum stream so as not to cause the extreme uneven of height of the streams. *Note:  `false` is recommended.*

        + `insert_type`: Specify either “append” or “prepend”. *Note: "append" is recommended.*

        + `shadow_depth`: This value represents a depth of shadow of the card. The state of being shadowless is set to "0", you can specify an integer value as a level of shadow up to the maximum value of "6".

        + `border_radius`: Specify the roundness of the corners of the card, in pixels.


#### query
   + string
   + default: null
   + When this value is changed, the process for rendering of cards begins. When the following program is executed, `card`s which have been registered in `cards.sample` will be appeared in the &lt;griddles-ui-card&gt;:

   ```
   var griddle = document.querySelector("griddles-ui-card");
   griddle.query = "sample";
   ```


## Methods
#### cardLength
Return the number of cards that are displayed inside the &lt;griddles-ui-card&gt; element.

#### streamLength
Return the number of streams that are displayed.

#### apis
Return the API set.


## Events
#### griddles-ui-card ready
Fired when the rendering of the &lt;griddles-ui-card&gt; is complete. And the function `griddlesAppInit()` will be called. You can define the function `griddlesAppInit` anywhere inside your JavaScript file.

#### griddles-ui-card card-clicked
Fired when the card is clicked. At this time, the function `griddlesAppCardClicked(card_information)` will be called. You can define the function `griddlesAppCardClicked` anywhere inside your JavaScript file.

#### griddles-ui-card query-changed
Fired when the query is changed. The process for rendering `card`s will start automatically. The `layout` is referenced every time at the start of this process.
