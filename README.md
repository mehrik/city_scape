Added:
    Express
    Server
    Angular
    Modularized client side
    rerouted all static files to correct location

* Created angular routes, no more page reloads
* Separated videos into their own partial so there will only be one main index.html

Changed:
    fixed footer that causes horizontal scroll problems
    made the size of the images 100%
    removed maxwidth of .gallery-box
    set max-height of video-background to 1080px
    moved navbar inside city_scape.html partial so correct city name would appear

Next steps?:
    Could remove script.js, realized it has no effect on project --> currently have it commented out
    Delete bootstrap-3.3.6-dist?
    Delete huge commented out code in index.html? 
    Delete maxcdn.boostrapcdn --> Since project already has bootstrap.min.css file
    Move digital clock to the left of the analog clock
