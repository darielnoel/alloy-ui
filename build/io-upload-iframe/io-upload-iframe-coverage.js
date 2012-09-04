/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.1pr1
build: 3.7.1pr1
*/
if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["/build/io-upload-iframe/io-upload-iframe.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/io-upload-iframe/io-upload-iframe.js",
    code: []
};
_yuitest_coverage["/build/io-upload-iframe/io-upload-iframe.js"].code=["YUI.add('io-upload-iframe', function(Y) {","","/**","Extends the IO  to enable file uploads, with HTML forms ","using an iframe as the transport medium.","@module io","@submodule io-upload-iframe","@for IO","**/","","var w = Y.config.win,","    d = Y.config.doc,","    _std = (d.documentMode && d.documentMode >= 8),","    _d = decodeURIComponent;","","/**"," * Creates the iframe transported used in file upload"," * transactions, and binds the response event handler."," *"," * @method _cFrame"," * @private"," * @param {Object} o Transaction object generated by _create()."," * @param {Object} c Configuration object passed to YUI.io()."," * @param {Object} io"," */","function _cFrame(o, c, io) {","    var i = Y.Node.create('<iframe src=\"#\" id=\"io_iframe' + o.id + '\" name=\"io_iframe' + o.id + '\" />');","        i._node.style.position = 'absolute';","        i._node.style.top = '-1000px';","        i._node.style.left = '-1000px';","        Y.one('body').appendChild(i);","    // Bind the onload handler to the iframe to detect the file upload response.","    Y.on(\"load\", function() { io._uploadComplete(o, c); }, '#io_iframe' + o.id);","}","","/**"," * Removes the iframe transport used in the file upload "," * transaction."," *"," * @method _dFrame"," * @private"," * @param {Number} id The transaction ID used in the iframe's creation."," */","function _dFrame(id) {","	Y.Event.purgeElement('#io_iframe' + id, false);","	Y.one('body').removeChild(Y.one('#io_iframe' + id));","}","","Y.mix(Y.IO.prototype, {","   /**","    * Parses the POST data object and creates hidden form elements","    * for each key-value, and appends them to the HTML form object.","    * @method appendData","    * @private","    * @static","    * @param {Object} f HTML form object.","    * @param {String} s The key-value POST data.","    * @return {Array} o Array of created fields.","    */","    _addData: function(f, s) {","        // Serialize an object into a key-value string using","        // querystring-stringify-simple.","        if (Y.Lang.isObject(s)) {","            s = Y.QueryString.stringify(s);","        }","","        var o = [],","            m = s.split('='),","            i, l;","","        for (i = 0, l = m.length - 1; i < l; i++) {","            o[i] = d.createElement('input');","            o[i].type = 'hidden';","            o[i].name = _d(m[i].substring(m[i].lastIndexOf('&') + 1));","            o[i].value = (i + 1 === l) ? _d(m[i + 1]) : _d(m[i + 1].substring(0, (m[i + 1].lastIndexOf('&'))));","            f.appendChild(o[i]);","        }","","        return o;","    },","","   /**","    * Removes the custom fields created to pass additional POST","    * data, along with the HTML form fields.","    * @method _removeData","    * @private","    * @static","    * @param {Object} f HTML form object.","    * @param {Object} o HTML form fields created from configuration.data.","    */","    _removeData: function(f, o) {","        var i, l;","","        for (i = 0, l = o.length; i < l; i++) {","            f.removeChild(o[i]);","        }","    },","","   /**","    * Sets the appropriate attributes and values to the HTML","    * form, in preparation of a file upload transaction.","    * @method _setAttrs","    * @private","    * @static","    * @param {Object} f HTML form object.","    * @param {Object} id The Transaction ID.","    * @param {Object} uri Qualified path to transaction resource.","    */","    _setAttrs: function(f, id, uri) {","        f.setAttribute('action', uri);","        f.setAttribute('method', 'POST');","        f.setAttribute('target', 'io_iframe' + id );","        f.setAttribute(Y.UA.ie && !_std ? 'encoding' : 'enctype', 'multipart/form-data');","    },","","   /**","    * Reset the HTML form attributes to their original values.","    * @method _resetAttrs","    * @private","    * @static","    * @param {Object} f HTML form object.","    * @param {Object} a Object of original attributes.","    */","    _resetAttrs: function(f, a) {","        Y.Object.each(a, function(v, p) {","            if (v) {","                f.setAttribute(p, v);","            }","            else {","                f.removeAttribute(p);","            }","        });","    },","","   /**","    * Starts timeout count if the configuration object","    * has a defined timeout property.","    *","    * @method _startUploadTimeout","    * @private","    * @static","    * @param {Object} o Transaction object generated by _create().","    * @param {Object} c Configuration object passed to YUI.io().","    */","    _startUploadTimeout: function(o, c) {","        var io = this;","","        io._timeout[o.id] = w.setTimeout(","            function() {","                o.status = 0;","                o.statusText = 'timeout';","                io.complete(o, c);","                io.end(o, c);","            }, c.timeout);","    },","","   /**","    * Clears the timeout interval started by _startUploadTimeout().","    * @method _clearUploadTimeout","    * @private","    * @static","    * @param {Number} id - Transaction ID.","    */","    _clearUploadTimeout: function(id) {","        var io = this;","","        w.clearTimeout(io._timeout[id]);","        delete io._timeout[id];","    },","","   /**","    * Bound to the iframe's Load event and processes","    * the response data.","    * @method _uploadComplete","    * @private","    * @static","    * @param {Object} o The transaction object","    * @param {Object} c Configuration object for the transaction.","    */","    _uploadComplete: function(o, c) {","        var io = this,","            d = Y.one('#io_iframe' + o.id).get('contentWindow.document'),","            b = d.one('body'),","            p;","","        if (c.timeout) {","            io._clearUploadTimeout(o.id);","        }","","		try {","			if (b) {","				// When a response Content-Type of \"text/plain\" is used, Firefox and Safari","				// will wrap the response string with <pre></pre>.","				p = b.one('pre:first-child');","				o.c.responseText = p ? p.get('text') : b.get('text');","			}","			else {","				o.c.responseXML = d._node;","			}","		}","		catch (e) {","			o.e = \"upload failure\";","		}","","        io.complete(o, c);","        io.end(o, c);","        // The transaction is complete, so call _dFrame to remove","        // the event listener bound to the iframe transport, and then","        // destroy the iframe.","        w.setTimeout( function() { _dFrame(o.id); }, 0);","    },","","   /**","    * Uploads HTML form data, inclusive of files/attachments,","    * using the iframe created in _create to facilitate the transaction.","    * @method _upload","    * @private","    * @static","    * @param {Object} o The transaction object","    * @param {Object} uri Qualified path to transaction resource.","    * @param {Object} c Configuration object for the transaction.","    */","    _upload: function(o, uri, c) {","        var io = this,","            f = (typeof c.form.id === 'string') ? d.getElementById(c.form.id) : c.form.id,","            // Track original HTML form attribute values.","            attr = {","                action: f.getAttribute('action'),","                target: f.getAttribute('target')","            },","            fields;","","        // Initialize the HTML form properties in case they are","        // not defined in the HTML form.","        io._setAttrs(f, o.id, uri);","        if (c.data) {","            fields = io._addData(f, c.data);","        }","","        // Start polling if a callback is present and the timeout","        // property has been defined.","        if (c.timeout) {","            io._startUploadTimeout(o, c);","        }","","        // Start file upload.","        f.submit();","        io.start(o, c);","        if (c.data) {","            io._removeData(f, fields);","        }","        // Restore HTML form attributes to their original values.","        io._resetAttrs(f, attr);","","        return {","            id: o.id,","            abort: function() {","                o.status = 0;","                o.statusText = 'abort';","                if (Y.one('#io_iframe' + o.id)) {","                    _dFrame(o.id);","                    io.complete(o, c);","                    io.end(o, c);","                }","                else {","                    return false;","                }","            },","            isInProgress: function() {","                return Y.one('#io_iframe' + o.id) ? true : false;","            },","            io: io","        };","    },","","    upload: function(o, uri, c) {","        _cFrame(o, c, this);","        return this._upload(o, uri, c);","    }","});","","","}, '3.7.1pr1' ,{requires:['io-base','node-base']});"];
_yuitest_coverage["/build/io-upload-iframe/io-upload-iframe.js"].lines = {"1":0,"11":0,"26":0,"27":0,"28":0,"29":0,"30":0,"31":0,"33":0,"44":0,"45":0,"46":0,"49":0,"63":0,"64":0,"67":0,"71":0,"72":0,"73":0,"74":0,"75":0,"76":0,"79":0,"92":0,"94":0,"95":0,"110":0,"111":0,"112":0,"113":0,"125":0,"126":0,"127":0,"130":0,"146":0,"148":0,"150":0,"151":0,"152":0,"153":0,"165":0,"167":0,"168":0,"181":0,"186":0,"187":0,"190":0,"191":0,"194":0,"195":0,"198":0,"202":0,"205":0,"206":0,"210":0,"224":0,"235":0,"236":0,"237":0,"242":0,"243":0,"247":0,"248":0,"249":0,"250":0,"253":0,"255":0,"258":0,"259":0,"260":0,"261":0,"262":0,"263":0,"266":0,"270":0,"277":0,"278":0};
_yuitest_coverage["/build/io-upload-iframe/io-upload-iframe.js"].functions = {"(anonymous 2):33":0,"_cFrame:26":0,"_dFrame:44":0,"_addData:60":0,"_removeData:91":0,"_setAttrs:109":0,"(anonymous 3):125":0,"_resetAttrs:124":0,"(anonymous 4):149":0,"_startUploadTimeout:145":0,"_clearUploadTimeout:164":0,"(anonymous 5):210":0,"_uploadComplete:180":0,"abort:257":0,"isInProgress:269":0,"_upload:223":0,"upload:276":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/io-upload-iframe/io-upload-iframe.js"].coveredLines = 77;
_yuitest_coverage["/build/io-upload-iframe/io-upload-iframe.js"].coveredFunctions = 18;
_yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 1);
YUI.add('io-upload-iframe', function(Y) {

/**
Extends the IO  to enable file uploads, with HTML forms 
using an iframe as the transport medium.
@module io
@submodule io-upload-iframe
@for IO
**/

_yuitest_coverfunc("/build/io-upload-iframe/io-upload-iframe.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 11);
var w = Y.config.win,
    d = Y.config.doc,
    _std = (d.documentMode && d.documentMode >= 8),
    _d = decodeURIComponent;

/**
 * Creates the iframe transported used in file upload
 * transactions, and binds the response event handler.
 *
 * @method _cFrame
 * @private
 * @param {Object} o Transaction object generated by _create().
 * @param {Object} c Configuration object passed to YUI.io().
 * @param {Object} io
 */
_yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 26);
function _cFrame(o, c, io) {
    _yuitest_coverfunc("/build/io-upload-iframe/io-upload-iframe.js", "_cFrame", 26);
_yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 27);
var i = Y.Node.create('<iframe src="#" id="io_iframe' + o.id + '" name="io_iframe' + o.id + '" />');
        _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 28);
i._node.style.position = 'absolute';
        _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 29);
