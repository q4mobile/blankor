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
                            '<div class="story-inner">' +
                                '{{#Headline}}<h2>{{Headline}}</h2>{{/Headline}}' +
                                '{{#Body}}{{{Body}}}{{/Body}}' +
                                '{{#LinkToDetailPage}}<a href="{{LinkToDetailPage}}" class="arrow"></a>{{/LinkToDetailPage}}' +
                            '</div>' +
                        '</div>' +
                    '</div>'
                ),
                'single-alt': (
                    '<div id="{{SeoName}}" class="story-item single alt {{cls}}">' +
                        '<div class="col col-2-of-3 col-md-1-of-1 col-sm-1-of-1 story-content">' +
                            '<div class="story-inner">' +
                                '{{#Headline}}<h2>{{Headline}}</h2>{{/Headline}}' +
                                '{{#Body}}{{{Body}}}{{/Body}}' +
                                '{{#LinkToDetailPage}}<a href="{{LinkToDetailPage}}" class="arrow"></a>{{/LinkToDetailPage}}' +
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
                            '<a href=""><img class="ModuleThumbnail" src="{{ThumbnailPath}}"></a>' +
                        '</div>' +
                        '<div class="col story-content">' +
                            '{{#Headline}}<h2>{{Headline}}</h2>{{/Headline}}' +
                            '<div class="story-body">{{Body}}</div>' +
                            '{{#LinkToDetailPage}}<a href="{{LinkToDetailPage}}" class="arrow"></a>{{/LinkToDetailPage}}' +
                        '</div>' +
                    '</div>'
                ),
                'multi-alt': (
                    '<div id="{{SeoName}}" class="story-item multi alt col {{cls}}">' +
                        '<div class="col story-image">' +
                            '<a href=""><img class="ModuleThumbnail" src="{{ThumbnailPath}}"></a>' +
                        '</div>' +
                        '<div class="col story-content">' +
                            '{{#Headline}}<h2>{{Headline}}</h2>{{/Headline}}' +
                            '<div class="story-body">{{Body}}</div>' +
                            '{{#LinkToDetailPage}}<a href="{{LinkToDetailPage}}" class="arrow"></a>{{/LinkToDetailPage}}' +
                        '</div>' +
                    '</div>'
                ),
                feature: (
                    '<div id="{{SeoName}}" class="story-item feature {{cls}}">' +
                        '<div {{#ThumbnailPath}}data-bg="{{{ThumbnailPath}}}"{{/ThumbnailPath}} class="fixed-bg">' +
                            '{{#overlay}}<div class="overlay-background">{{/overlay}}' +
                                '<div class="container">' +
                                    '{{#Headline}}<h2>{{Headline}}</h2>{{/Headline}}' +
                                    '{{#Body}}{{{Body}}}{{/Body}}' +
                                    '{{#LinkToDetailPage}}<a href="{{LinkToDetailPage}}" class="arrow"></a>{{/LinkToDetailPage}}' +
                                '</div>' +
                            '{{#overlay}}</div>{{/overlay}}' +
                        '</div>' +
                    '</div>'
                ),
                download: (
                    '<div id="{{SeoName}}" class="story-item download {{cls}}">' +
                        '<div class="container">' +
                            '<a href="{{LinkToDetailPage}}" target="_blank" class="download-item">' +
                                '{{#ThumbnailPath}}<img src="{{{ThumbnailPath}}}">{{/ThumbnailPath}}' +
                                '{{#Headline}}<span class="download-text">{{Headline}}</span>{{/Headline}}' +
                            '</a>' +
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
                    storyAlt = 0;
                    storiesAlt = 0;

                $.each(data.GetPressReleaseListResult, function(i, story){
                    var tpl = inst.options.templates,
                        cls = '', tag = '';

                    $.each(story.TagsList, function(idx, item){
                        switch(item) {
                            case 'feature':
                                tag = 'feature';
                                break;
                            case 'download':
                                tag = 'download';
                                break;
                            case 'single':
                                storyAlt % 2 === 0 ? tag = 'single' : tag = 'single-alt';
                                storyAlt += 1;
                                break;
                            case 'multi':
                                storiesAlt % 2 === 0 ? tag = 'multi' : tag = 'multi-alt';
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
                    story.LinkToDetailPage = story.LinkToDetailPage == '#' ? '' : story.LinkToDetailPage;
                    stories += Mustache.render(tpl[tag], story);
                });

                inst.element.html(stories);

            });
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
