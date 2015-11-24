(function($) {
    $.widget("q4.stories", {
        options: {
            templates: {
                single: (
                    '<div id="{{SeoName}}" class="story-item single {{cls}}">' +
                        '<div class="col col-1-of-3 story-image">' +
                            '<img data-src="{{ThumbnailPath}}" alt="{{Headline}}">' +
                        '</div>' +
                        '<div class="col col-2-of-3 col-md-1-of-1 col-sm-1-of-1 story-content">' +
                            '<div class="story-inner animations">' +
                                '{{#Headline}}<h2 class="fade-from-top">{{Headline}}</h2>{{/Headline}}' +
                                '{{#Body}}<div class="story-body fade-from-bottom">{{{Body}}}</div>{{/Body}}' +
                                '{{#LinkToDetailPage}}<a href="{{LinkToDetailPage}}" class="arrow fade-in"></a>{{/LinkToDetailPage}}' +
                            '</div>' +
                        '</div>' +
                    '</div>'
                ),
                'single-alt': (
                    '<div id="{{SeoName}}" class="story-item single alt {{cls}}">' +
                        '<div class="col col-2-of-3 col-md-1-of-1 col-sm-1-of-1 story-content animations">' +
                            '<div class="story-inner">' +
                                '{{#Headline}}<h2 class="fade-from-top">{{Headline}}</h2>{{/Headline}}' +
                                '{{#Body}}<div class="story-body fade-from-bottom">{{{Body}}}</div>{{/Body}}' +
                                '{{#LinkToDetailPage}}<a href="{{LinkToDetailPage}}" class="arrow fade-in"></a>{{/LinkToDetailPage}}' +
                            '</div>' +
                        '</div>' +
                        '<div class="col col-1-of-3 story-image">' +
                            '<img data-src="{{ThumbnailPath}}" alt="{{Headline}}">' +
                        '</div>' +
                    '</div>'
                ),
                multi: (
                    '<div id="{{SeoName}}" class="story-item multi col {{cls}}">' +
                        '<div class="col story-image">' +
                            '<a href=""><img data-src="{{ThumbnailPath}}" alt="{{Headline}}"></a>' +
                        '</div>' +
                        '<div class="col story-content animations">' +
                            '{{#Headline}}<h2 class="fade-from-top">{{Headline}}</h2>{{/Headline}}' +
                            '<div class="story-body fade-from-bottom">{{{Body}}}</div>' +
                            '{{#LinkToDetailPage}}<a href="{{LinkToDetailPage}}" class="arrow fade-in"></a>{{/LinkToDetailPage}}' +
                        '</div>' +
                    '</div>'
                ),
                'multi-alt': (
                    '<div id="{{SeoName}}" class="story-item multi alt col {{cls}}">' +
                        '<div class="col story-image">' +
                            '<a href=""><img data-src="{{ThumbnailPath}}" alt="{{Headline}}"></a>' +
                        '</div>' +
                        '<div class="col story-content animations">' +
                            '{{#Headline}}<h2 class="fade-from-top">{{Headline}}</h2>{{/Headline}}' +
                            '<div class="story-body fade-from-bottom">{{{Body}}}</div>' +
                            '{{#LinkToDetailPage}}<a href="{{LinkToDetailPage}}" class="arrow fade-in"></a>{{/LinkToDetailPage}}' +
                        '</div>' +
                    '</div>'
                ),
                feature: (
                    '<div id="{{SeoName}}" class="story-item feature {{cls}}">' +
                        '<div{{#ThumbnailPath}} data-bg="{{{ThumbnailPath}}}"{{/ThumbnailPath}} class="fixed-bg">' +
                            '{{#overlay}}<div class="overlay-background">{{/overlay}}' +
                                '<div class="container animations">' +
                                    '{{#Headline}}<h2 class="fade-from-top">{{Headline}}</h2>{{/Headline}}' +
                                    '{{#Body}}<div class="story-body fade-from-bottom">{{{Body}}}</div>{{/Body}}' +
                                    '{{#LinkToDetailPage}}<a class="arrow fade-in" href="{{LinkToDetailPage}}"></a>{{/LinkToDetailPage}}' +
                                '</div>' +
                            '{{#overlay}}</div>{{/overlay}}' +
                        '</div>' +
                    '</div>'
                ),
                download: (
                    '<div id="{{SeoName}}" class="story-item download {{cls}}">' +
                        '<div class="container animations">' +
                            '<div class="story-body {{animationCls}}">' +
                                '<a href="{{LinkToDetailPage}}" target="_blank" class="download-item">' +
                                    '{{#ThumbnailPath}}<img data-src="{{ThumbnailPath}}" alt="{{Headline}}">{{/ThumbnailPath}}' +
                                    '{{#Headline}}<span class="download-text">{{Headline}}</span>{{/Headline}}' +
                                '</a>' +
                            '</div>' +
                        '</div>' +
                    '</div>'
                )
            },
            onComplete: function(){}
        },

        _init: function() {
            this._getStories();
        },

        _buildParams: function () {
            return {
                serviceDto: {
                    ViewType: GetViewType(),
                    ViewDate: GetViewDate(),
                    StartIndex: 0,
                    IncludeTags: true,
                    RevisionNumber: GetRevisionNumber(),
                    LanguageId: GetLanguageId(),
                    Signature: GetSignature()
                }
            };
        },

        _getData: function (url, params) {
            return $.ajax({
                type: 'POST',
                url: url,
                data: JSON.stringify(params),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json'
            });
        },

        _getStories: function(ticker){
            var inst = this;

            inst._getData('/Services/PressReleaseService.svc/GetPressReleaseList', 
                $.extend( inst._buildParams(), {
                    excludeSelection: 0,
                    pressReleaseSelection: 3,
                    pressReleaseCategoryWorkflowId: "1cb807d2-208f-4bc3-9133-6a9ad45ac3b0",
                    pressReleaseBodyType: 2
                })
            ).done(function (data) {
                var stories = '',
                    storyAlt = 0,
                    storiesAlt = 0,
                    downloadAlt = 0;

                $.each(data.GetPressReleaseListResult, function(i, story){
                    var tpl = inst.options.templates,
                        animationCls = '',
                        cls = '', 
                        tag = '';

                    $.each(story.TagsList, function(idx, item){
                        switch(item) {
                            case 'feature':
                                tag = 'feature';
                                break;
                            case 'download':
                                animationCls = downloadAlt % 2 === 0 ? 'fade-from-left' : 'fade-from-right';
                                tag = 'download';
                                downloadAlt += 1;
                                break;
                            case 'single':
                                tag = storyAlt % 2 === 0 ? 'single' : 'single-alt';
                                storyAlt += 1;
                                break;
                            case 'multi':
                                tag = storiesAlt % 2 === 0 ? 'multi' : 'multi-alt';
                                storiesAlt += 1;
                                break;
                            case 'no-title':
                                story.Headline = '';
                                break;
                            case 'overlay-background':
                                story.overlay = true;
                                break;
                            default:
                                cls += ' ' + item;
                                break;
                        }
                    });
                    
                    story.cls = cls;
                    story.animationCls = animationCls;
                    story.LinkToDetailPage = story.LinkToDetailPage == '#' ? '' : story.LinkToDetailPage;
                    stories += Mustache.render(tpl[tag], story);
                });

                inst.element.html(stories);
                inst._lazyLoad();

                if (location.hash.length){
                    inst._scrollTo(location.hash);
                }


                $(window).on( 'DOMContentLoaded load resize scroll', q4._onVisibilityChange( $('.animations') ) );
            });
        },

        _scrollTo: function(location){
            $('html, body').animate({
                scrollTop: $( location ).offset().top
            }, 500, 'linear');
        },

        _windowResize: function(){
            $(window).trigger('resize').trigger('scroll');
        },

        _lazyLoad: function(){
            $(window).lazyLoadXT();
        },

        destroy: function() {
            this.element.html('');
        },

        _setOption: function(option, value) {
            this._superApply(arguments);
        }
        
    });
})(jQuery);

$(function(){
    $('.story-container').stories();
})