i._node.style.top = '-1000px';
        _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 30);
i._node.style.left = '-1000px';
        _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 31);
Y.one('body').appendChild(i);
    // Bind the onload handler to the iframe to detect the file upload response.
    _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 33);
Y.on("load", function() { _yuitest_coverfunc("/build/io-upload-iframe/io-upload-iframe.js", "(anonymous 2)", 33);
io._uploadComplete(o, c); }, '#io_iframe' + o.id);
}

/**
 * Removes the iframe transport used in the file upload 
 * transaction.
 *
 * @method _dFrame
 * @private
 * @param {Number} id The transaction ID used in the iframe's creation.
 */
_yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 44);
function _dFrame(id) {
	_yuitest_coverfunc("/build/io-upload-iframe/io-upload-iframe.js", "_dFrame", 44);
_yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 45);
Y.Event.purgeElement('#io_iframe' + id, false);
	_yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 46);
Y.one('body').removeChild(Y.one('#io_iframe' + id));
}

_yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 49);
Y.mix(Y.IO.prototype, {
   /**
    * Parses the POST data object and creates hidden form elements
    * for each key-value, and appends them to the HTML form object.
    * @method appendData
    * @private
    * @static
    * @param {Object} f HTML form object.
    * @param {String} s The key-value POST data.
    * @return {Array} o Array of created fields.
    */
    _addData: function(f, s) {
        // Serialize an object into a key-value string using
        // querystring-stringify-simple.
        _yuitest_coverfunc("/build/io-upload-iframe/io-upload-iframe.js", "_addData", 60);
_yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 63);
if (Y.Lang.isObject(s)) {
            _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 64);
s = Y.QueryString.stringify(s);
        }

        _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 67);
