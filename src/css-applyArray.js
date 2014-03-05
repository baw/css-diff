/*jslint plusplus:true, vars:true */

/*
    applyArray.js
    © 2014 Brian Weiser. All rights reserved.
*/

var applyArray;
(function () {
    
    /*
        Returns end results of css based on given media query
    */
    var processMediaQuery = function (cssArray, mediaQuery) {
        var c;
        for (c = 0; c < cssArray.length; c++) {
            
        }
        
    };
    
    applyArray = function (cssArray) {
        var mediaArray = [], c, m, i;
        var selectorObj = {};
        
        for (c = 0; c < cssArray.length; c++) {
            for (i = 0; i < cssArray[c].innerCSS.length; i++) {
                selectorObj[cssArray[c].innerCSS[i]] = cssArray[c].innerCSS[i];
            }
        }
        
        for (m = 0; m < mediaArray.length; m++) {
            
        }
        
        return mediaArray;
    };
}());