(function($) {
    $.widget("q4.stories", {
        options: {
            templates: {
                story: (
                    '<div class="story-item">' +
                        '<div class="col col-1-of-3 story-image">' +
                            '<img data-src="{{ThumbnailPath}}" alt="{{Headline}}">' +
                        '</div>' +
                        '<div class="col col-2-of-3 col-sm-1-of-1 story-content">' +
                            '<div class="story-inner">' +
                                '<h2>{{Headline}}</h2>' +
                                '{{#Body}}<p>{{{Body}}}</p>{{/Body}}' +
                                '{{#LinkToDetailPage}}<a href="{{LinkToDetailPage}}" class="arrow alt"></a>{{/LinkToDetailPage}}' +
                            '</div>' +
                        '</div>' +
                    '</div>'
                ),
                storyAlt: (
                    '<div class="story-item">' +
                        '<div class="col col-2-of-3 col-sm-1-of-1 story-content">' +
                            '<div class="story-inner">' +
                                '<h2>{{Headline}}</h2>' +
                                '{{#Body}}<p>{{{Body}}}</p>{{/Body}}' +
                                '{{#LinkToDetailPage}}<a href="{{LinkToDetailPage}}" class="arrow alt"></a>{{/LinkToDetailPage}}' +
                            '</div>' +
                        '</div>' +
                        '<div class="col col-1-of-3 story-image">' +
                            '<img data-src="{{ThumbnailPath}}" alt="{{Headline}}">' +
                        '</div>' +
                    '</div>'
                ),
                stories: (
                    '<div class="stories-item col col-flex">' +
                        '<div class="col story-image">' +
                            '<a href=""><img class="ModuleThumbnail" src="{{ThumbnailPath}}"></a>' +
                        '</div>' +
                        '<div class="col story-content">' +
                            '<h2 class="story-title">{{Headline}}</h2>' +
                            '<div class="story-body">{{Body}}</div>' +
                            '<a href="{{LinkToDetailPage}}" class="arrow"></a>' +
                        '</div>' +
                    '</div>'
                ),
                storiesAlt: (
                    '<div class="stories-item alt col col-flex ">' +
                        '<div class="col story-image">' +
                            '<a href=""><img class="ModuleThumbnail" src="{{ThumbnailPath}}"></a>' +
                        '</div>' +
                        '<div class="col story-content">' +
                            '<h2 class="story-title">{{Headline}}</h2>' +
                            '<div class="story-body">{{Body}}</div>' +
                            '<a href="{{LinkToDetailPage}}" class="arrow"></a>' +
                        '</div>' +
                    '</div>'
                ),
                feature: (
                    '<div class="feature-item">' +
                        '<div id="{{SeoName}}" data-bg="{{{ThumbnailPath}}}" class="fixed-bg">' +
                            '{{#overlay}}<div class="overlay-background">{{/overlay}}' +
                                '<div class="container center dark">' +
                                    '<h2>{{Headline}}</h2>' +
                                    '{{#Body}}<p>{{{Body}}}</p>{{/Body}}' +
                                    '{{#LinkToDetailPage}}<a href="{{LinkToDetailPage}}" class="arrow alt"></a>{{/LinkToDetailPage}}' +
                                '</div>' +
                            '{{#overlay}}</div>{{/overlay}}' +
                        '</div>' +
                    '</div>'
                )
            }
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
                        tag = '';

                    $.each(story.TagsList, function(idx, item){
                        switch(item) {
                            case 'feature':
                                tag = 'feature';
                                break;
                            case 'story':
                                storyAlt % 2 === 0 ? tag = 'story' : tag = 'storyAlt';
                                storyAlt += 1;
                                break;
                            case 'stories':
                                storiesAlt % 2 === 0 ? tag = 'stories' : tag = 'storiesAlt';
                                storiesAlt += 1;
                                break;
                            default:
                                story[item] = true;
                                break;
                        }
                    });

                    story.LinkToDetailPage == '#' ? '' : story.LinkToDetailPage;
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