var o = [],
            m = s.split('='),
            i, l;

        _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 71);
for (i = 0, l = m.length - 1; i < l; i++) {
            _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 72);
o[i] = d.createElement('input');
            _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 73);
o[i].type = 'hidden';
            _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 74);
o[i].name = _d(m[i].substring(m[i].lastIndexOf('&') + 1));
            _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 75);
o[i].value = (i + 1 === l) ? _d(m[i + 1]) : _d(m[i + 1].substring(0, (m[i + 1].lastIndexOf('&'))));
            _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 76);
f.appendChild(o[i]);
        }

        _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 79);
return o;
    },

   /**
    * Removes the custom fields created to pass additional POST
    * data, along with the HTML form fields.
    * @method _removeData
    * @private
    * @static
    * @param {Object} f HTML form object.
    * @param {Object} o HTML form fields created from configuration.data.
    */
    _removeData: function(f, o) {
        _yuitest_coverfunc("/build/io-upload-iframe/io-upload-iframe.js", "_removeData", 91);
_yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 92);
var i, l;

        _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 94);
for (i = 0, l = o.length; i < l; i++) {
            _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 95);
f.removeChild(o[i]);
        }
    },

   /**
    * Sets the appropriate attributes and values to the HTML
    * form, in preparation of a file upload transaction.
    * @method _setAttrs
    * @private
    * @static
    * @param {Object} f HTML form object.
    * @param {Object} id The Transaction ID.
    * @param {Object} uri Qualified path to transaction resource.
    */
    _setAttrs: function(f, id, uri) {
        _yuitest_coverfunc("/build/io-upload-iframe/io-upload-iframe.js", "_setAttrs", 109);
_yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 110);
f.setAttribute('action', uri);
        _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 111);
