var q4 = {
	_init: function(){
		this._setHeaderImage();
		this._setBackURL();
	},

	_setBackURL: function(){
		$('button.back').on('click', function(e){
			e.preventDefault();
			var hash = location.href.split('/')[5];
			window.location = hash !== undefined ? '/default.aspx#' + hash : '/default.aspx';
		});
	},

	_setHeaderImage: function(){
		var header = {
			config: $('.story-container').data(),
			image: function() {
				if (this.config !== undefined && this.config.image !== undefined) {
					return this.config.image;
				}

				return 'none' // Set a default image
			},
			position: function() {
				if (this.config.position !== undefined) {
					return this.config.position;
				}

				return 'top'; // Set a default position
			},
			text: function() {
				if (this.config.text !== undefined) {
					return this.config.text;
				}

				return '';
			},
			overlay: function() {
				if (this.config.overlay !== undefined) {
					return '<i class="'+ this.config.overlay +'"></i>' + this.text();
				}

				return this.text();
			}
		}

		var container = $('<div class="header-image" class="story-header"></div>').appendTo('.header-container .HeaderPaneDiv')

		if (header.config !== undefined){
			container.css({
				'background-image': 'url(' + header.image() + ')',
				'background-position': header.position()
			}).append( '<div class="header-overlay">'+ header.overlay() +'</div>' );
		}
	}
};

$(function(){
	q4._init();
});
