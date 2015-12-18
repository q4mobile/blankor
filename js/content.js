(function($) {
    $.widget("q4.stories", {
        options: {
            tolerance: '-250',
            downloads: 'even',
            templates: {
                single: (
                    '<div id="{{SeoName}}" class="story-item single {{cls}}">' +
                        '<div class="in-viewport"></div>' +
                        '<div class="col col-1-of-3 story-image fade-from-left">' +
                            '<img data-src="{{ThumbnailPath}}" alt="{{Headline}}">' +
                        '</div>' +
                        '<div class="col col-2-of-3 col-md-1-of-1 col-sm-1-of-1 story-content">' +
                            '<div class="story-inner">' +
                                '{{#Headline}}<h2 class="fade-from-top">{{{Headline}}}</h2>{{/Headline}}' +
                                '{{#Body}}<div class="story-body fade-from-bottom">{{{Body}}}</div>{{/Body}}' +
                                '{{#LinkToDetailPage}}<a href="{{LinkToDetailPage}}" class="details arrow fade-in"></a>{{/LinkToDetailPage}}' +
                            '</div>' +
                        '</div>' +
                    '</div>'
                ),
                'single-alt': (
                    '<div id="{{SeoName}}" class="story-item single alt {{cls}}">' +
                        '<div class="in-viewport"></div>' +
                        '<div class="col col-2-of-3 col-md-1-of-1 col-sm-1-of-1 story-content">' +
                            '<div class="story-inner">' +
                                '{{#Headline}}<h2 class="fade-from-top">{{{Headline}}}</h2>{{/Headline}}' +
                                '{{#Body}}<div class="story-body fade-from-bottom">{{{Body}}}</div>{{/Body}}' +
                                '{{#LinkToDetailPage}}<a href="{{LinkToDetailPage}}" class="details arrow fade-in"></a>{{/LinkToDetailPage}}' +
                            '</div>' +
                        '</div>' +
                        '<div class="col col-1-of-3 story-image fade-from-right">' +
                            '<img data-src="{{ThumbnailPath}}" alt="{{Headline}}">' +
                        '</div>' +
                    '</div>'
                ),
                multi: (
                    '<div id="{{SeoName}}" class="story-item multi col {{cls}}">' +
                        '<div class="in-viewport"></div>' +
                        '<div class="col story-image fade-in">' +
                            '{{#LinkToDetailPage}}<a href="{{LinkToDetailPage}}">{{/LinkToDetailPage}}' +
                                '<img data-src="{{ThumbnailPath}}" alt="{{Headline}}">' +
                                '{{#overlay}}<div class="overlay-background"></div>{{/overlay}}' +
                            '{{#LinkToDetailPage}}</a>{{/LinkToDetailPage}}' +
                        '</div>' +
                        '<div class="col story-content">' +
                            '{{#Headline}}<h2 class="{{animationCls}}">{{{Headline}}}</h2>{{/Headline}}' +
                            '<div class="story-body fade-from-bottom">{{{Body}}}</div>' +
                            '{{#LinkToDetailPage}}<a href="{{LinkToDetailPage}}" class="details arrow fade-in"></a>{{/LinkToDetailPage}}' +
                        '</div>' +
                    '</div>'
                ),
                'multi-alt': (
                    '<div id="{{SeoName}}" class="story-item multi alt col {{cls}}">' +
                        '<div class="in-viewport"></div>' +
                        '<div class="col story-image fade-in">' +
                            '{{#LinkToDetailPage}}<a href="{{LinkToDetailPage}}">{{/LinkToDetailPage}}' +
                                '<img data-src="{{ThumbnailPath}}" alt="{{Headline}}">' +
                                '{{#overlay}}<div class="overlay-background"></div>{{/overlay}}' +
                            '{{#LinkToDetailPage}}</a>{{/LinkToDetailPage}}' +
                        '</div>' +
                        '<div class="col story-content">' +
                            '{{#Headline}}<h2 class="{{animationCls}}">{{{Headline}}}</h2>{{/Headline}}' +
                            '<div class="story-body fade-from-bottom">{{{Body}}}</div>' +
                            '{{#LinkToDetailPage}}<a href="{{LinkToDetailPage}}" class="details arrow fade-in"></a>{{/LinkToDetailPage}}' +
                        '</div>' +
                    '</div>'
                ),
                feature: (
                    '<div id="{{SeoName}}" class="story-item feature {{cls}}">' +
                        '<div class="in-viewport"></div>' +
                        '<div{{#ThumbnailPath}} data-bg="{{{ThumbnailPath}}}"{{/ThumbnailPath}} class="fixed-bg">' +
                            '{{#overlay}}<div class="overlay-background">{{/overlay}}' +
                                '<div class="container">' +
                                    '{{#Headline}}<h2 class="fade-from-top">{{{Headline}}}</h2>{{/Headline}}' +
                                    '{{#Body}}<div class="story-body fade-from-bottom">{{{Body}}}</div>{{/Body}}' +
                                    '{{#LinkToDetailPage}}<a href="{{LinkToDetailPage}}" class="details arrow fade-in"></a>{{/LinkToDetailPage}}' +
                                '</div>' +
                            '{{#overlay}}</div>{{/overlay}}' +
                        '</div>' +
                    '</div>'
                ),
                'feature-half': (
                    '<div id="{{SeoName}}" class="story-item feature feature-half col col-1-of-2 col-md-1-of-1 {{cls}}">' +
                        '<div class="in-viewport"></div>' +
                        '<div{{#ThumbnailPath}} data-bg="{{{ThumbnailPath}}}"{{/ThumbnailPath}} class="fixed-bg">' +
                            '{{#overlay}}<div class="overlay-background">{{/overlay}}' +
                                '<div class="container">' +
                                    '{{#Headline}}<h2 class="{{animationCls}}">{{{Headline}}}</h2>{{/Headline}}' +
                                    '{{#Body}}<div class="story-body {{animationCls}}">{{{Body}}}</div>{{/Body}}' +
                                    '{{#LinkToDetailPage}}<a href="{{LinkToDetailPage}}" class="details arrow fade-in"></a>{{/LinkToDetailPage}}' +
                                '</div>' +
                            '{{#overlay}}</div>{{/overlay}}' +
                        '</div>' +
                    '</div>'
                ),
                'download-even': (
                    '<div id="{{SeoName}}" class="story-item download col col-1-of-2 {{cls}}">' +
                        '<div class="in-viewport"></div>' +
                        '<div class="container">' +
                            '<div class="story-body {{animationCls}}">' +
                                '<a href="{{LinkToDetailPage}}" target="_blank" class="download-item">' +
                                    '{{#ThumbnailPath}}<img data-src="{{ThumbnailPath}}" alt="{{Headline}}">{{/ThumbnailPath}}' +
                                    '{{#Headline}}<span class="download-text">{{{Headline}}}</span>{{/Headline}}' +
                                '</a>' +
                            '</div>' +
                        '</div>' +
                    '</div>'
                ),
                'download-odd': (
                    '<div id="{{SeoName}}" class="story-item download col col-1-of-3 {{cls}}">' +
                        '<div class="in-viewport"></div>' +
                        '<div class="container">' +
                            '<div class="story-body {{animationCls}}">' +
                                '<a href="{{LinkToDetailPage}}" target="_blank" class="download-item">' +
                                    '{{#ThumbnailPath}}<img data-src="{{ThumbnailPath}}" alt="{{Headline}}">{{/ThumbnailPath}}' +
                                    '{{#Headline}}<span class="download-text">{{{Headline}}}</span>{{/Headline}}' +
                                '</a>' +
                            '</div>' +
                        '</div>' +
                    '</div>'
                )
            },
            slickOpts: {
                dots: true,
                infinite: true,
                arrows: false,
                pauseOnHover: false,
                autoplay: true,
                autoplaySpeed: 5000
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
                    featureHalf = 0,
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
                            case 'feature-half':
                                tag = 'feature-half';
                                animationCls = featureHalf % 2 === 0 ? 'fade-from-left' : 'fade-from-right';
                                featureHalf += 1;
                                break;
                            case 'download':
                                if (inst.options.downloads == "even") {
                                    tag = 'download-even';
                                    animationCls = downloadAlt % 2 === 0 ? 'fade-from-left' : 'fade-from-right';
                                } else {
                                    tag = 'download-odd';

                                    if (downloadAlt % 3 === 0) {
                                        animationCls = 'fade-from-left';
                                    } else if (downloadAlt % 3 == 1){
                                        animationCls = 'fade-from-top';
                                    } else {
                                        animationCls = 'fade-from-right';
                                    }
                                }
                                downloadAlt += 1;
                                break;
                            case 'single':
                                tag = storyAlt % 2 === 0 ? 'single' : 'single-alt';
                                storyAlt += 1;
                                break;
                            case 'multi':
                                tag = storiesAlt % 2 === 0 ? 'multi' : 'multi-alt';
                                animationCls = storiesAlt % 2 === 0 ? 'fade-from-left' : 'fade-from-right';
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
                    story.Body = $(story.Body).find('.landing-content')[0] !== undefined || $(story.Body).hasClass('landing-content') ? $(story.Body).wrap('<div/>').parent().find('.landing-content')[0].outerHTML : '';
                    
                    stories += Mustache.render(tpl[tag], story);
                });


                inst.element.html(stories);
                inst._lazyLoad();
                inst._onTabClick();
                inst._onMobileTableClick();

                if (location.hash.length){
                    inst._scrollTo(location.hash);
                }

                if (inst.element.find('.story-slider').length){
                    var slick = $('.story-slider').slick(inst.options.slickOpts);

                    slick.on('afterChange', function() {
                        var activeSlide = $('.slick-slide.slick-active');
                        activeSlide.next().find('img[data-srcset]').lazyLoadXT({
                            show: true
                        });
                    });
                }

                $(window).on( 'DOMContentLoaded load resize scroll', function(){
                    var $viewport = $('.story-container > div');

                    $viewport.isInViewport({
                        tolerance: inst.options.tolerance
                    }).addClass('animate');

                    if ( $viewport.filter('.animate').find('.count-to').not('.complete').length ){
                        $viewport.filter('.animate').find('.count-to').addClass('complete');
                        inst._countTo( $viewport.filter('.animate').find('.count-to .timer') );
                    }
                });
            });
        },

        _onTabClick: function() {
            var inst = this;

            inst.element.find('.data-tabs-nav').on('click', 'li', function(){
                var $container = $(this).parent();
                $container.find('li').removeClass('selected');
                $(this).addClass('selected');
                
                var item = $container.parent().find('.data-content').hide().eq($(this).index()).show();

                if ($container.parent().hasClass('count-to') && navigator.appVersion.indexOf("MSIE 8.") == -1){
                    inst._countTo(item.find('.timer'))
                }
            });
        },

        _countTo: function(items){
            items.countTo({
                formatter: function (value, options) {
                    return value.toFixed($(this).data('decimal') !== undefined ? $(this).data('decimal') : 0);
                }
            });
        },

        _onMobileTableClick: function() {
            this.element.find('.data-mobile-header').on('click', function(){
                $(this).find('i').toggleClass('selected');
                $(this).parent().find('.data-mobile-content').slideToggle();
            });
        },

        _scrollTo: function(location){
            if ($( location ).length) {
                $('html, body').animate({
                    scrollTop: $( location ).offset().top
                }, 500, 'linear');
            }
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