f.setAttribute('method', 'POST');
        _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 112);
f.setAttribute('target', 'io_iframe' + id );
        _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 113);
f.setAttribute(Y.UA.ie && !_std ? 'encoding' : 'enctype', 'multipart/form-data');
    },

   /**
    * Reset the HTML form attributes to their original values.
    * @method _resetAttrs
    * @private
    * @static
    * @param {Object} f HTML form object.
    * @param {Object} a Object of original attributes.
    */
    _resetAttrs: function(f, a) {
        _yuitest_coverfunc("/build/io-upload-iframe/io-upload-iframe.js", "_resetAttrs", 124);
_yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 125);
Y.Object.each(a, function(v, p) {
            _yuitest_coverfunc("/build/io-upload-iframe/io-upload-iframe.js", "(anonymous 3)", 125);
_yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 126);
if (v) {
                _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 127);
f.setAttribute(p, v);
            }
            else {
                _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 130);
f.removeAttribute(p);
            }
        });
    },

   /**
    * Starts timeout count if the configuration object
    * has a defined timeout property.
    *
    * @method _startUploadTimeout
    * @private
    * @static
    * @param {Object} o Transaction object generated by _create().
    * @param {Object} c Configuration object passed to YUI.io().
    */
    _startUploadTimeout: function(o, c) {
        _yuitest_coverfunc("/build/io-upload-iframe/io-upload-iframe.js", "_startUploadTimeout", 145);
_yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 146);
var io = this;

        _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 148);
io._timeout[o.id] = w.setTimeout(
            function() {
                _yuitest_coverfunc("/build/io-upload-iframe/io-upload-iframe.js", "(anonymous 4)", 149);
_yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 150);
o.status = 0;
                _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 151);
o.statusText = 'timeout';
                _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 152);
io.complete(o, c);
                _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 153);
io.end(o, c);
            }, c.timeout);
    },

   /**
    * Clears the timeout interval started by _startUploadTimeout().
    * @method _clearUploadTimeout
    * @private
    * @static
    * @param {Number} id - Transaction ID.
    */
    _clearUploadTimeout: function(id) {
        _yuitest_coverfunc("/build/io-upload-iframe/io-upload-iframe.js", "_clearUploadTimeout", 164);
_yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 165);
var io = this;

        _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 167);
w.clearTimeout(io._timeout[id]);
        _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 168);
