/*jslint browser: true, vars: true, plusplus:true */
/*global console */
/*
    convertToArray.js
    © 2014 Brian Weiser. All rights reserved.
*/

var convertToArray;

(function () {
    var array;
    /*
        @variabe text the text to be searched within
        @variable pos the starting position for the search
    */
    function findClosingBracket(text, pos) {
        var open, close, depth = 0;
        while (true) {
            open = text.indexOf('{', pos + 1);
            close = text.indexOf('}', pos + 1);
            if (open === -1 || close === -1) {
                break;
            } else if (open < close) {
                depth++;
                pos = close;
            } else {
                depth--;
            }
            if (depth <= 0) {
                break;
            }
        }
        return close; //closing barcket position
    }
    
    function extractMediaQuery(text, position) {
        var media, inner = '';
        var start = text.indexOf('{');
        
        media = text.substring(0, start).trim();
        
        var close = findClosingBracket(text, start);
        
        inner = text.substring(start + 1, close).trim();
        return {"media": media, innerCSSText: inner, beginning: position, 'start': start, 'end': close};
    }
    
    function seperateProperties(properties) {
        var p;
        var prop = properties.split(';');
        var result = [];
        for (p = 0; p < prop.length; p++) {
            if (prop[p].length !== 0) {
                var colon = prop[p].indexOf(':');
                var property = prop[p].substring(0, colon);
                var value = prop[p].substring(colon + 1, prop[p].length);
                var important = false;
                if (value.indexOf("!important") !== -1) {
                    value = (value.substring(0, value.indexOf("!important"))).trim();
                    important = true;
                }
                
                result.push({
                    property: property,
                    value: value,
                    isImportant: important
                });
            }
        }
        return result;
    }
    
    function extractInnerCSS(innerCSSText) {
        var selectorArray = [], location, prevClose = 0;
        
        location = innerCSSText.indexOf('{');
        while (location !== -1) {
            var close = findClosingBracket(innerCSSText, location);
            var obj = {
                selector: innerCSSText.substring(prevClose, location).trim(),
                innerCSS: innerCSSText.substring(location + 1, close).trim()
            };
            obj.innerCSS = seperateProperties(obj.innerCSS);
            prevClose = close + 1;
            selectorArray.push(obj);
            location = innerCSSText.indexOf('{', location + 1);
        }
        
        return selectorArray;
    }
    
    convertToArray = function (text) {
        array = [];
        var location = 0, count = 0, /*newLocation, */media, innerCSSText, closingBracket, openingBracket;
        var string = String(text);
        var prevLocation = 0, prevClose = 0;
        location = string.toLowerCase().indexOf('@media');
        while (location !== -1) {
            // push everything between either the two media queries or from the start
            var textBetweenMedias = string.substring((prevClose === 0) ? prevClose : prevClose + 1, location);
            textBetweenMedias = textBetweenMedias.trim();
            if (textBetweenMedias.length > 0) {
                array.push({
                    innerCSSText : textBetweenMedias,
                    beginning: (prevClose === 0) ? prevClose : prevClose + 1,
                    end: (location - 1),
                    innerCSS: extractInnerCSS(textBetweenMedias)
                });
            }
            openingBracket = string.indexOf('{', location);
            closingBracket = findClosingBracket(string, openingBracket);
            
            //adding the next media query
            innerCSSText = string.substring((openingBracket === 0) ? openingBracket : openingBracket + 1, closingBracket);
            innerCSSText = innerCSSText.trim();
            if (innerCSSText.length > 0) {
                media = {
                    "media": string.substring(location, openingBracket).trim(),
                    "innerCSSText": innerCSSText,
                    "beginning": location,
                    "openingBracket": openingBracket,
                    "end": closingBracket,
                    "innerCSS": extractInnerCSS(innerCSSText)
                };
                
                array.push(media);
            }
            prevLocation = location;
            prevClose= closingBracket;
            //keeps count of number of media queries
            count++;
            
            location = string.toLowerCase().indexOf('@media', location + 1);
        }
        
        //adds the last part of the css file
        innerCSSText = string.substring(closingBracket + 1);
        innerCSSText = innerCSSText.trim();
        if (innerCSSText.length > 0) {
            array.push({
                "innerCSSText": innerCSSText,
                "beginning": closingBracket + 1,
                "end": string.length,
                "innerCSS": extractInnerCSS(innerCSSText)
            });
        }
        return array;
    };
}());