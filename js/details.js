var q4 = {
	_init: function(){
		this._setHeaderImage();
	},

	_setHeaderImage: function(){
		var header = {
			config: $('.story-container').data(),
			image: function() {
				if (this.config.image !== undefined) {
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

				return;
			},
			overlay: function() {
				if (this.config.overlay !== undefined) {
					return '<i class="'+ this.config.overlay +'"></i>' + this.text();
				}

				return this.text();
			}
		}

 		//data-text="Full Graph" data-overlay=".q4-search-plus""

		var container = $('<div class="header-image" class="story-header"></div>')
			.appendTo('.header-container .HeaderPaneDiv').css({
				'background-image': 'url(' + header.image() + ')',
				'background-position': header.position()
			}).append( '<div class="header-overlay">'+ header.overlay() +'</div>' );
	}
};

$(function(){
	q4._init();
});