delete io._timeout[id];
    },

   /**
    * Bound to the iframe's Load event and processes
    * the response data.
    * @method _uploadComplete
    * @private
    * @static
    * @param {Object} o The transaction object
    * @param {Object} c Configuration object for the transaction.
    */
    _uploadComplete: function(o, c) {
        _yuitest_coverfunc("/build/io-upload-iframe/io-upload-iframe.js", "_uploadComplete", 180);
_yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 181);
var io = this,
            d = Y.one('#io_iframe' + o.id).get('contentWindow.document'),
            b = d.one('body'),
            p;

        _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 186);
if (c.timeout) {
            _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 187);
io._clearUploadTimeout(o.id);
        }

		_yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 190);
try {
			_yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 191);
if (b) {
				// When a response Content-Type of "text/plain" is used, Firefox and Safari
				// will wrap the response string with <pre></pre>.
				_yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 194);
p = b.one('pre:first-child');
				_yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 195);
o.c.responseText = p ? p.get('text') : b.get('text');
			}
			else {
				_yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 198);
o.c.responseXML = d._node;
			}
		}
		catch (e) {
			_yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 202);
o.e = "upload failure";
		}

        _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 205);
io.complete(o, c);
        _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 206);
io.end(o, c);
        // The transaction is complete, so call _dFrame to remove
        // the event listener bound to the iframe transport, and then
        // destroy the iframe.
        _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 210);
w.setTimeout( function() { _yuitest_coverfunc("/build/io-upload-iframe/io-upload-iframe.js", "(anonymous 5)", 210);
_dFrame(o.id); }, 0);
    },

   /**
    * Uploads HTML form data, inclusive of files/attachments,
    * using the iframe created in _create to facilitate the transaction.
    * @method _upload
    * @private
    * @static
    * @param {Object} o The transaction object
    * @param {Object} uri Qualified path to transaction resource.
    * @param {Object} c Configuration object for the transaction.
    */
    _upload: function(o, uri, c) {
        _yuitest_coverfunc("/build/io-upload-iframe/io-upload-iframe.js", "_upload", 223);
_yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 224);
var io = this,
            f = (typeof c.form.id === 'string') ? d.getElementById(c.form.id) : c.form.id,
            // Track original HTML form attribute values.
            attr = {
                action: f.getAttribute('action'),
                target: f.getAttribute('target')
            },
            fields;

        // Initialize the HTML form properties in case they are
        // not defined in the HTML form.
        _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 235);
io._setAttrs(f, o.id, uri);
        _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 236);
if (c.data) {
            _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 237);
fields = io._addData(f, c.data);
        }

        // Start polling if a callback is present and the timeout
        // property has been defined.
        _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 242);
if (c.timeout) {
            _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 243);
io._startUploadTimeout(o, c);
        }

        // Start file upload.
        _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 247);
f.submit();
        _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 248);
io.start(o, c);
        _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 249);
if (c.data) {
            _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 250);
io._removeData(f, fields);
        }
        // Restore HTML form attributes to their original values.
        _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 253);
io._resetAttrs(f, attr);

        _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 255);
return {
            id: o.id,
            abort: function() {
                _yuitest_coverfunc("/build/io-upload-iframe/io-upload-iframe.js", "abort", 257);
_yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 258);
o.status = 0;
                _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 259);
o.statusText = 'abort';
                _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 260);
if (Y.one('#io_iframe' + o.id)) {
                    _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 261);
_dFrame(o.id);
                    _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 262);
io.complete(o, c);
                    _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 263);
io.end(o, c);
                }
                else {
                    _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 266);
return false;
                }
            },
            isInProgress: function() {
                _yuitest_coverfunc("/build/io-upload-iframe/io-upload-iframe.js", "isInProgress", 269);
_yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 270);
return Y.one('#io_iframe' + o.id) ? true : false;
            },
            io: io
        };
    },

    upload: function(o, uri, c) {
        _yuitest_coverfunc("/build/io-upload-iframe/io-upload-iframe.js", "upload", 276);
_yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 277);
_cFrame(o, c, this);
        _yuitest_coverline("/build/io-upload-iframe/io-upload-iframe.js", 278);
return this._upload(o, uri, c);
    }
});


}, '3.7.1pr1' ,{requires:['io-base','node-base']});
