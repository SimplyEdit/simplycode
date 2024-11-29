hope.register( 'hope.render.html', function() {

	var nestingSets = {
		'inline'	: [ 'tt', 'u', 'strike', 'em', 'strong', 'dfn', 'code', 'samp', 'kbd', 'var', 'cite', 'abbr', 'acronym', 'sub', 'sup', 'q', 'span', 'bdo', 'a', 'object', 'img', 'bd', 'br', 'i' ],
		'block'		: [ 'address', 'dir', 'menu', 'hr', 'li', 'table', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre', 'ul', 'ol', 'dl', 'div', 'blockquote', 'iframe' ]
	};

	nestingSets.all = nestingSets.block.concat( nestingSets.inline );

	this.rules = {
		nesting: {
			'a'         : nestingSets.inline.filter( function(element) { return element != 'a'; } ),
			'abbr'      : nestingSets.inline,
			'acronym'   : nestingSets.inline,
			'address'   : [ 'p' ].concat( nestingSets.inline ),
			'bdo'       : nestingSets.inline,
			'blockquote': nestingSets.all,
			'br'        : [],
			'caption'   : nestingSets.inline,
			'cite'      : nestingSets.inline,
			'code'      : nestingSets.inline,
			'col'       : [],
			'colgroup'  : [ 'col' ],
			'dd'        : nestingSets.all,
			'dfn'       : nestingSets.inline,
			'dir'       : [ 'li' ],
			'div'       : nestingSets.all,
			'dl'        : [ 'dt', 'dd' ],
			'dt'        : nestingSets.inline,
			'em'        : nestingSets.inline,
			'h1'        : nestingSets.inline,
			'h2'        : nestingSets.inline,
			'h3'        : nestingSets.inline,
			'h4'        : nestingSets.inline,
			'h5'        : nestingSets.inline,
			'h6'        : nestingSets.inline,
			'hr'        : [],
			'img'       : [],
			'kbd'       : nestingSets.inline,
			'li'        : nestingSets.all,
			'menu'      : [ 'li' ],
			'object'    : [ 'param' ].concat( nestingSets.all ),
			'ol'        : [ 'li' ],
			'p'         : nestingSets.inline,
			'pre'       : nestingSets.inline,
			'q'         : nestingSets.inline,
			'samp'      : nestingSets.inline,
			'span'      : nestingSets.inline,
			'strike'    : nestingSets.inline,
			'strong'    : nestingSets.inline,
			'sub'       : nestingSets.inline,
			'sup'       : nestingSets.inline,
			'table'     : [ 'caption', 'colgroup', 'col', 'thead', 'tbody' ],
			'tbody'     : [ 'tr' ],
			'td'        : nestingSets.all,
			'th'        : nestingSets.all,
			'thead'     : [ 'tr' ],
			'tr'        : [ 'td', 'th' ],
			'tt'        : nestingSets.inline,
			'u'         : nestingSets.inline,
			'ul'        : [ 'li' ],
			'var'       : nestingSets.inline
		},
		// which html elements can not have child elements at all and shouldn't be closed
		'noChildren' : [ 'hr', 'br', 'col', 'img' ],
		// which html elements must have a specific child element
		'obligChild' : {
			'ol' : [ 'li' ],
			'ul' : [ 'li' ],
			'dl' : [ 'dt', 'dd' ]
		},
		// which html elements must have a specific parent element
		'obligParent' : {
			'li' : [ 'ul', 'ol', 'dir', 'menu' ],
			'dt' : [ 'dl' ],
			'dd' : [ 'dl' ]
		},
		// which html elements to allow as the top level, default is only block elements
		'toplevel' : nestingSets.block.concat(nestingSets.inline), // [ 'li', 'img', 'span', 'strong', 'em', 'code' ],
		'nestingSets' : nestingSets
	};

	this.getTag = function( markup ) {
		return markup.split(' ')[0].toLowerCase(); // FIXME: more robust parsing needed
	};

	this.getAnnotationStack = function( annotationSet ) {
		// { index:nextAnnotationEntry.index, entry:nextAnnotation }
		// 		{ start:, end:, annotation: }
		// assert: annotationSet must only contain annotation that has overlapping ranges
		// if not results will be unpredictable
		var annotationStack = [];
		if ( !annotationSet.length ) {
			return [];
		}
		
		var rules = this.rules;

		annotationSet.sort( function( a, b ) {
			if ( a.range.start < b.range.start ) {
				return -1;
			} else if ( a.range.start > b.range.start ) {
				return 1;
			} else if ( a.range.end > b.range.end ) {
				return -1;
			} else if ( a.range.end < b.range.end ) {
				return 1;
			}

			// if comparing ul/ol and li on the same range, ul/ol goes first;
			if (rules.obligParent[a.tag.split(/ /)[0]]) {
				if (rules.obligParent[a.tag.split(/ /)[0]].indexOf(b.tag.split(/ /)[0]) != -1) {
					return 1;
				}
			}
			if (rules.obligParent[b.tag.split(/ /)[0]]) {
				if (rules.obligParent[b.tag.split(/ /)[0]].indexOf(a.tag.split(/ /)[0]) != -1) {
					return -1;
				}
			}

			// block elementen komen voor andere elementen
			if (nestingSets.block.indexOf(a.tag.split(/ /)[0]) != '-1') {
				return -1;
			}
			if (nestingSets.block.indexOf(b.tag.split(/ /)[0]) != '-1') {
				return 1;
			}

			// hack om hyperlinks met images er in te laten werken.
			if (a.tag.split(/ /)[0] == 'a') {
				return -1;
			}
			if (b.tag.split(/ /)[0] == 'a') {
				return 1;
			}

			// daarna komen inline elementen
			if (nestingSets.inline.indexOf(a.tag.split(/ /)[0]) != '-1') {
				return -1;
			}
			if (nestingSets.inline.indexOf(b.tag.split(/ /)[0]) != '-1') {
				return 1;
			}

			return 0;
		});
		var unfilteredStack = [];
		for ( var i=0, l=annotationSet.length; i<l; i++ ) {
			unfilteredStack.push( annotationSet[i] ); // needs to be filtered
		}
		// assume annotation higher in the stack is what user intended, so should override conflicting annotation lower in the stack
		// stack will be built up in reverse, most local styles applied first
		var annotation        = unfilteredStack.pop();
		var annotationTag     = this.getTag( annotation.tag );
		var lastAnnotationTag = '';
		var skippedAnnotation = [];

		// make sure any obligatory child is applied
		// FIXME: for readable html you should allow whitespace to be outside an obligatory child element
/*		if ( this.rules.obligChild[ annotationTag ] ) {
			lastAnnotationTag = this.rules.obligChild[ annotationTag ][0];
			annotationStack.push( lastAnnotationTag );
		}
*/
		do {
			annotationTag = this.getTag( annotation.tag );

			// Treat unknown types as a div.
			if (typeof this.rules.nesting[ annotationTag ] === "undefined") {
				this.rules.nesting[ annotationTag ] = this.rules.nesting["div"];
				for (i in this.rules.nesting) {
					this.rules.nesting[i].push(annotationTag);
				}
			}
			if (this.rules.toplevel.indexOf( annotationTag ) == -1) {
				this.rules.toplevel.push(annotationTag); // allow it as a toplevel element;
			}

			if ( 
				( !lastAnnotationTag && this.rules.toplevel.indexOf( annotationTag ) == -1 ) || 
				( lastAnnotationTag && ( !this.rules.nesting[ annotationTag ] || 
				this.rules.nesting[ annotationTag ].indexOf( lastAnnotationTag ) == -1 ) ) 
			) {
				// not legal: lastAnnotationTag may not be set inside annotationTag - so we cannot apply annotationTag
				// save it for another try later
				skippedAnnotation.push( annotation );			
			} else {
				annotationStack.push( annotation );
				lastAnnotationTag = this.getTag( annotation.tag );
			}
			annotation = unfilteredStack.pop();
		} while ( annotation );


		if ( skippedAnnotation.length ) {
			// now try to find a spot for any annotation from the skippedAnnotation set
			// most likely: inline annotation that was more generally applied than block annotation
			// the order has been reversed
			var topAnnotationTag = this.getTag( annotationStack[0].tag );
			annotation = skippedAnnotation.pop();
			while ( annotation ) {
				annotationTag = this.getTag( annotation.tag );
				if (  
					( !topAnnotationTag && this.rules.toplevel.indexOf( annotationTag ) == -1 ) || 
					( topAnnotationTag && ( !this.rules.nesting[ topAnnotationTag ] || 
					this.rules.nesting[ topAnnotationTag ].indexOf( annotationTag ) == -1 ) ) 
				) {
					// not legal, you could try another run... FIXME: should probably try harder 
				} else {
					annotationStack.unshift( annotation );
					topAnnotationTag = annotationTag;
				}
				annotation = skippedAnnotation.pop();
			}
		}
		// FIXME: this routine can be improved - it needs a more intelligent algorithm to reorder the annotation to maximize the applied
		// annotation from the annotationSet in the annotationStack
		return annotationStack.reverse();
	};

	this.getAnnotationDiff = function( annotationStackFrom, annotationStackTo, annotationsOnce ) {
		var i;
		var annotationDiff = [];
		for ( i=0, l=annotationsOnce.length; i<l; i++ ) {
			annotationDiff.push( { type : 'insert', annotation : annotationsOnce[i] } );
		}

		var commonStack = [];
		for ( i=0, l=annotationStackFrom.length; i<l; i++ ) {
			if ( annotationStackFrom[i] != annotationStackTo[i] ) {
				break;
			}
			commonStack.push( annotationStackFrom[i] );
		}
		var commonIndex = i-1;
		for ( i=annotationStackFrom.length-1; i>commonIndex; i-- ) {
			annotationDiff.push( { type : 'close', annotation : annotationStackFrom[i] } );
		}
		for ( i=commonIndex+1, l=annotationStackTo.length; i<l; i++ ) {
			annotationDiff.push( { type : 'start', annotation : annotationStackTo[i] } );
		}

		return annotationDiff;
	};

	this.renderAnnotationDiff = function( annotationDiff ) {
		// FIXME: allow rendering of custom elements, must still be inserted into this.rules
		var renderedDiff = '';
		for ( var i=0, l=annotationDiff.length; i<l; i++ ) {
			var annotationTag;
			if ( annotationDiff[i].type == 'close' ) {
				annotationTag = this.getTag( annotationDiff[i].annotation.tag );
				if ( this.rules.noChildren.indexOf( annotationTag ) == -1 ) {
					renderedDiff += '</' + annotationTag + '>';
				}
			} else if ( annotationDiff[i].type == 'insert' ) {
				renderedDiff += '<' + annotationDiff[i].annotation.tag + '>';
				annotationTag = this.getTag( annotationDiff[i].annotation.tag );
				if ( this.rules.noChildren.indexOf( annotationTag ) == -1 ) {
					renderedDiff += '</' + annotationTag + '>';
				}
			} else {
				renderedDiff += '<' + annotationDiff[i].annotation.tag + '>';
			}
		}
		return renderedDiff;
	};

	this.escape = function( content ) {
		return content
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#039;");
	};

	this.render = function( fragment ) {
		// FIXME: annotation should be the relative annotation list to speed things up
		var annotationSet      = [];    // set of applicable annotation at current position
		var annotationStack    = [];  // stack of applied (valid) annotation at current position

		var relativeAnnotation = fragment.annotations.getEventList();
		var content        = fragment.text.toString();

		var renderedHTML   = '';
		var cursor         = 0;

		while ( relativeAnnotation.length ) {

			var annotationChangeSet = relativeAnnotation.shift();
			var annotationAdded     = []; // list of annotation added in this change set
			var annotationSetOnce   = []; // list of annotation that can not have children, needs no close
			for ( i=0, l=annotationChangeSet.markup.length; i<l; i++ ) {
				var annotationChange = annotationChangeSet.markup[i];
				switch ( annotationChange.type ) {
					case 'start':
						annotationSet.push( fragment.annotations.list[ annotationChange.index ] );
						annotationAdded.push( annotationChange.index );
					break;
					case 'end':
						annotationSet = annotationSet.filter( function( element ) {
							return element != fragment.annotations.list[ annotationChange.index ];
						} );
					break;
					case 'insert':
						annotationSetOnce.push( fragment.annotations.list[ annotationChange.index ] );
					break;
				}
			}

			// add any content that has no change in annotation
			var offset = annotationChangeSet.offset;
			if ( offset > 0 ) {
				if (diffHTML && (
					diffHTML.indexOf("<br>") !== -1 ||
					diffHTML.indexOf("<hr>") !== -1 ||
					diffHTML.indexOf("<img") !== -1 ||
					(offset == 1 && (content.substr(cursor, offset) == "\u00AD")) // FIXME: This should have some kind of check to see if the element was empty in the first place;
				) ) {
					// skip the placeholder char for the rendering;
					cursor++;
					offset--;
				}

				renderedHTML += this.escape( content.substr(cursor, offset) );
				cursor+=offset;
			}
			offset = 0;

			// calculate the valid annotation stack from a given set
			var newAnnotationStack = this.getAnnotationStack( annotationSet ); //.concat( annotationSetOnce ) );
			var newAnnotationsOnce = this.getAnnotationStack( annotationSetOnce );
			// calculate the difference - how to get from stack one to stack two with the minimum of tags
			var diff = this.getAnnotationDiff( annotationStack, newAnnotationStack, newAnnotationsOnce );
			// remove autoclosing annotation from the newAnnotationStack
			newAnnotationStack = this.getAnnotationStack( annotationSet );
			var diffHTML = this.renderAnnotationDiff( diff );

			renderedHTML += diffHTML;
			annotationStack = newAnnotationStack;

		} while( relativeAnnotation.length );

		if ( cursor < content.length ) {
			renderedHTML += this.escape( content.substr( cursor ) );
		}

		return renderedHTML;
	};

} );