/*jslint browser: true, vars: true, plusplus:true */
/*global console */
/*
    ParserCSS
    © 2014 Brian Weiser. All rights reserved.
*/

var parserCSS;

(function () {
    var array = [];
    /*
        @variabe text the text to be searched within
        @variable pos the starting position for the search
    */
    function findClosingBracket(text, pos) {
        var open, close, depth = 0;
        while (true) {
            open = text.indexOf('{', pos + 1);
            close = text.indexOf('}', pos + 1);
            //console.log({open: open, close: close});
            if (open === -1 || close === -1) {
                break;
            } else if (open < close) {
                depth++;
                pos = close;
                //continue;
            } else {
                depth--;
            }
            //console.log('depth: ' + depth);
            if (depth <= 0) {
                break;
            }
            if (depth > 10) { //temp infinite loop fix
                break;
            }
            //break;
        }
        return close; //closing barcket position
    }
    
    function extractMediaQuery(text, position) {
        var media, inner = '';
        var start = text.indexOf('{', position);
        
        media = text.substring(position, start).trim();
        
        var close = findClosingBracket(text, start);
        
        //console.log('close: ' + close);
        inner = text.substring(start + 1, close).trim();
        return {media: media, innerCSSText: inner, beginning: position, 'open': start, 'close': close};
    }
    
    function extractInnerCSS(innerCSSText) {
        var selectorArray = [], location, prevClose = 0;
        //console.log(innerCSSText);
        
        location = innerCSSText.indexOf('{');
        while (location !== -1) {
            var close = findClosingBracket(innerCSSText, location);
            var obj = {
                selector: innerCSSText.substring(prevClose + 1, location).trim(),
                innerCSS: innerCSSText.substring(location + 1, close).trim()
            };
            prevClose = close;
            selectorArray.push(obj);
            location = innerCSSText.indexOf('{', location + 1);
            console.log('location: ' + location);
        }
        
        return selectorArray;
    }
    
    parserCSS = function (text) {
        console.clear();
        console.log(text);
        text = text.replace(/(^[ \t]*\n)/gm, ""); // slight minification
        console.log(text);
        var location = 0, count = 0;
        var string = String(text);
        var letter = string.charAt(string.indexOf('@') + 1);
        
        location = string.indexOf('@');
        while (location !== -1) {
            letter = string.charAt(location + 1);
            
            console.log("letter: " + letter);
            
            if (letter === 'm' || letter === 'M') {
                console.log('m' + letter);
                var media = extractMediaQuery(string, location);
                media.innerCSS = extractInnerCSS(media.innerCSSText);
                array.push(media);
                count++;
            }
            
            location = string.indexOf('@', location + 1);
        }
        console.log(array);
    };
})();